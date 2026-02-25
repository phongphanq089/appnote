/* eslint-disable react-hooks/exhaustive-deps */
import { AnimatedThemeToggler } from '~/components/shared/animated-theme-toggler'
import { useGetNoteDetail, useUpdateNote } from '../note/note.query'
import { useSearchParams } from 'react-router'
import { useEffect, useState } from 'react'
import { Input } from '~/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'

const EditorHeader = () => {
  const [searchParams] = useSearchParams()
  const noteId = searchParams.get('noteId')

  const { data: noteDetail, isLoading } = useGetNoteDetail(noteId as string)

  const { mutate: updateNote } = useUpdateNote()

  const [titleInput, setTitleInput] = useState('')

  useEffect(() => {
    if (noteDetail) {
      setTitleInput(noteDetail.title || '')
    }
  }, [noteDetail])

  useEffect(() => {
    if (!noteId || !noteDetail) return
    const timer = setTimeout(() => {
      if (noteId && noteDetail && titleInput !== noteDetail.title) {
        updateNote({
          noteId,
          payload: { title: titleInput },
        })
      }
    }, 800)
    return () => clearTimeout(timer)
  }, [titleInput, noteDetail, noteId])

  return (
    <header className='h-14 flex items-center justify-between px-6 border-b border-border bg-background flex-none'>
      <div className='flex items-center gap-2 overflow-hidden w-full'>
        {isLoading ? (
          <div className='h-5 w-1/3 bg-zinc-200 dark:bg-zinc-700 animate-pulse rounded' />
        ) : (
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className='flex items-center w-full max-w-[50%] md:max-w-[70%]'>
                  <Input
                    className='text-xs md:text-sm font-bold text-primary tracking-widest uppercase border-none px-0 h-9 focus-visible:ring-0 bg-transparent! placeholder:text-muted-foreground truncate flex-1'
                    placeholder='Untitled Note'
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent side='bottom' className='max-w-[300px]'>
                <p>{titleInput || 'Untitled Note'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className='flex items-center gap-3 text-muted-foreground'>
        <div className='hidden md:flex items-center text-xs font-bold font-mono tracking-widest rounded-sm border border-border p-0.5 mr-2'>
          <button className='px-3 py-1 bg-secondary text-foreground rounded-sm'>
            WRITE
          </button>
          <button className='px-3 py-1 hover:text-foreground hover:bg-secondary rounded-sm transition-colors'>
            PREVIEW
          </button>
        </div>
        <AnimatedThemeToggler />
      </div>
    </header>
  )
}

export default EditorHeader
