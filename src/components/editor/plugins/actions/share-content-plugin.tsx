'use client'

import { useEffect } from 'react'
import {
  editorStateFromSerializedDocument,
  type SerializedDocument,
  serializedDocumentFromEditorState,
} from '@lexical/file'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { CLEAR_HISTORY_COMMAND } from 'lexical'
import { Share2Icon } from 'lucide-react'
import { toast } from 'sonner'

import {
  docFromHash,
  docToHash,
} from '~/components/editor/utils/doc-serialization'
import { Button } from '~/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip'

export function ShareContentPlugin() {
  const [editor] = useLexicalComposerContext()
  async function shareDoc(doc: SerializedDocument): Promise<void> {
    const url = new URL(window.location.toString())
    url.hash = await docToHash(doc)
    const newUrl = url.toString()
    window.history.replaceState({}, '', newUrl)
    await window.navigator.clipboard.writeText(newUrl)
  }
  useEffect(() => {
    docFromHash(window.location.hash).then((doc) => {
      if (doc && doc.source === 'editor') {
        editor.setEditorState(editorStateFromSerializedDocument(editor, doc))
        editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined)
      }
    })
  }, [editor])

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={'ghost'}
          onClick={() =>
            shareDoc(
              serializedDocumentFromEditorState(editor.getEditorState(), {
                source: 'editor',
              }),
            ).then(
              () => toast.success('URL copied to clipboard'),
              () => toast.error('URL could not be copied to clipboard'),
            )
          }
          title='Share'
          aria-label='Share Playground link to current editor state'
          size={'icon'}
          className='w-10 h-10 border border-border bg-background hover:bg-secondary rounded-none flex items-center justify-center transition-all opacity-80 hover:opacity-100 group'
        >
          <Share2Icon className='size-5 text-primary group-hover:scale-110 transition-transform' />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Share Content</TooltipContent>
    </Tooltip>
  )
}
