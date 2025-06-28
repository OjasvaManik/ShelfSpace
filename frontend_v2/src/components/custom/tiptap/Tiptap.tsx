'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TiptapMenu from "@/components/custom/tiptap/TiptapMenu";
import {TextAlign} from "@tiptap/extension-text-align";
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import {CodeBlockLowlight} from "@tiptap/extension-code-block-lowlight";
import { lowlight } from 'lowlight/lib/core'
import {Youtube} from "@tiptap/extension-youtube";
import Link from "@tiptap/extension-link";
import {Subscript} from "@tiptap/extension-subscript";
import {CharacterCount} from "@tiptap/extension-character-count";
import { Mathematics } from '@tiptap/extension-mathematics';
import 'katex/dist/katex.min.css'

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
                    class: 'bg-gray-200 text-black',
                },
            }),
            Image.configure({
                inline: true,
                allowBase64: true,
                HTMLAttributes: { class: 'max-w-full h-auto rounded-md' },
            }),
            Youtube.configure({
                ccLanguage: 'en',
                HTMLAttributes: {
                    class: 'w-fit',
                },
            }),
            Link.configure({
                openOnClick: true,
                autolink: true,
                HTMLAttributes: {
                    class: 'text-amber-500 hover:text-pink-500 underline hover:cursor-pointer break-all',
                },
            }),
            Subscript,
            CharacterCount.configure({
                textCounter: (text) => [...new Intl.Segmenter().segment(text)].length,
            }),
            Mathematics.configure({
                shouldRender: (state, pos, node) => {
                    const $pos = state.doc.resolve(pos)
                    return node.type.name === 'text' && $pos.parent.type.name !== 'codeBlock'
                },
            })
        ],
        editorProps: {
            attributes: {
                class:
                    'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl mt-2 px-3 focus:outline-none focus-visible:ring-0 rounded-md w-full min-h-[300px] ProseMirror text-wrap',
            },
        },
        content, // 🧠 use the passed-in description here
        onUpdate: ({ editor }) => {
            setDescription(editor.getHTML())
        },
    })

    return (
        <div className="relative">
            <div className="sticky top-0 z-10 bg-white border-b border-gray-300 rounded-t-md">
                <TiptapMenu editor={editor} />
            </div>
            <EditorContent className="select-text" editor={editor} />
        </div>
    )
}

export default Tiptap

