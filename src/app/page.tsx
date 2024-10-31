"use client";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Working from "@/components/sections/Working";
import Features from "@/components/sections/Features";
import {ModalProvider} from "@/contexts/ModalContext";
import StudentModal from "@/components/modals/StudentModal";
import TeacherModal from "@/components/modals/TeacherModal";

export default function Home() {
    return (
        <ModalProvider>
            <header className="mb-12 lg:mb-[96px] lg:px-0">
                <Header/>
            </header>
            <main className="space-y-12 md:space-y-16 sm:px-12 lg:px-24">
                <Hero/>
                <Working/>
                <Features/>
            </main>
            <footer>
                {/*<Footer/>*/}
            </footer>
            <StudentModal/>
            <TeacherModal/>
        </ModalProvider>
    );
}
