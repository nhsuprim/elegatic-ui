"use client";
import React from "react";

const DeleteCategoriesModal = ({
    open,
    setOpen,
    category,
    onConfirm,
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
    category: any;
    onConfirm: (id: string) => void;
}) => {
    if (!open) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg text-red-500">
                    Delete Category
                </h3>

                <p className="py-4">
                    Are you sure you want to delete{" "}
                    <span className="font-bold">{category?.name}</span> ?
                </p>

                <div className="modal-action">
                    <button
                        className="btn btn-error text-white"
                        onClick={() => onConfirm(category.id)}
                    >
                        Yes, Delete
                    </button>

                    <button className="btn" onClick={() => setOpen(false)}>
                        Cancel
                    </button>
                </div>
            </div>

            {/* backdrop */}
            <div
                className="modal-backdrop"
                onClick={() => setOpen(false)}
            ></div>
        </div>
    );
};

export default DeleteCategoriesModal;
