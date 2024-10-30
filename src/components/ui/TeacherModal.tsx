import Modal from "@/components/ui/modal";
import {SquareX} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";

interface TeacherModalProps {
    open: boolean;
    onClose: () => void;
}

const TeacherModal = ({open, onClose}: TeacherModalProps) => {
    return (
        <Modal open={open} onClose={onClose} className={'w-1/2'}>
            <div className={'flex justify-between gap-8 items-center'}>
                <div className={'flex flex-col gap-1'}>
                    <Label className={'font-bold'}>ФИО</Label>
                    <Input type="text" placeholder="Введите ФИО"/>
                    <Label className={'font-bold'}>Предмет (переделать под список)</Label>
                    <Input type="text" placeholder="Математика, Физика, Английский язык"/>
                    <Label className={'font-bold'}>Стаж (в годах)</Label>
                    <Input type="number" placeholder="1"/>
                    {/* photo */}
                    <Label className={'font-bold'}>О себе</Label>
                    <Input type="text" placeholder="Краткое описание"/>
                    <Label className={'font-bold'}>Telegram User</Label>
                    <Input type="text" placeholder="@username"/>
                </div>
                <div className={'flex flex-col flex-grow gap-1'}>
                    <Label className={'font-bold'}>Для кого преподаете? (можно выбрать несколько)</Label>
                    <div className={'grid grid-cols-2 gap-0.5'}>
                        <ToggleGroup type="multiple" className={'flex flex-col gap-0.5'}>
                            <ToggleGroupItem value="preschool" aria-label="Preschool">
                                <span>дошкольникам</span>
                            </ToggleGroupItem>
                            <ToggleGroupItem value="school" aria-label="School">
                                <span>школьникам</span>
                            </ToggleGroupItem>
                        </ToggleGroup>
                        <ToggleGroup type="multiple" className={'flex flex-col gap-0.5'}>
                            <ToggleGroupItem value="exam-preparation" aria-label="Exam Preparation">
                                <span>готовлю к экзаменам</span>
                            </ToggleGroupItem>
                            <ToggleGroupItem value="business-career" aria-label="Business/Career">
                                <span>бизнес/карьера</span>
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                    <Label className={'font-bold'}>Формат занятий (можно выбрать несколько)</Label>
                    <ToggleGroup type="multiple" className={'flex justify-start items-center gap-2'}>
                        <ToggleGroupItem value="online" aria-label="Online">
                            <span>онлайн</span>
                        </ToggleGroupItem>
                        <ToggleGroupItem value="offline" aria-label="Offline">
                            <span>офлайн</span>
                        </ToggleGroupItem>
                    </ToggleGroup>
                    <Label className={'font-bold'}>Языки ведения (можно выбрать несколько)</Label>
                    <ToggleGroup type="multiple" className={'flex justify-start items-center gap-2'}>
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
                    <Label className={'font-bold'}>Стоимость 1 часа занятия</Label>
                    <div className="flex items-center">
                        <Input type="text" placeholder="min"/>
                        <span className="mx-2">-</span>
                        <Input type="text" placeholder="max"/>
                    </div>
                </div>
                <Button
                    variant={'link'}
                    onClick={onClose}
                    className={'absolute top-0 right-0 aspect-auto w-4'}
                >
                    <SquareX width={'16px'}/>
                </Button>
            </div>
            <Button className={'mr-auto mt-4'}>
                Отправить
            </Button>
        </Modal>
    )
        ;
};

export default TeacherModal;
