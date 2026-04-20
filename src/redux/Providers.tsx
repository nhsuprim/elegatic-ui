"use client";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // ✅ Server side এ শুধু children render করো, PersistGate ছাড়া
    if (!mounted) {
        return <Provider store={store}>{children}</Provider>;
    }

    // ✅ Client side এ PersistGate সহ render করো
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
};

export default Providers;
