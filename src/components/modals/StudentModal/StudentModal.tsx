'use client'

import React, {useCallback, useState} from 'react'
import Modal from "@/components/ui/modal"
import {SquareX} from "lucide-react"
import {Button} from "@/components/ui/button"
import {useModal} from "@/contexts/ModalContext"

import SearchStep from "@/components/modals/StudentModal/steps/SearchStep"
import TargetStep from "@/components/modals/StudentModal/steps/TargetStep"
import FormatStep from "@/components/modals/StudentModal/steps/FormatStep"
import LanguageStep from "@/components/modals/StudentModal/steps/LanguageStep"
import DaysStep from "@/components/modals/StudentModal/steps/DaysStep"
import PriceStep from "@/components/modals/StudentModal/steps/PriceStep"
import TutorList from "@/components/modals/StudentModal/steps/TutorList"
import ContactInfoStep from "@/components/modals/StudentModal/steps/ContactInfoStep"
import ConfirmationStep from "@/components/modals/StudentModal/steps/ConfirmationStep"
import {Progress} from "@/components/ui/progress";

type FormData = {
    subject: string
    target: string
    format: string[]
    language: string[]
    days: string[]
    price: number
    selectedTutor: { id: number | undefined }
    contactInfo: { type: string; value: string }
    selectedDate: Date | null
    selectedTime: string
}

type StepProps = {
    formData: FormData
    updateFormData: (field: string, value: any) => void
}

type Step = {
    title: string
    component: React.ComponentType<StepProps>
}

export default function EnhancedStudentModal() {
    const {modalType, closeModal} = useModal()
    const open = modalType === 'student'

    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState<FormData>({
        subject: '',
        target: '',
        format: [],
        language: [],
        days: [],
        price: 0,
        selectedTutor: {id: undefined},
        contactInfo: {type: 'phone', value: ''},
        selectedDate: null,
        selectedTime: '',
    })

    const updateFormData = useCallback((field: string, value: any) => {
        setFormData(prev => ({...prev, [field]: value}))
    }, [])

    const steps: Step[] = [
        {title: 'Поиск репетитора', component: SearchStep},
        {title: 'Какая у вас цель?', component: TargetStep},
        {title: 'Формат занятий', component: FormatStep},
        {title: 'На каком языке должны быть занятия?', component: LanguageStep},
        {title: 'В какие дни вы хотите заниматься?', component: DaysStep},
        {title: 'Какой у вас бюджет?', component: PriceStep},
        {title: 'Подходящие репетиторы', component: TutorList},
        {title: 'Контактная информация', component: ContactInfoStep},
        {title: 'Подтверждение', component: ConfirmationStep}
    ]

    const nextStep = useCallback(() => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1)
        }
    }, [currentStep, steps.length])

    const prevStep = useCallback(() => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1)
        }
    }, [currentStep])

    const isStepValid = useCallback((step: number) => {
        const validations = [
            () => formData.subject !== '',
            () => formData.target !== '',
            () => formData.format.length > 0,
            () => formData.language.length > 0,
            () => true,
            () => true,
            () => formData.selectedTutor.id !== undefined,
            () => formData.contactInfo.value !== '' && formData.selectedDate !== null && formData.selectedTime !== '',
            () => true
        ]
        return validations[step] ? validations[step]() : false
    }, [formData])

    const CurrentStepComponent = steps[currentStep].component

    return (
        <Modal open={open} onClose={closeModal} className="lg:w-[40%] lg:h-[500px]">
            <div className="flex flex-col w-full h-[500px]">
                <div className="flex-grow flex flex-col p-6 overflow-hidden">
                    <div className="text-center mb-6">
                        <span className="text-2xl font-bold">{steps[currentStep].title}</span>
                    </div>
                    <div className="justify-center flex flex-grow items-center overflow-auto">
                        <CurrentStepComponent formData={formData} updateFormData={updateFormData}/>
                    </div>
                    {currentStep < steps.length - 1 && <Progress value={(currentStep) / (steps.length -1 ) * 100} className={'w-full'}/>}
                    <div className="flex justify-between mt-6">
                        {currentStep > 0 && (
                            <Button onClick={prevStep}>
                                Назад
                            </Button>
                        )}
                        {currentStep < steps.length - 1 && (
                            <Button
                                onClick={nextStep}
                                className="ml-auto"
                                disabled={!isStepValid(currentStep)}
                            >
                                {currentStep === 4 && formData.days?.length === 0 ? 'Пропустить' : 'Далее'}
                            </Button>
                        )}
                    </div>
                </div>
                <Button
                    variant="link"
                    onClick={closeModal}
                    className="absolute top-2 right-2 p-0 h-auto hover:scale-110 transition-all duration-300"
                >
                    <SquareX className="w-6 h-6"/>
                </Button>
            </div>
        </Modal>
    )
}