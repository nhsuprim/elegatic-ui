import {
    addProductToCart,
    removeOneProduct,
    removeProductFromCart,
} from "@/redux/feature/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const Cart = () => {
    const { products, total } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();

    const addtoCart = (product: any) => {
        dispatch(addProductToCart(product));
    };

    const removefromCart = (product: any) => {
        dispatch(removeProductFromCart(product));
    };

    return (
        <div className="menu bg-base-200 text-base-content min-h-full min-w-fit p-8">
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold">Shopping Cart </h2>
                <label
                    htmlFor="my-drawer-4"
                    className=" btn btn-sm bg-red-500 btn-circle"
                >
                    ✕
                </label>
            </div>
            <div className="mt-6">
                {products.map((product: any) => (
                    <div
                        key={product.id}
                        className="flex items-center justify-between py-4 border-b border-gray-300 gap-4"
                    >
                        <div className="flex items-center gap-3">
                            <img
                                src={product.images[0]}
                                alt={product.title}
                                className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                                <h3 className="text-lg font-semibold">
                                    {product.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Total Price: $
                                    {(
                                        product.discountPrice * product.quantity
                                    ).toFixed(2)}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                className="px-2 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
                                onClick={() =>
                                    dispatch(removeOneProduct(product))
                                }
                            >
                                -
                            </button>
                            <span>{product.quantity}</span>
                            <button
                                className="px-2 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
                                onClick={() => addtoCart(product)}
                            >
                                +
                            </button>
                            <button
                                className="text-red-500 hover:text-red-700 ml-3"
                                onClick={() =>
                                    dispatch(removeProductFromCart(product))
                                }
                            >
                                <FaTrashAlt />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <h3 className="text-lg font-bold">
                    Total: ${total.toFixed(2)}{" "}
                </h3>
            </div>
            <div className="mt-6 text-right">
                <Link
                    onClick={() => {
                        const drawer = document.getElementById(
                            "my-drawer-4",
                        ) as HTMLInputElement;
                        if (drawer) drawer.checked = false;
                    }}
                    href="/order"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Checkout
                </Link>
            </div>
        </div>
    );
};

export default Cart;
