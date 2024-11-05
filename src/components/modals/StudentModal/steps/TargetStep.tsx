import React from 'react';
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";


interface TargetStepsProps {
    updateFormData: (key: string, value: string) => void
    formData: {
        target: string
    }
}

const TargetStep = ({updateFormData, formData}: TargetStepsProps) => {
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

export default TargetStep;