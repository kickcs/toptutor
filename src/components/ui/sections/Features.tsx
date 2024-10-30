"use client"
import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import Image from 'next/image'
import TeacherModal from "@/components/ui/TeacherModal";

const Features = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <section>
            <div className={'w-[75%] mx-auto flex gap-8 items-center border border-solid'}>
                <Image
                    src={'/teacher.jpg'}
                    height={700}
                    width={400}
                    alt={'teacher'}
                />
                <div className={'flex flex-col gap-4 w-3/5 px-16'}>
                    <p className={'font-bold text-4xl'}>Как стать репетитором?</p>
                    <span>
                        Заполните форму, чтобы стать репетитором на TopTutor
                    </span>
                    <ul className={'list-disc pl-6'}>
                        <li>Получите много новых учеников</li>
                        <li>Увеличьте свой доход</li>
                        <li>Станьте топ тютором на TopTutor</li>
                    </ul>
                    <Button className={'font-bold'} onClick={openModal}>
                        Стать репетитором
                    </Button>
                </div>
            </div>
            <TeacherModal open={isModalOpen} onClose={closeModal} />
        </section>
    );
};

export default Features;