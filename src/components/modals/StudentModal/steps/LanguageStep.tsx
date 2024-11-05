import React from 'react';
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";

interface LanguageStepProps {
    updateFormData: (key: string, value: string[]) => void
    formData: {
        language: string[]
    }
}

const LanguageStep = ({updateFormData, formData}: LanguageStepProps) => {
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
};

export default LanguageStep;