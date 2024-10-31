"use client"

import React, {useState} from 'react'
import Modal from "@/components/ui/modal"
import {Upload, X} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group"
import {useModal} from "@/contexts/ModalContext"
import {Textarea} from "@/components/ui/textarea"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"

const TeacherModal = () => {
    const {modalType, closeModal} = useModal()
    const open = modalType === 'teacher'
    const [photo, setPhoto] = useState<File | null>(null)

    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setPhoto(event.target.files[0])
        }
    }

    return (
        <Modal open={open} onClose={closeModal} className='w-[800px] max-w-[95vw] max-h-[75vh] overflow-auto'>
            <div className='p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-lg'>
                <h2 className='text-2xl font-bold mb-6 text-center text-indigo-700'>Регистрация преподавателя</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-4'>
                        <div>
                            <Label htmlFor='name' className='font-semibold text-gray-700'>ФИО</Label>
                            <Input id='name' type="text" placeholder="Введите ФИО" className='mt-1'/>
                        </div>
                        <div>
                            <Label htmlFor='subject' className='font-semibold text-gray-700'>Предмет</Label>
                            <Select>
                                <SelectTrigger className='mt-1'>
                                    <SelectValue placeholder="Выберите предмет"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="math">Математика</SelectItem>
                                    <SelectItem value="physics">Физика</SelectItem>
                                    <SelectItem value="english">Английский язык</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor='experience' className='font-semibold text-gray-700'>Стаж (в годах)</Label>
                            <Input id='experience' type="number" placeholder="1" min="0" className='mt-1'/>
                        </div>
                        <div>
                            <Label htmlFor='photo' className='font-semibold text-gray-700'>Фото</Label>
                            <div className='mt-1 flex items-center space-x-2'>
                                <Button
                                    onClick={() => document.getElementById('photo')?.click()}
                                    variant="outline"
                                    className='w-full'
                                >
                                    <Upload className='mr-2 h-4 w-4'/> Загрузить фото
                                </Button>
                                <Input
                                    id='photo'
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    className='hidden'
                                />
                                {photo && <span className='text-sm text-gray-500'>{photo.name}</span>}
                            </div>
                        </div>
                    </div>
                    <div className='space-y-4'>
                        <div>
                            <Label htmlFor='about' className='font-semibold text-gray-700'>О себе</Label>
                            <Textarea id='about' placeholder="Краткое описание" className='mt-1'/>
                        </div>
                        <div>
                            <Label htmlFor='telegram' className='font-semibold text-gray-700'>Telegram</Label>
                            <Input id='telegram' type="text" placeholder="@username" className='mt-1'/>
                        </div>
                        <div>
                            <Label className='font-semibold text-gray-700'>Для кого преподаете?</Label>
                            <ToggleGroup type="multiple" className='mt-1 grid grid-cols-2 gap-2'>
                                <ToggleGroupItem value="preschool" aria-label="Preschool"
                                                 className='data-[state=on]:bg-indigo-100'>
                                    <span>дошкольникам</span>
                                </ToggleGroupItem>
                                <ToggleGroupItem value="school" aria-label="School"
                                                 className='data-[state=on]:bg-indigo-100'>
                                    <span>школьникам</span>
                                </ToggleGroupItem>
                                <ToggleGroupItem value="exam-preparation" aria-label="Exam Preparation"
                                                 className='data-[state=on]:bg-indigo-100'>
                                    <span>готовлю к экзаменам</span>
                                </ToggleGroupItem>
                                <ToggleGroupItem value="business-career" aria-label="Business/Career"
                                                 className='data-[state=on]:bg-indigo-100'>
                                    <span>бизнес/карьера</span>
                                </ToggleGroupItem>
                            </ToggleGroup>
                        </div>
                    </div>
                </div>
                <div className='mt-6 space-y-4'>
                    <div>
                        <Label className='font-semibold text-gray-700'>Формат занятий</Label>
                        <ToggleGroup type="multiple" className='mt-1 flex justify-start items-center gap-2'>
                            <ToggleGroupItem value="online" aria-label="Online"
                                             className='data-[state=on]:bg-indigo-100'>
                                <span>онлайн</span>
                            </ToggleGroupItem>
                            <ToggleGroupItem value="offline" aria-label="Offline"
                                             className='data-[state=on]:bg-indigo-100'>
                                <span>офлайн</span>
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                    <div>
                        <Label className='font-semibold text-gray-700'>Языки ведения</Label>
                        <ToggleGroup type="multiple" className='mt-1 flex justify-start items-center gap-2'>
                            <ToggleGroupItem value="english" aria-label="English"
                                             className='data-[state=on]:bg-indigo-100'>
                                <span>английский</span>
                            </ToggleGroupItem>
                            <ToggleGroupItem value="uzbek" aria-label="Uzbek" className='data-[state=on]:bg-indigo-100'>
                                <span>узбекский</span>
                            </ToggleGroupItem>
                            <ToggleGroupItem value="russian" aria-label="Russian"
                                             className='data-[state=on]:bg-indigo-100'>
                                <span>русский</span>
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                    <div>
                        <Label className='font-semibold text-gray-700'>Стоимость 1 часа занятия</Label>
                        <div className="flex items-center space-x-2 mt-1">
                            <Input type="number" placeholder="min" className='w-1/2'/>
                            <span>-</span>
                            <Input type="number" placeholder="max" className='w-1/2'/>
                        </div>
                    </div>
                </div>
                <Button className='mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white'>
                    Отправить
                </Button>
                <Button
                    variant='ghost'
                    onClick={closeModal}
                    className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
                >
                    <X className='h-6 w-6'/>
                </Button>
            </div>
        </Modal>
    )
}

export default TeacherModal