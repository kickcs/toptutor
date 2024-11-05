import {Button} from "@/components/ui/button";
import Image from 'next/image';
import {useModal} from "@/contexts/ModalContext";

const Hero = () => {
    const {openModal} = useModal();

    return (
        <section className="flex flex-col lg:flex-row justify-between items-center px-4 lg:px-0 gap-8 lg:gap-0">
            <div className="flex flex-col gap-4 text-center lg:text-left max-w-full lg:max-w-lg">
                <p className="text-3xl sm:text-4xl lg:text-5xl font-semibold">
                    Учись с лучшими репетиторами Узбекистана
                </p>
                <Button
                    className="w-full sm:w-3/4 lg:w-2/3 font-bold text-xl lg:text-2xl h-12 mx-auto lg:mx-0"
                    onClick={() => openModal('student')}
                >
                    Найти репетитора
                </Button>
            </div>
            <Image
                src="/hero.webp"
                alt="hero"
                width={500}
                height={400}
                className="rounded-3xl w-full h-auto object-cover mt-8 -order-1 lg:order-1"
                priority
            />
        </section>
    );
};

export default Hero;
