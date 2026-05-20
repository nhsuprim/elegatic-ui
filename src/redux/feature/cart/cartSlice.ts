import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clear } from "console";

interface IProduct {
    id: number;
    image: string;
    title: string;
    size: string;
    discountPrice: number;
    quantity?: number;
}

interface ICart {
    products: IProduct[];
    total: number;
}

const initialState: ICart = {
    products: [],
    total: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProductToCart: (state, action: PayloadAction<IProduct>) => {
            //check if the product in same size already exists in the cart

            const existingProduct = state.products.find(
                (product) =>
                    product.id === action.payload.id &&
                    product.size === action.payload.size,
            );
            if (existingProduct) {
                existingProduct.quantity! += 1;
            } else {
                state.products.push({
                    ...action.payload,
                    quantity: 1,
                });
            }
            state.total += action.payload.discountPrice;
        },
        removeProductFromCart: (state, action: PayloadAction<IProduct>) => {
            // ✅ id এবং size দুটো match হলেই remove হবে
            const productToRemove = state.products.find(
                (product) =>
                    product.id === action.payload.id &&
                    product.size === action.payload.size,
            );

            if (!productToRemove) return;

            // ✅ total থেকে সেই product-এর মোট price বাদ দাও
            state.total -=
                productToRemove.discountPrice * (productToRemove.quantity || 1);

            state.products = state.products.filter(
                (product) =>
                    !(
                        product.id === action.payload.id &&
                        product.size === action.payload.size
                    ),
            );

            if (state.products.length === 0) {
                state.total = 0;
            }
        },
        removeOneProduct: (state, action: PayloadAction<IProduct>) => {
            const existingProduct = state.products.find(
                (product) =>
                    product.id === action.payload.id &&
                    product.size === action.payload.size, // ✅ size যোগ করো
            );
            if (existingProduct && existingProduct.quantity! > 1) {
                existingProduct.quantity! -= 1;
                state.total -= action.payload.discountPrice;
            }
        },
        clearCart: (state) => {
            state.products = [];
            state.total = 0;
        },
    },
});

export const {
    addProductToCart,
    removeProductFromCart,
    removeOneProduct,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
