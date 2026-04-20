"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { RiAdminFill } from "react-icons/ri";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useAuth } from "@/context/AuthContext";

const page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        login(email, password);
        // try {
        //     console.log(email);
        //     console.log(password);

        //     const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        //     const response = await axios.post(`${apiUrl}auth/login`, {
        //         email,
        //         password,
        //     });

        //     console.log("Login successful:", response.data);
        //     toast.success("Login successful!");

        //     Cookies.set("accessToken", response.data.data.accessToken, {
        //         expires: 1, // 1 day
        //     });
        //     // router.push("/dashboard");
        // } catch (error: any) {
        //     console.error(
        //         "Login failed:",
        //         error.response?.data || error.message,
        //     );
        //     toast.error(error.response?.data?.message || "Login failed");

        //     // Example:
        //     // setError(error.response?.data?.message || "Login failed");
        // }
    };
    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-200">
            <div className="w-full max-w-md bg-slate-100 p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 mx-auto  text-blue-600 text-9xl border border-blue-600 rounded-full flex items-center justify-center p-1 relative -top-14">
                    <RiAdminFill />
                </div>
                <h1 className="text-2xl font-bold text-center mb-6">
                    Admin Login
                </h1>
                <div className="space-y-4 font-semibold">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend ">Email</legend>
                        <input
                            type="text"
                            className="input"
                            placeholder="abc@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password</legend>
                        <input
                            type="password"
                            className="input"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </fieldset>
                    <button
                        className="w-full mx-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default page;
