import {Button} from "@/components/ui/button";
import Image from 'next/image'
import {useModal} from "@/contexts/ModalContext";

const Hero = () => {
    const {openModal} = useModal()
    return (
        <div>
            <section className={'flex justify-between items-center'}>
                <div className={'flex flex-col gap-4'}>
                    <p className={'text-5xl'}>Учись с лучшими репетиторами Узбекистана</p>
                    <Button
                        className={'w-1/2 font-bold'}
                        onClick={() => openModal('student')}
                    >
                        Найти репетитора
                    </Button>
                </div>
                <Image
                    src={'/hero.webp'}
                    alt={'hero'}
                    width={700}
                    height={500}
                    className={'rounded-3xl'}
                />
            </section>

        </div>
    );
};

export default Hero;