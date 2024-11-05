import React from 'react';
import {ScrollArea} from "@/components/ui/scroll-area";
import Image from "next/image";
import {Button} from "@/components/ui/button";

interface TutorListProps {
    formData: {
        selectedTutor: {
            id: number | undefined;
        };
    };
    updateFormData: (key: string, value: any) => void;
}

const teachers = [
    {
        id: 1,
        name: 'Анна Иванова',
        subject: 'Английский',
        price: 100000,
        rating: 4.8,
        image: '/placeholder.svg?height=50&width=50'
    },
    {
        id: 2,
        name: 'Петр Сидоров',
        subject: 'Математика',
        price: 120000,
        rating: 4.9,
        image: '/placeholder.svg?height=50&width=50'
    },
    {
        id: 3,
        name: 'Елена Петрова',
        subject: 'Физика',
        price: 110000,
        rating: 4.7,
        image: '/placeholder.svg?height=50&width=50'
    },
]

const TutorList = ({formData, updateFormData}: TutorListProps) => {
    return (
        <div className='flex flex-col gap-4 w-full'>
            <h3 className='text-lg font-semibold'>Мы нашли {teachers.length} репетиторов для вас</h3>
            <ScrollArea className="h-[50dvh] lg:h-[245px] w-full rounded-md border p-4 space-y-2">
                {teachers.map((teacher) => (
                    <div key={teacher.id} className='flex items-center gap-4 my-2 p-4 border rounded-lg'>
                        <Image
                            src={teacher.image}
                            alt={teacher.name}
                            width={50}
                            height={50}
                            className='rounded-full'
                        />
                        <div className='flex-grow'>
                            <h3 className='text-lg font-semibold'>{teacher.name}</h3>
                            <p className='text-sm'>{teacher.subject}</p>
                            <p className='text-sm'>{teacher.price.toLocaleString()} сум/час</p>
                            <p className='text-sm'>Рейтинг: {teacher.rating}</p>
                        </div>
                        <Button
                            size="sm"
                            onClick={() => updateFormData('selectedTutor', teacher)}
                            variant={formData.selectedTutor?.id === teacher.id ? 'default' : 'outline'}
                        >
                            {formData.selectedTutor?.id === teacher.id ? 'Выбрано' : 'Выбрать'}
                        </Button>
                    </div>
                ))}
            </ScrollArea>
        </div>
    )
};

export default TutorList;