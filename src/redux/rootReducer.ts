import { baseApi } from "./api/baseApi";
import cartReducer from "./feature/cart/cartSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage

// ✅ Persist config শুধু cart-এর জন্য
const cartPersistConfig = {
    key: "cart",
    storage,
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

export const reducer = {
    [baseApi.reducerPath]: baseApi.reducer,
    cart: persistedCartReducer, // ✅ wrapped reducer
};
