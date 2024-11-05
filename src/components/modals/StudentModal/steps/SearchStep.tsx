import React from 'react';
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface SearchProps {
    updateFormData: (key: string, value: string) => void
    formData: {
        subject: string
    }
}

const SearchStep = ({ updateFormData, formData }: SearchProps) => {
    return (
        <div className='flex flex-col gap-2 justify-center'>
            <span className={'text-xl font-bold'}>Ответьте на вопросы и мы подберем Вам подходящих репетиторов</span>
            <Label className='mt-4'>Какой предмет вы изучаете?</Label>
            <Select
                value={formData.subject}
                onValueChange={(value) => updateFormData('subject', value)}
            >
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
};

export default SearchStep;