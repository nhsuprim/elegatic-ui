import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
            // Remove product by its id
            state.products = state.products.filter(
                (product) => product.id !== action.payload.id,
            );
            // Remove product if it exists
            if (state.products.length === 0) {
                state.total = 0;
            } else {
                state.total -= action.payload.discountPrice;
            }
        },
        removeOneProduct: (state, action: PayloadAction<IProduct>) => {
            const existingProduct = state.products.find(
                (product) => product.id === action.payload.id,
            );
            if (existingProduct && existingProduct.quantity! > 1) {
                existingProduct.quantity! -= 1;
                state.total -= action.payload.discountPrice;
            }
        },
    },
});

export const { addProductToCart, removeProductFromCart, removeOneProduct } =
    cartSlice.actions;

export default cartSlice.reducer;
