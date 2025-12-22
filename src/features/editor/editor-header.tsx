/* eslint-disable react-hooks/exhaustive-deps */
import { MoreHorizontal } from 'lucide-react'
import { AnimatedThemeToggler } from '~/components/shared/animated-theme-toggler'
import { Button } from '~/components/ui/button'
import { useGetNoteDetail, useUpdateNote } from '../note/note.query'
import { useSearchParams } from 'react-router'
import { useEffect, useState } from 'react'
import { Input } from '~/components/ui/input'

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
    <header className='h-12 flex items-center justify-between px-4 border-b dark:border-zinc-800 bg-accent dark:bg-[#1e1e1e] flex-none'>
      <div className='flex items-center gap-2 overflow-hidden w-full'>
        {isLoading ? (
          <div className='h-5 w-1/3 bg-zinc-200 dark:bg-zinc-700 animate-pulse rounded' />
        ) : (
          <Input
            className='text-lg  font-semibold text-zinc-700 dark:text-zinc-200 border-none px-0 h-9 focus-visible:ring-0 bg-transparent! placeholder:text-zinc-400'
            placeholder='Untitled Note'
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
          />
        )}
      </div>
      <div className='flex items-center gap-2 text-zinc-400'>
        <Button
          variant='ghost'
          size='icon'
          className='h-8 w-8 hover:text-white'
        >
          <MoreHorizontal className='h-4 w-4' />
        </Button>
        <AnimatedThemeToggler />
      </div>
    </header>
  )
}

export default EditorHeader
