"use client"
import React, {useState} from 'react'
import Modal from "@/components/ui/modal"
import {SquareX} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Label} from "@/components/ui/label"
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group"
import {Slider} from "@/components/ui/slider"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {useModal} from "@/contexts/ModalContext";


export default function StudentModal() {
    const {modalType, closeModal} = useModal()
    const open = modalType === 'student'

    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState({
        subject: '',
        target: '',
        format: [],
        language: [],
        days: [],
        price: 0
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
        {title: 'Подобрать репетитора', component: FindTutor}
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
                return true // Days step can be skipped
            case 5:
                return true // Price is always set
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

    function FindTutor() {
        return (
            <div className='flex flex-col items-center gap-4'>
                <span className='text-xl text-center'>Мы собрали всю необходимую информацию. Нажмите кнопку ниже, чтобы найти подходящего репетитора.</span>
                <Button onClick={() => console.log('Finding tutor with data:', formData)} className='mt-4'>
                    Подобрать репетитора
                </Button>
            </div>
        )
    }

    return (
        <Modal open={open} onClose={closeModal} className='w-[45%] h-[50vh]'>
            <div className='flex flex-col justify-between w-full h-full p-6'>
                <div className='text-center mb-6'>
                    <span className='text-2xl font-bold'>{steps[currentStep].title}</span>
                </div>
                <div className='flex-grow overflow-y-auto'>
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