import React from 'react';
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";

interface FormatStepProps {
    updateFormData: (key: string, value: string[]) => void
    formData: {
        format: string[]
    }
}

const FormatStep = ({updateFormData, formData} : FormatStepProps) => {
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
};

export default FormatStep;