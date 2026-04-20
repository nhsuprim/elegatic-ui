import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type Props = {
    children: ReactNode;
    requireAdmin?: boolean;
};

const PrivateRoute = ({ children, requireAdmin }: Props) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push("/dashboard/admin/login");
            }
            if (requireAdmin && user?.role !== "ADMIN") {
                router.push("/");
            }
        }
    }, [[user, loading, requireAdmin, router]]);

    if (loading) {
        return <p>Checking authentication...</p>;
    }

    if (!user) return null;

    if (requireAdmin && user.role !== "ADMIN") return null;
    return <>{children}</>;
};

export default PrivateRoute;
