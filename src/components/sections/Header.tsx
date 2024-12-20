"use client";
import {Button} from "@/components/ui/button";
import React from "react";
import {useModal} from "@/contexts/ModalContext";

const Header = () => {
    const {openModal} = useModal();

    return (
        <header
            className="bg-amber-100 flex items-center px-4 py-4 sm:px-12 lg:px-28 gap-x-2 fixed w-full top-0 z-10">
            <span className="font-bold text-lg sm:text-xl">TopTutor.uz</span>
            <div className="hidden sm:flex gap-4 ml-4">
                <Button onClick={() => openModal("student")}>Найти репетитора</Button>
                <Button onClick={() => openModal("teacher")}>Стать репетитором</Button>
            </div>
        </header>
    );
};

export default Header;
