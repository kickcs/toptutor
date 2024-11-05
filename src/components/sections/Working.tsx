import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Image from 'next/image';
import {motion} from "framer-motion";

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
        <section className="space-y-12 px-4 lg:px-0 py-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800">
                Как работает TopTutor
            </h2>
            <div className="flex flex-col lg:flex-row lg:justify-between items-stretch gap-8">
                {cardContent.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{opacity: 0, y: 50}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: index * 0.2}}
                        className="w-full sm:w-[300px] lg:w-[350px]"
                    >
                        <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardHeader className="pb-4">
                                <CardTitle
                                    className="flex items-center text-2xl sm:text-3xl font-extrabold text-gray-800">
                                    <div
                                        className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mr-4 text-xl font-bold">
                                        {item.id}
                                    </div>
                                    <span className="flex-grow">{item.title}</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow flex flex-col justify-between gap-6">
                                <p className="text-gray-600 text-lg">{item.description}</p>
                                <div className="w-full flex justify-center">
                                    <Image
                                        src={`/${item.image}`}
                                        alt={item.title}
                                        width={250}
                                        height={250}
                                        className="rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                                        priority
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Working;