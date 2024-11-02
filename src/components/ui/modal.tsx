'use client';
import React, {useEffect, useRef} from 'react';
import {cn} from "@/lib/utils";
import ReactDOM from 'react-dom';

const Modal = ({children, open, className}: {
    children: React.ReactNode,
    open: boolean,
    onClose: () => void,
    className?: string
}) => {
    const ref = useRef<Element | null>(null);

    useEffect(() => {
        ref.current = document.body;
        if (open) {
            const originalStyle = window.getComputedStyle(document.body).overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalStyle;
            };
        }
    }, [open]);

    if (!open) {
        return null;
    }

    return ReactDOM.createPortal(
        <div className={cn("fixed z-10 inset-0 overflow-y-auto")}>
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div
                    className={cn("inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle", className)}
                >
                    {children}
                </div>
            </div>
        </div>,
        ref.current as Element
    );
};

export default Modal;