import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Image from 'next/image';

const Working = () => {

    const cardContent = [
        {
            id: 1,
            title: 'Найти репетитора',
            description: 'Вы можете подобрать репетитора, используя фильтры и посмотрев на их профиль и отзывы.',
            image: 'find_teacher.webp'
        },
        {
            id: 2,
            title: 'Записаться на бесплатный урок',
            description: 'Вы можете оставить заявку на пробный урок, указав удобное для вас время.',
            image: 'free_lesson.webp'
        },
        {
            id: 3,
            title: 'Начать учиться',
            description: 'Если вам все понравится, то репетитор начнет заниматься с вами по индивидуальной программе.',
            image: 'free_lesson.webp'
        }
    ];

    return (
        <section className="space-y-8 px-4 lg:px-0">
            <h2 className="text-3xl sm:text-4xl font-bold text-center">
                Как работает TopTutor
            </h2>
            <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-8">
                {cardContent.map((item) => (
                    <Card key={item.id} className="w-full sm:w-[300px] lg:w-[350px] min-h-[450px] flex flex-col gap-4">
                        <CardHeader>
                            <CardTitle className="text-2xl sm:text-3xl font-extrabold">
                                <div
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-black flex items-center justify-center mr-2 sm:mr-4">
                                    <p className="text-white text-lg sm:text-xl">{item.id}</p>
                                </div>
                                {item.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col gap-4">
                            <p>{item.description}</p>
                            <div className="w-full flex justify-center">
                                <Image
                                    src={`/${item.image}`}
                                    alt={item.title}
                                    width={200}
                                    height={200}
                                    className="rounded-lg"
                                    priority
                                />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default Working;
