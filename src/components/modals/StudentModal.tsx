'use client'

import React, {useState} from 'react'
import Modal from "@/components/ui/modal"
import {CalendarIcon, SquareX} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Label} from "@/components/ui/label"
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group"
import {Slider} from "@/components/ui/slider"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {useModal} from "@/contexts/ModalContext"
import Image from 'next/image'
import {ScrollArea} from "@/components/ui/scroll-area"
import {Input} from "@/components/ui/input"
import {Calendar} from "@/components/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {format} from "date-fns"

export default function EnhancedStudentModal() {
    const {modalType, closeModal} = useModal()
    const open = modalType === 'student'

    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState({
        subject: '',
        target: '',
        format: [],
        language: [],
        days: [],
        price: 0,
        selectedTutor: {
            id: undefined
        },
        contactInfo: {
            type: 'phone',
            value: '',
        },
        selectedDate: null,
        selectedTime: '',
    })

    const updateFormData = (field: string, value: any) => {
        setFormData(prev => ({...prev, [field]: value}))
    }

    const steps = [
        {title: 'Поиск репетитора', component: Search},
        {title: 'Какая у вас цель?', component: Target},
        {title: 'Формат занятий', component: Format},
        {title: 'На каком языке должны быть занятия?', component: Language},
        {title: 'В какие дни вы хотите заниматься?', component: Days},
        {title: 'Какой у вас бюджет?', component: Price},
        {title: 'Подходящие репетиторы', component: TutorList},
        {title: 'Контактная информация', component: ContactInfo},
        {title: 'Подтверждение', component: Confirmation}
    ]

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1)
        }
    }

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    const isStepValid = (step: number) => {
        switch (step) {
            case 0:
                return formData.subject !== ''
            case 1:
                return formData.target !== ''
            case 2:
                return formData.format.length > 0
            case 3:
                return formData.language.length > 0
            case 4:
                return true
            case 5:
                return true
            case 6:
                return formData.selectedTutor !== null
            case 7:
                return formData.contactInfo.value !== '' && formData.selectedDate !== null && formData.selectedTime !== ''
            default:
                return false
        }
    }

    function Search() {
        return (
            <div className='flex flex-col gap-2 justify-center'>
                <span
                    className={'text-xl font-bold'}>Ответьте на вопросы и мы подберем Вам подходящих репетиторов</span>
                <Label className='mt-4'>Какой предмет вы изучаете?</Label>
                <Select value={formData.subject} onValueChange={(value) => updateFormData('subject', value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Выберите предмет"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="english">Английский</SelectItem>
                        <SelectItem value="math">Математика</SelectItem>
                        <SelectItem value="physics">Физика</SelectItem>
                        <SelectItem value="chemistry">Химия</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        )
    }

    function Target() {
        return (
            <div>
                <ToggleGroup
                    type="single"
                    value={formData.target}
                    onValueChange={(value) => updateFormData('target', value)}
                    className='flex flex-col gap-0.5 justify-start items-start'
                >
                    <ToggleGroupItem value="preschool">Уроки для дошкольников</ToggleGroupItem>
                    <ToggleGroupItem value="school">Уроки для школьников / помощь с учебой</ToggleGroupItem>
                    <ToggleGroupItem value="exam-preparation">Подготовка к экзаменам</ToggleGroupItem>
                    <ToggleGroupItem value="business-career">Бизнес / карьера</ToggleGroupItem>
                    <ToggleGroupItem value="other">Другое</ToggleGroupItem>
                </ToggleGroup>
            </div>
        )
    }

    function Format() {
        return (
            <div>
                <ToggleGroup
                    type="multiple"
                    value={formData.format}
                    onValueChange={(value) => updateFormData('format', value)}
                    className='flex flex-col justify-start items-center gap-2'
                >
                    <ToggleGroupItem value="online" aria-label="Online">
                        <span>онлайн</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="offline" aria-label="Offline">
                        <span>офлайн</span>
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>
        )
    }

    function Language() {
        return (
            <div>
                <ToggleGroup
                    type="multiple"
                    value={formData.language}
                    onValueChange={(value) => updateFormData('language', value)}
                    className='flex flex-col gap-0.5 justify-start items-start'
                >
                    <ToggleGroupItem value="english" aria-label="English">
                        <span>английский</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="uzbek" aria-label="Uzbek">
                        <span>узбекский</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="russian" aria-label="Russian">
                        <span>русский</span>
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>
        )
    }

    function Days() {
        return (
            <div>
                <ToggleGroup
                    type="multiple"
                    value={formData.days}
                    onValueChange={(value) => updateFormData('days', value)}
                    className='flex gap-0.5 justify-between items-start'
                >
                    <ToggleGroupItem value="monday" aria-label="Monday">
                        <span>Пн</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="tuesday" aria-label="Tuesday">
                        <span>Вт</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="wednesday" aria-label="Wednesday">
                        <span>Ср</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="thursday" aria-label="Thursday">
                        <span>Чт</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="friday" aria-label="Friday">
                        <span>Пт</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="saturday" aria-label="Saturday">
                        <span>Сб</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="sunday" aria-label="Sunday">
                        <span>Вс</span>
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>
        )
    }

    function Price() {
        const formatPrice = (value: number) => {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        }

        return (
            <div className='flex flex-col gap-1'>
                <div className="text-2xl font-bold mb-6 text-center">
                    {formatPrice(formData.price)} сум
                </div>
                <Slider
                    min={0}
                    max={300000}
                    step={10000}
                    value={[formData.price]}
                    onValueChange={(value) => updateFormData('price', value[0])}
                    className="w-full"
                />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>0 сум</span>
                    <span>300 000 сум</span>
                </div>
            </div>
        )
    }


    function TutorList() {
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

        return (
            <div className='flex flex-col gap-4 max-h-[50vh] overflow-y-auto'>
                <h3 className='text-lg font-semibold'>Мы нашли {teachers.length} репетиторов для вас</h3>
                <ScrollArea className="h-[245px] w-full rounded-md border p-4 space-y-2">
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
    }

    function ContactInfo() {
        // @ts-ignore
        return (
            <div className='flex flex-col gap-4'>
                <div>
                    <Label htmlFor="contactType">Способ связи</Label>
                    <Select
                        value={formData.contactInfo.type}
                        onValueChange={(value) => updateFormData('contactInfo', {...formData.contactInfo, type: value})}
                    >
                        <SelectTrigger id="contactType">
                            <SelectValue placeholder="Выберите способ связи"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="phone">Телефон</SelectItem>
                            <SelectItem value="telegram">Telegram</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="contactValue">
                        {formData.contactInfo.type === 'phone' ? 'Номер телефона' : 'Имя пользователя в Telegram'}
                    </Label>
                    <Input
                        id="contactValue"
                        value={formData.contactInfo.value}
                        onChange={(e) => updateFormData('contactInfo', {
                            ...formData.contactInfo,
                            value: e.target.value
                        })}
                        placeholder={formData.contactInfo.type === 'phone' ? '+998 90 123 45 67' : '@username'}
                    />
                </div>
                <div>
                    <Label>Выберите дату</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !formData.selectedDate && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                {formData.selectedDate ? format(formData.selectedDate, "PPP") :
                                    <span>Выберите дату</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={formData.selectedDate || undefined}
                                onSelect={(date) => updateFormData('selectedDate', date)}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div>
                    <Label htmlFor="time">Выберите время</Label>
                    <Select
                        value={formData.selectedTime}
                        onValueChange={(value) => updateFormData('selectedTime', value)}
                    >
                        <SelectTrigger id="time">
                            <SelectValue placeholder="Выберите время"/>
                        </SelectTrigger>
                        <SelectContent>
                            {Array.from({length: 24}, (_, i) => i).map((hour) => (
                                <SelectItem key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                                    {`${hour.toString().padStart(2, '0')}:00`}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        )
    }

    function Confirmation() {
        return (
            <div className='text-center'>
                <h3 className='text-xl font-bold mb-4'>Спасибо за бронирование!</h3>
                <p>Мы скоро с вами свяжемся для подтверждения.</p>
            </div>
        )
    }

    return (
        <Modal open={open} onClose={closeModal} className='w-[45%] h-[50vh]'>
            <div className='flex flex-col justify-between w-full min-h-full p-6'>
                <div className='text-center mb-6'>
                    <span className='text-2xl font-bold'>{steps[currentStep].title}</span>
                </div>
                <div className=''>
                    {steps[currentStep].component()}
                </div>
                <div className='flex justify-between mt-6'>
                    {currentStep > 0 && (
                        <Button onClick={prevStep}>
                            Назад
                        </Button>
                    )}
                    {currentStep < steps.length - 1 ? (
                        <Button
                            onClick={nextStep}
                            className='ml-auto'
                            disabled={!isStepValid(currentStep)}
                        >
                            {currentStep === 4 && formData.days.length === 0 ? 'Пропустить' : 'Далее'}
                        </Button>
                    ) : null}
                </div>
            </div>
            <Button
                variant='link'
                onClick={closeModal}
                className='absolute top-0 right-0 aspect-auto w-8 hover:scale-110 transition-all duration-300'
            >
                <SquareX className='w-full'/>
            </Button>
        </Modal>
    )
}