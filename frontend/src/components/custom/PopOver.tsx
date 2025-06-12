import Link from "next/link"
import { Button } from "@/components/ui/button"
import { menu } from "../../../data/menu"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function PopOver() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="link" className="text-white border-2 rounded-md">
                    Menu
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit mx-10 border-2 rounded-md bg-transparent text-white" side="bottom">
                <div className="grid gap-2 grid-cols-3">
                    {menu.map((item, index) => (
                        <Button key={index} >
                            <Link href={item.path}>
                                {item.title}
                            </Link>
                        </Button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}
