// lib/axiosInstance.ts
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    // ✅ localStorage এর বদলে Cookies ব্যবহার করুন
    const token = Cookies.get("accessToken");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
                    { withCredentials: true },
                );
                const newToken = res.data.data.accessToken;

                // ✅ Cookies এ সেভ করুন (localStorage এ নয়)
                Cookies.set("accessToken", newToken, {
                    expires: 30,
                    sameSite: "strict",
                });

                originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);
            } catch (err) {
                Cookies.remove("accessToken");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;
