import Hero from "@/components/custom/Hero";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HomeMain from "@/components/custom/HomeMain";


export default function Home() {
    return (
        <main className="">
            <Hero />
            <HomeMain />
        </main>
    );
}
