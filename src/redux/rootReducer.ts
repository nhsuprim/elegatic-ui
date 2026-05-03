import { baseApi } from "./api/baseApi";
import cartReducer from "./feature/cart/cartSlice";
import { persistReducer } from "redux-persist";

// ✅ Server-side এ localStorage নেই, তাই noop storage
const createNoopStorage = () => ({
    getItem(_key: string) { return Promise.resolve(null); },
    setItem(_key: string, value: any) { return Promise.resolve(value); },
    removeItem(_key: string) { return Promise.resolve(); },
});

// ✅ Client হলে real storage, Server হলে noop
const storage =
    typeof window !== "undefined"
        ? require("redux-persist/lib/storage").default
        : createNoopStorage();

const cartPersistConfig = {
    key: "cart",
    storage, 
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

export const reducer = {
    [baseApi.reducerPath]: baseApi.reducer,
    cart: persistedCartReducer,
};