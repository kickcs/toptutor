import React from 'react';
import {Slider} from "@/components/ui/slider";

interface PriceStepProps {
    formData: {
        price: number
    },
    updateFormData: (key: string, value: number) => void
}

const formatPrice = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

const PriceStep = ({updateFormData, formData}: PriceStepProps) => {
    return (
        <div className='flex flex-col gap-1 w-full'>
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
};

export default PriceStep;