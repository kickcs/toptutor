import React, {useState} from 'react';
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar";

interface ContactInfoStepProps {
    updateFormData: (key: string, value: any) => void
    formData: {
        selectedTime: string | undefined;
        selectedDate: Date | null;
        contactInfo: {
            type: string
            value: string
        }
    }
}

const ContactInfoStep = ({updateFormData, formData}: ContactInfoStepProps) => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const handleDateSelect = (date: Date | undefined) => {
        updateFormData('selectedDate', date);
        setIsCalendarOpen(false);
    };

    return (
        <div className='flex flex-col gap-4 w-full'>
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
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
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
                            onSelect={handleDateSelect}
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
};

export default ContactInfoStep;