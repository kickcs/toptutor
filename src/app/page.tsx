import Header from "@/components/ui/sections/Header";
import Hero from "@/components/ui/sections/Hero";
import Working from "@/components/ui/sections/Working";
import Features from "@/components/ui/sections/Features";

export default function Home() {
    return (
        <>
            <header className={'mb-[96px]'}>
                <Header/>
            </header>
            <main className={'px-24 space-y-16'}>
                <Hero/>
                <Working/>
                <Features/>
            </main>
            <footer>
                {/*<Footer/>*/}
            </footer>
        </>
    )
}
