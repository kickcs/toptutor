import React from 'react';
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";

interface DaysStepProps {
    formData: {
        days: string[]
    }
    updateFormData: (key: string, value: string[]) => void
}

const DaysStep = ({updateFormData, formData}: DaysStepProps) => {
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
};

export default DaysStep;