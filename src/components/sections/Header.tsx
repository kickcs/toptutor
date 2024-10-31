'use client'
import {Button} from "@/components/ui/button";
import React from "react";
import {useModal} from "@/contexts/ModalContext";

const Header = () => {
    const {openModal} = useModal()

    return (
        <>
            <div className={'bg-amber-100 flex items-center py-4 px-24 gap-x-2 fixed w-full top-0'}>
                TopTutor.uz
                <Button
                    className={'ml-24'}
                    onClick={() => openModal('student')}
                >
                    Найти репитора
                </Button>
                <Button
                    onClick={() => openModal('student')}
                >
                    Стать репетитором
                </Button>
                <Button className={'ml-auto'}>
                    Войти
                </Button>
            </div>
        </>
    );
};

export default Header;