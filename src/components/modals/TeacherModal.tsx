"use client"

import React, {useState} from 'react'
import Modal from "@/components/ui/modal"
import {Check, Upload, X} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group"
import {useModal} from "@/contexts/ModalContext"
import {Textarea} from "@/components/ui/textarea"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {cn} from "@/lib/utils"

const TeacherModal = () => {
    const {modalType, closeModal} = useModal()
    const open = modalType === 'teacher'
    const [photo, setPhoto] = useState<File | null>(null)
    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        experience: '',
        about: '',
        telegram: '',
        teachingFor: [] as string[],
        format: [] as string[],
        languages: [] as string[],
        minPrice: '',
        maxPrice: ''
    })
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [step, setStep] = useState<'form' | 'preview' | 'processing'>('form')

    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setPhoto(event.target.files[0])
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setFormData(prev => ({...prev, [name]: value}))
        if (errors[name]) {
            setErrors(prev => ({...prev, [name]: ''}))
        }
    }

    const handleSelectChange = (value: string, name: string) => {
        setFormData(prev => ({...prev, [name]: value}))
        if (errors[name]) {
            setErrors(prev => ({...prev, [name]: ''}))
        }
    }

    const handleToggleGroupChange = (value: string[], name: string) => {
        setFormData(prev => ({...prev, [name]: value}))
        if (errors[name]) {
            setErrors(prev => ({...prev, [name]: ''}))
        }
    }

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {}
        if (!formData.name.trim()) newErrors.name = 'ФИО обязательно'
        if (!formData.subject) newErrors.subject = 'Выберите предмет'
        if (!formData.experience) newErrors.experience = 'Укажите стаж'
        if (!formData.about.trim()) newErrors.about = 'Расскажите о себе'
        if (!formData.telegram.trim()) newErrors.telegram = 'Укажите Telegram'
        if (formData.teachingFor.length === 0) newErrors.teachingFor = 'Выберите хотя бы одну категорию'
        if (formData.format.length === 0) newErrors.format = 'Выберите хотя бы один формат'
        if (formData.languages.length === 0) newErrors.languages = 'Выберите хотя бы один язык'
        if (!formData.minPrice) newErrors.minPrice = 'Укажите минимальную цену'
        if (!formData.maxPrice) newErrors.maxPrice = 'Укажите максимальную цену'
        if (!photo) newErrors.photo = 'Загрузите фото'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            setStep('preview')
        }
    }

    const handleBack = () => {
        setStep('form')
    }

    const handleConfirm = () => {
        setStep('processing')
        setTimeout(() => {
            console.log('Form submitted:', formData)
            closeModal()
        }, 5000)
    }

    const renderForm = () => (
        <form onSubmit={handleSubmit} className='p-8 bg-white rounded-xl shadow-2xl'>
            <h2 className='text-3xl font-bold mb-8 text-center text-gray-800'>Регистрация преподавателя</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className='space-y-3'>
                    <div>
                        <Label htmlFor='name' className='text-lg font-medium text-gray-700'>ФИО</Label>
                        <Input
                            id='name'
                            name='name'
                            type="text"
                            placeholder="Введите ФИО"
                            className='mt-2'
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name}</p>}
                    </div>
                    <div>
                        <Label htmlFor='subject' className='text-lg font-medium text-gray-700'>Предмет</Label>
                        <Select onValueChange={(value) => handleSelectChange(value, 'subject')}>
                            <SelectTrigger className='mt-2'>
                                <SelectValue placeholder="Выберите предмет"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="math">Математика</SelectItem>
                                <SelectItem value="physics">Физика</SelectItem>
                                <SelectItem value="english">Английский язык</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.subject && <p className='text-red-500 text-sm mt-1'>{errors.subject}</p>}
                    </div>
                    <div>
                        <Label htmlFor='experience' className='text-lg font-medium text-gray-700'>Стаж (в
                            годах)</Label>
                        <Input
                            id='experience'
                            name='experience'
                            type="number"
                            placeholder="1"
                            min="0"
                            className='mt-2'
                            value={formData.experience}
                            onChange={handleInputChange}
                        />
                        {errors.experience && <p className='text-red-500 text-sm mt-1'>{errors.experience}</p>}
                    </div>
                    <div>
                        <Label htmlFor='photo' className='text-lg font-medium text-gray-700'>Фото</Label>
                        <div className='mt-2 flex items-center space-x-2'>
                            <Button
                                type="button"
                                onClick={() => document.getElementById('photo')?.click()}
                                variant="outline"
                                className='w-full bg-blue-50 text-blue-600 hover:bg-blue-100'
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
                            {photo && <Check className='text-green-500 h-6 w-6'/>}
                        </div>
                        {errors.photo && <p className='text-red-500 text-sm mt-1'>{errors.photo}</p>}
                    </div>
                    <div>
                        <Label className='text-lg font-medium text-gray-700'>Формат занятий</Label>
                        <ToggleGroup
                            type="multiple"
                            className='mt-2 flex justify-start items-center gap-2'
                            value={formData.format}
                            onValueChange={(value) => handleToggleGroupChange(value, 'format')}
                        >
                            {['online', 'offline'].map((item) => (
                                <ToggleGroupItem
                                    key={item}
                                    value={item}
                                    aria-label={item}
                                    className={cn(
                                        'data-[state=on]:bg-blue-100 data-[state=on]:text-blue-600',
                                        'hover:bg-gray-100 transition-colors duration-200'
                                    )}
                                >
                                    <span>{item === 'online' ? 'онлайн' : 'офлайн'}</span>
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                        {errors.format && <p className='text-red-500 text-sm mt-1'>{errors.format}</p>}
                    </div>
                </div>
                <div className='space-y-3'>
                    <div>
                        <Label htmlFor='about' className='text-lg font-medium text-gray-700'>О себе</Label>
                        <Textarea
                            id='about'
                            name='about'
                            placeholder="Краткое описание"
                            className='mt-2 resize-none'
                            value={formData.about}
                            onChange={handleInputChange}
                        />
                        {errors.about && <p className='text-red-500 text-sm mt-1'>{errors.about}</p>}
                    </div>
                    <div>
                        <Label htmlFor='telegram' className='text-lg font-medium text-gray-700'>Telegram</Label>
                        <Input
                            id='telegram'
                            name='telegram'
                            type="text"
                            placeholder="@username"
                            className='mt-2'
                            value={formData.telegram}
                            onChange={handleInputChange}
                        />
                        {errors.telegram && <p className='text-red-500 text-sm mt-1'>{errors.telegram}</p>}
                    </div>
                    <div>
                        <Label className='text-lg font-medium text-gray-700'>Для кого преподаете?</Label>
                        <ToggleGroup
                            type="multiple"
                            className='mt-2 grid grid-cols-2 gap-2'
                            value={formData.teachingFor}
                            onValueChange={(value) => handleToggleGroupChange(value, 'teachingFor')}
                        >
                            {['preschool', 'school', 'exam-preparation', 'business-career'].map((item) => (
                                <ToggleGroupItem
                                    key={item}
                                    value={item}
                                    aria-label={item}
                                    className={cn(
                                        'data-[state=on]:bg-blue-100 data-[state=on]:text-blue-600',
                                        'hover:bg-gray-100 transition-colors duration-200'
                                    )}
                                >
                                        <span>{item === 'preschool' ? 'дошкольникам' :
                                            item === 'school' ? 'школьникам' :
                                                item === 'exam-preparation' ? 'готовлю к экзаменам' :
                                                    'бизнес/карьера'}</span>
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                        {errors.teachingFor && <p className='text-red-500 text-sm mt-1'>{errors.teachingFor}</p>}
                    </div>
                    <div>
                        <Label className='text-lg font-medium text-gray-700'>Языки ведения</Label>
                        <ToggleGroup
                            type="multiple"
                            className='mt-2 flex justify-start items-center gap-2'
                            value={formData.languages}
                            onValueChange={(value) => handleToggleGroupChange(value, 'languages')}
                        >
                            {['english', 'uzbek', 'russian'].map((item) => (
                                <ToggleGroupItem
                                    key={item}
                                    value={item}
                                    aria-label={item}
                                    className={cn(
                                        'data-[state=on]:bg-blue-100 data-[state=on]:text-blue-600',
                                        'hover:bg-gray-100 transition-colors duration-200'
                                    )}
                                >
                                    <span>{item === 'english' ? 'английский' :
                                        item === 'uzbek' ? 'узбекский' : 'русский'}</span>
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                        {errors.languages && <p className='text-red-500 text-sm mt-1'>{errors.languages}</p>}
                    </div>
                </div>
            </div>
            <div className='mt-4 space-y-3'>
                <Label className='text-lg font-medium text-gray-700'>Стоимость 1 часа занятия (сум)</Label>
                <div className="flex items-center space-x-2 mt-2">
                    <Input
                        type="number"
                        name="minPrice"
                        placeholder="мин"
                        className='w-1/2'
                        value={formData.minPrice}
                        onChange={handleInputChange}
                    />
                    <span>-</span>
                    <Input
                        type="number"
                        name="maxPrice"
                        placeholder="макс"
                        className='w-1/2'
                        value={formData.maxPrice}
                        onChange={handleInputChange}
                    />
                </div>
                {(errors.minPrice || errors.maxPrice) && (
                    <p className='text-red-500 text-sm mt-1'>{errors.minPrice || errors.maxPrice}</p>
                )}
            </div>

            <Button type="submit"
                    className='mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-lg transition-colors duration-200'>
                Отправить
            </Button>
            <Button
                type="button"
                variant='ghost'
                onClick={closeModal}
                className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
            >
                <X className='h-6 w-6'/>
            </Button>
        </form>
    )

    const renderPreview = () => (
        <div className='p-8 bg-white rounded-xl shadow-2xl'>
            <h2 className='text-3xl font-bold mb-8 text-center text-gray-800'>Предварительный просмотр</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div>
                    <p><strong>ФИО:</strong> {formData.name}</p>
                    <p><strong>Предмет:</strong> {formData.subject}</p>
                    <p><strong>Стаж:</strong> {formData.experience} лет</p>
                    <p><strong>Формат занятий:</strong> {formData.format.join(', ')}</p>
                    <p><strong>Для кого преподаете:</strong> {formData.teachingFor.join(', ')}</p>
                </div>
                <div>
                    <p><strong>О себе:</strong> {formData.about}</p>
                    <p><strong>Telegram:</strong> {formData.telegram}</p>
                    <p><strong>Языки ведения:</strong> {formData.languages.join(', ')}</p>
                    <p><strong>Стоимость 1 часа:</strong> {formData.minPrice} - {formData.maxPrice} сум</p>
                </div>
            </div>
            <div className='mt-8 flex justify-between'>
                <Button onClick={handleBack} variant="outline">Назад</Button>
                <Button onClick={handleConfirm}>Подтвердить</Button>
            </div>
        </div>
    )

    const renderProcessing = () => (
        <div className='p-8 bg-white rounded-xl shadow-2xl text-center'>
            <h2 className='text-3xl font-bold mb-8 text-gray-800'>Обработка заявки</h2>
            <p>Ваша анкета находится в обработке. Мы свяжемся с вами в ближайшее время.</p>
        </div>
    )

    return (
        <Modal open={open} onClose={closeModal} className='w-[800px] max-w-[95vw] max-h-[90vh] overflow-auto'>
            {step === 'form' && renderForm()}
            {step === 'preview' && renderPreview()}
            {step === 'processing' && renderProcessing()}
            <Button
                type="button"
                variant='ghost'
                onClick={closeModal}
                className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
            >
                <X className='h-6 w-6' />
            </Button>
        </Modal>
    )
}

export default TeacherModal