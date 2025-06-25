import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import {menu} from "../../../../data/menu";

export function AccordionMenu() {
    return (
        <Accordion
            type="single"
            collapsible
            className="w-full px-5"
            defaultValue={menu[0].category.toLowerCase()}
        >
            {menu.map((group) => (
                <AccordionItem key={group.category} value={group.category.toLowerCase()} className={'text-white'}>
                    <AccordionTrigger>{group.category}</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-2">
                        {group.items.map(({ title, path, icon: Icon }) => (
                            <Link
                                key={path}
                                href={path}
                                className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700 transition"
                            >
                                <Icon className="w-5 h-5 text-gray-500" />
                                <span className="text-base">{title}</span>
                            </Link>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}
