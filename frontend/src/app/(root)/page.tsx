import Hero from "@/components/custom/Hero";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <Hero />
        <div className={'flex justify-center items-center flex-col mt-5 mx-4'}>
            <div className={'flex justify-center items-center flex-col mt-2 lg:mt-15'}>
                <p className={'text-center lg:text-2xl border-b-3 border-amber-500 '}>
                    You need to be logged in to access the content of this site.
                </p>
                <div className={'flex justify-center items-center flex-col mt-8 border-y-8 rounded-lg border-amber-500 p-10 gap-5 min-w-sm'}>
                    <Link href={'/login'}>
                        <Button className={'w-30 bg-amber-500 hover:bg-white hover:text-amber-500 min-w-xs hover:cursor-pointer'}>
                            Login
                        </Button>
                    </Link>
                    <Link href={'/register'}>
                        <Button className={'w-30 bg-amber-500 hover:bg-white hover:text-amber-500 min-w-xs hover:cursor-pointer'} >
                            Register
                        </Button>
                    </Link>
                </div>
            </div>
            <div className={'flex justify-center items-center flex-col mt-2 lg:mt-15'}>
                <p className={'text-center lg:text-2xl border-b-3 border-amber-500 flex'}>
                    View all your favorite movies, series, and anime in one place.
                </p>
                <p className="mt-8 border-y-8 rounded-lg border-amber-500 p-10 min-w-sm flex flex-wrap justify-center gap-2 text-center">
                    Click on&nbsp;
                    <span className="text-amber-500 border-b">M in searchbar</span>
                    &nbsp;to get started. Or read the&nbsp;
                    <Link href="/docs" className="text-amber-500 hover:text-white underline">
                        documentation
                    </Link>
                    .
                </p>
            </div>
        </div>
    </main>
  );
}
