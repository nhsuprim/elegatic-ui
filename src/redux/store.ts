import { baseApi } from "./api/baseApi";
import { reducer } from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // ✅ redux-persist এর জন্য জরুরি
        }).concat(baseApi.middleware),
});

export const persistor = persistStore(store); // ✅ নতুন এই লাইন

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
