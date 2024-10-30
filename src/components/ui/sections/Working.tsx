import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Image from 'next/image'

const Working = () => {

    const cardContent = [
        {
            id: 1,
            title: 'Найти репетитора',
            description: 'Вы можете подобрать репетитора используя фильтры и посмотрев на их профиль и отзывы',
            image: 'find_teacher.webp'
        },
        {
            id: 2,
            title: 'Записаться на бесплатный урок',
            description: 'Вы можете оставить заявку на пробный урок, указав удобное для вас время',
            image: 'free_lesson.webp'
        },
        {
            id: 3,
            title: 'Начать учиться',
            description: 'Если вам все понравится, то репетитор начнет заниматься с вами по индивидуальной программе',
            image: 'free_lesson.webp'
        }
    ]

    return (
        <section className={'space-y-8'}>
            <h2 className={'text-4xl font-bold'}>Как работает TopTutor</h2>
            <div className={'flex justify-between items-center gap-8'}>
                {cardContent.map((item) => (
                    <Card key={item.id} className={'w-[400px] min-h-[450px] flex flex-col gap-4'}>
                        <CardHeader>
                            <CardTitle className={'text-3xl font-extrabold'}>
                                <div className={`w-12 h-12 rounded-2xl bg-black flex items-center justify-center`}>
                                    <p className={'text-white'}>{item.id}</p>
                                </div>
                                {item.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className={'mt-auto'}>
                            <p className={'mt-auto'}>{item.description}</p>
                            <Image
                                src={`/${item.image}`}
                                alt={item.title}
                                width={'300'}
                                height={'300'}
                            />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default Working;