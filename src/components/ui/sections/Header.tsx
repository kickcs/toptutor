import {Button} from "@/components/ui/button";

const Header = () => {
    return (
        <div className={'bg-amber-100 flex items-center py-4 px-24 gap-x-2 fixed w-full top-0'}>
            TopTutor.uz
            <Button className={'ml-24'}>
                Найти репитора
            </Button>
            <Button>
                Стать репетитором
            </Button>
            <Button className={'ml-auto'}>
                Войти
            </Button>
        </div>
    );
};

export default Header;