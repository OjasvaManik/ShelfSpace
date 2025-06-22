import { Editor } from '@tiptap/react'
import {
    AlignCenter,
    AlignLeft,
    AlignRight,
    Bold, CodeIcon,
    Heading1,
    Heading2, Heading3, Highlighter, ImageIcon,
    Italic, List,
    ListOrdered,
    Strikethrough, VideoIcon
} from "lucide-react";
import {Toggle} from "@/components/ui/toggle";

const TiptapMenu = ({ editor }: { editor: Editor | null }) => {
    if (!editor) return null

    const options = [
        {
            icon: <Heading1 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            pressed: editor.isActive("heading", { level: 1 }),
        },
        {
            icon: <Heading2 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            pressed: editor.isActive("heading", { level: 2 }),
        },
        {
            icon: <Heading3 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            pressed: editor.isActive("heading", { level: 3 }),
        },
        {
            icon: <Bold className="size-4" />,
            onClick: () => editor.chain().focus().toggleBold().run(),
            pressed: editor.isActive("bold"),
        },
        {
            icon: <Italic className="size-4" />,
            onClick: () => editor.chain().focus().toggleItalic().run(),
            pressed: editor.isActive("italic"),
        },
        {
            icon: <Strikethrough className="size-4" />,
            onClick: () => editor.chain().focus().toggleStrike().run(),
            pressed: editor.isActive("strike"),
        },
        {
            icon: <AlignLeft className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("left").run(),
            pressed: editor.isActive({ textAlign: "left" }),
        },
        {
            icon: <AlignCenter className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("center").run(),
            pressed: editor.isActive({ textAlign: "center" }),
        },
        {
            icon: <AlignRight className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("right").run(),
            pressed: editor.isActive({ textAlign: "right" }),
        },
        {
            icon: <List className="size-4" />,
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            pressed: editor.isActive("bulletList"),
        },
        {
            icon: <ListOrdered className="size-4" />,
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            pressed: editor.isActive("orderedList"),
        },
        {
            icon: <Highlighter className="size-4" />,
            onClick: () => editor.chain().focus().toggleHighlight().run(),
            pressed: editor.isActive("highlight"),
        },
        {
            icon: <ImageIcon className="size-4" />,
            onClick: () => {
                const url = window.prompt("Enter image URL");
                if (url) {
                    editor.chain().focus().setImage({ src: url }).run();
                }
            },
            pressed: editor.isActive("image"),
        },
        {
            icon: <CodeIcon className="size-4" />,
            onClick: () => editor.chain().focus().toggleCodeBlock().run(),
            pressed: editor.isActive("codeBlock"),
        },
        {
            icon: <VideoIcon className="size-4" />,
            onClick: () => {
                const url = window.prompt("Enter youtube URL");
                if (url) {
                    editor.chain().focus().setYoutubeVideo({ src: url }).run();
                }
            },
            pressed: editor.isActive("youtube"),
        },
    ]

    return (
        <div className={'mt-4 '}>
            {options.map((option, index) => (
                <Toggle
                    key={index}
                    pressed={option.pressed}
                    onPressedChange={option.onClick}
                >
                    {option.icon}
                </Toggle>
            ))}
        </div>
    )
}

export default TiptapMenu