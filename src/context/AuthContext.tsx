// ✅ FIXED AuthContext.tsx
"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback, // ✅ stale closure fix এর জন্য
    ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axiosInstance from "@/utils/axiosInstance";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import axios from "axios";

type User = {
    email: string;
    role: "ADMIN" | "SUPERADMIN";
    iat: number;
    exp: number;
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const COOKIE_OPTIONS = {
    expires: 30,
    sameSite: "strict" as const,
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // ✅ useCallback দিয়ে logout বানালে useEffect এ safely use করা যাবে
    const logout = useCallback(() => {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        setUser(null);
        router.push("/login");
    }, [router]);

    // ✅ Page load এ token থেকে user বের করো
    useEffect(() => {
        const token = Cookies.get("accessToken");

        if (token) {
            try {
                const decoded = jwtDecode<User>(token);

                // ✅ expire check করো
                const isExpired = decoded.exp * 1000 < Date.now();
                if (isExpired) {
                    logout();
                } else {
                    setUser(decoded);
                }
            } catch {
                logout(); // invalid token হলে clear করো
            }
        }

        setLoading(false);
    }, [logout]); // ✅ logout এখন dependency তে safe

    const login = async (email: string, password: string) => {
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
                {
                    email,
                    password,
                },
            );

            // ✅ Backend শুধু accessToken দেয় response body তে
            // refreshToken automatically httpOnly cookie তে set হয়ে যায়
            const accessToken = res.data.data.accessToken;

            if (!accessToken) {
                throw new Error("Token not received");
            }

            // ✅ শুধু accessToken cookie তে রাখো
            Cookies.set("accessToken", accessToken, COOKIE_OPTIONS);

            const decoded = jwtDecode<User>(accessToken);
            setUser(decoded);

            toast.success("Login successful!");
            router.push("/dashboard");
        } catch (error: any) {
            const message = error?.response?.data?.message || "Login failed";
            toast.error(message);
            throw error; // ✅ caller কে জানাও error হয়েছে
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};
