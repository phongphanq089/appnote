import type { SerializedEditorState } from 'lexical'

import { useState } from 'react'
import { ThemeProvider } from './provider/ThemeProvider'
import { Editor } from './components/editor/block/editor-x/Editor'

const initialValue = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'Hello World 🚀',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
} as unknown as SerializedEditorState
function App() {
  const [editorState, setEditorState] =
    useState<SerializedEditorState>(initialValue)

  console.log(editorState, '=====>')
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <div className='flex items-center justify-between min-h-screen'>
        <div className='max-w-[1200px] w-full mx-auto'>
          <Editor
            editorSerializedState={editorState}
            onSerializedChange={(value) => setEditorState(value)}
          />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
