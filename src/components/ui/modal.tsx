'use client'

import React, {useEffect, useRef} from 'react'
import {cn} from "@/lib/utils"
import {createPortal} from 'react-dom'

interface ModalProps {
    children: React.ReactNode
    open: boolean
    onClose: () => void
    className?: string
}

export default function Modal({children, open, onClose, className}: ModalProps) {
    const ref = useRef<Element | null>(null)

    useEffect(() => {
        ref.current = document.body
        if (open) {
            const originalStyle = window.getComputedStyle(document.body).overflow
            document.body.style.overflow = 'hidden'
            return () => {
                document.body.style.overflow = originalStyle
            }
        }
    }, [open])

    if (!open) {
        return null
    }

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
                onClick={onClose}
            />
            <div
                className={cn(
                    "relative bg-white rounded-lg shadow-xl",
                    "w-full max-w-[95dvw] max-h-[90dvh] overflow-hidden",
                    className
                )}
            >
                <div className="max-h-[90dvh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>,
        ref.current as Element
    )
}