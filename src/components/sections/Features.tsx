"use client";
import React from 'react';
import {Button} from "@/components/ui/button";
import Image from 'next/image';
import {useModal} from "@/contexts/ModalContext";

const Features = () => {
    const {openModal} = useModal();

    return (
        <section className="py-8">
            <div
                className="w-full md:w-[85%] lg:w-[75%] mx-auto flex flex-col lg:flex-row gap-8 items-center border border-solid p-4 md:p-8 rounded-lg">
                <Image
                    src="/teacher.jpg"
                    height={500}
                    width={350}
                    alt="teacher"
                    className="rounded-lg w-full lg:w-auto"
                    priority
                />
                <div className="flex flex-col gap-4 w-full lg:w-3/5 px-4 md:px-8">
                    <p className="font-bold text-2xl sm:text-3xl lg:text-4xl text-center lg:text-left">
                        Как стать репетитором?
                    </p>
                    <span className="text-center lg:text-left">
                        Заполните форму, чтобы стать репетитором на TopTutor
                    </span>
                    <ul className="list-disc pl-4 md:pl-6 text-center lg:text-left space-y-2">
                        <li>Получите много новых учеников</li>
                        <li>Увеличьте свой доход</li>
                        <li>Станьте топ тютором на TopTutor</li>
                    </ul>
                    <Button
                        className="font-bold mx-auto lg:mx-0"
                        onClick={() => openModal('teacher')}
                    >
                        Стать репетитором
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Features;
