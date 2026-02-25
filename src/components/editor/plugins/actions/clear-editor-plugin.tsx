'use client'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { CLEAR_EDITOR_COMMAND } from 'lexical'
import { Trash2Icon } from 'lucide-react'

import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip'

export function ClearEditorActionPlugin() {
  const [editor] = useLexicalComposerContext()

  return (
    <Dialog>
      <Tooltip disableHoverableContent>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              size={'icon'}
              variant={'ghost'}
              className='w-10 h-10 border border-border bg-background hover:bg-secondary rounded-none flex items-center justify-center transition-all opacity-80 hover:opacity-100 group'
            >
              <Trash2Icon className='h-5 w-5 text-primary group-hover:scale-110 transition-transform' />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Clear Editor</TooltipContent>
      </Tooltip>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Clear Editor</DialogTitle>
          <DialogDescription>
            Are you sure you want to clear the editor?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              variant='destructive'
              onClick={() => {
                editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined)
              }}
            >
              Clear
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
