import React from 'react'
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Menu from "@/components/custom/Menu";
import AddGuide from "@/components/custom/AddGuide";
import DialogPrompt from "@/components/custom/DialogPrompt";

const GuideNav = () => {
    return (
        <nav className={'grid grid-cols-2'}>
            <div>
                <h1 className={'font-extrabold text-xl lg:text-4xl uppercase text-amber-500'}>Guides</h1>
            </div>
            <div className={'flex justify-end gap-4'}>
                <div>
                    <Button variant={'outline'} className={'bg-transparent border-4 border-white/50 hover:bg-white/10 text-white/75 hover:text-white'}>
                        <Link href="/guides">All Guides</Link>
                    </Button>
                </div>
                <div className={'justify-end gap-4 flex'}>
                    <Link href={'/guides/new'}>
                        <Button variant={'secondary'} className={'w-20 bg-amber-500 text-white hover:bg-white hover:text-amber-500 active:bg-white active:text-amber-500'}>
                            Add new
                        </Button>
                    </Link>

                </div>
                {/*<div className={'flex justify-end gap-4 lg:hidden'}>*/}
                {/*    <DialogPrompt content={<AddGuide />} title="Create Guide" description="Fill in the form to create a new guide">*/}
                {/*        <Button variant={'secondary'} className={'w-20 bg-amber-500 text-white hover:bg-white hover:text-amber-500 active:bg-white active:text-amber-500'}>*/}
                {/*            Add new*/}
                {/*        </Button>*/}
                {/*    </DialogPrompt>*/}
                {/*    <Button variant="secondary" className="w-20 bg-amber-500 text-white hover:bg-white hover:text-amber-500 active:bg-white active:text-amber-500">Edit</Button>*/}
                {/*</div>*/}
            </div>
        </nav>
    )
}
export default GuideNav
