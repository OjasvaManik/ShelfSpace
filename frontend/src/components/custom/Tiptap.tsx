'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TiptapMenu from "@/components/custom/Tiptap-Menu";
import {TextAlign} from "@tiptap/extension-text-align";
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import {CodeBlockLowlight} from "@tiptap/extension-code-block-lowlight";
import { lowlight } from 'lowlight/lib/core'
import {Youtube} from "@tiptap/extension-youtube";
import Link from "@tiptap/extension-link";
import {Subscript} from "@tiptap/extension-subscript";

const Tiptap = ({
                    content = '',
                    setDescription,
                }: {
    content?: string
    setDescription: (value: string) => void
}) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: { HTMLAttributes: { class: 'list-disc ml-3' } },
                orderedList: { HTMLAttributes: { class: 'list-decimal ml-3' } },
                horizontalRule: false,
            }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Highlight.configure({ HTMLAttributes: { class: 'bg-amber-500 text-white' } }),
            CodeBlockLowlight.configure({
                lowlight,
                HTMLAttributes: {
                    class: 'bg-blue-900',
                },
            }),
            Image.configure({
                inline: true,
                allowBase64: true,
                HTMLAttributes: { class: 'max-w-full h-auto rounded-md' },
            }),
            Youtube.configure({
                ccLanguage: 'en',
            }),
            Link.configure({
                openOnClick: true,
                autolink: true,
                HTMLAttributes: {
                    class: 'text-amber-500 hover:text-white underline hover:cursor-pointer',
                },
            }),
            Subscript
        ],
        editorProps: {
            attributes: {
                class:
                    'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl mt-5 p-4 focus:outline-none border-x-4 border-amber-500 focus-visible:border-white focus-visible:ring-0 rounded-md font-[Palanquin] text-sm w-full min-h-[300px] ProseMirror',
            },
        },
        content, // 🧠 use the passed-in description here
        onUpdate: ({ editor }) => {
            setDescription(editor.getHTML())
        },
    })

    return (
        <div>
            <TiptapMenu editor={editor} />
            <EditorContent className="select-text" editor={editor} />
        </div>
    )
}

export default Tiptap

