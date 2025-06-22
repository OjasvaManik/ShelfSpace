import React, {cloneElement, isValidElement, useRef} from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const DialogPrompt = ({
                          children,
                          content,
                          title,
                          description,
                      }: {
    children?: React.ReactNode
    content?: React.ReactNode
    title?: string
    description?: string
}) => {
    const triggerRef = useRef<HTMLButtonElement>(null)
    const injectedChild = isValidElement(children)
        ? cloneElement(children, { ref: triggerRef })
        : null
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>{injectedChild}</DialogTrigger>
                <DialogContent className={'bg-black border-none'}>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        {content ? (
                            <div className="text-sm text-gray-500">
                                {content}
                            </div>
                        ) : null}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
export default DialogPrompt
