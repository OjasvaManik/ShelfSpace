import { Editor } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

new Editor({
    // bind Tiptap to the `.element`
    element: document.querySelector('.element'),
    // register extensions
    extensions: [Document, Paragraph, Text],
    // set the initial content
    content: '<p>Example Text</p>',
    // place the cursor in the editor after initialization
    autofocus: true,
    // make the text editable (default is true)
    editable: true,
    // prevent loading the default CSS (which isn't much anyway)
    injectCSS: false,
})
