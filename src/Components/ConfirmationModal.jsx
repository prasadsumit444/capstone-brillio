import React from "react";

export function ConfirmationModal({ heading, message, onClose, action }) {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="rounded-md bg-white p-8 shadow-2xl w-96 text-center">
                <h2 className="text-lg font-bold mb-2">{heading}</h2>

                <p className="mt-2 text-sm text-gray-500">
                    {message}
                </p>

                <div className="mt-4 flex gap-2 justify-center">
                    <button type="button" onClick={action} className="rounded bg-green-50 px-4 py-2 text-sm font-medium text-green-600">
                        Yes, I'm sure
                    </button>

                    <button type="button" onClick={onClose} className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600">
                        No, go back
                    </button>
                </div>
            </div>
        </div>
    );
}
