"use client";
import React from "react";

const OrderStatusUpdateModal = ({
    open,
    setOpen,
    status,
    onConfirm,
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
    status: string | null;
    onConfirm: () => void;
}) => {
    if (!open) return null;

    return (
        <div className="modal modal-open ">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Update Order Status</h3>

                <p className="py-4">
                    Are you sure you want to update status to{" "}
                    <span className="font-bold">{status}</span> ?
                </p>

                <div className="modal-action">
                    <button
                        className="btn bg-blue-900 hover:bg-blue-950 text-white"
                        onClick={onConfirm}
                    >
                        Yes, Update
                    </button>

                    <button className="btn" onClick={() => setOpen(false)}>
                        Cancel
                    </button>
                </div>
            </div>

            <div
                className="modal-backdrop"
                onClick={() => setOpen(false)}
            ></div>
        </div>
    );
};

export default OrderStatusUpdateModal;
