import { ArrowRight } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { DialogTitle } from '~/components/ui/dialog'
import { ScrollArea } from '~/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet'
import { useResponsive } from '~/hooks/use-responsive'
import HeaderNode from './header-node'
import { useDeleteNote, useGetNotes } from '../note.query'
import { useSearchParams } from 'react-router'
import { ErrorData, LoadingSkeleton } from '~/components/shared/status-data'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import type { NoteListProps } from '../type'
import { NoteList } from './note-list'
import type { Models } from 'appwrite'

const SidebarNoteList = () => {
  const { isMd } = useResponsive()

  const [searchParams, setSearchParams] = useSearchParams()

  const activeNotebookId = searchParams.get('notebookId')

  const activeNoteId = searchParams.get('noteId')

  const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null)

  const {
    data: notes,
    refetch,
    isLoading,
    error,
  } = useGetNotes(activeNotebookId || '')

  const deleteNote = useDeleteNote()

  useEffect(() => {
    if (notes && notes.length > 0 && !activeNoteId) {
      const firstNoteId = notes[0].$id
      setSearchParams(
        (prev) => {
          prev.set('noteId', firstNoteId)
          return prev
        },
        { replace: true }
      )
    }
  }, [notes, activeNoteId, setSearchParams])

  const handleSelectNote = (noteId: string) => {
    setSearchParams((prev) => {
      prev.set('noteId', noteId)
      return prev
    })
  }

  const getNextActiveNoteId = (
    notes: Models.DefaultDocument[],
    deletedId: string
  ) => {
    const index = notes.findIndex((n) => n.$id === deletedId)
    if (index === -1) return null

    // ưu tiên note phía trước
    if (index > 0) return notes[index - 1].$id

    // nếu xoá note đầu tiên
    if (index === 0 && notes.length > 1) return notes[1].$id

    return null
  }
  const handleDeleNote = (noteId: string) => {
    if (!notes) return
    const isDeletingActive = activeNoteId === noteId

    const nextActiveId = isDeletingActive
      ? getNextActiveNoteId(notes, noteId)
      : null
    setDeletingNoteId(noteId)
    deleteNote.mutate(noteId, {
      onSuccess: () => {
        toast.success(`Delete success`)

        if (isDeletingActive) {
          if (nextActiveId) {
            setSearchParams((prev) => {
              prev.set('noteId', nextActiveId)
              return prev
            })
          } else {
            setSearchParams((prev) => {
              prev.delete('noteId')
              return prev
            })
          }
        }
      },
      onSettled: () => {
        setDeletingNoteId(null)
      },
    })
  }

  if (isLoading) return <LoadingSkeleton totalLoading={14} />
  if (error) return <ErrorData refetch={refetch} />

  return (
    <>
      {isMd ? (
        <SidebarNoteListDesktop
          notes={notes}
          activeNoteId={activeNoteId}
          onSelect={handleSelectNote}
          onDelete={handleDeleNote}
          deletingNoteId={deletingNoteId}
        />
      ) : (
        <SidebarNoteListMobile
          notes={notes}
          activeNoteId={activeNoteId}
          onSelect={handleSelectNote}
          onDelete={handleDeleNote}
          deletingNoteId={deletingNoteId}
        />
      )}
    </>
  )
}

export default SidebarNoteList

const SidebarNoteListDesktop = (props: NoteListProps) => {
  return (
    <div className='flex-1 min-h-0 overflow-hidden'>
      <ScrollArea className='h-full'>
        <NoteList
          {...props}
          itemClassName='mb-2 px-2'
          iconClassName='absolute right-2 top-1/2 -translate-y-1/2'
        />
      </ScrollArea>
    </div>
  )
}

const SidebarNoteListMobile = (props: NoteListProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='sm' className='text-xs'>
          <ArrowRight className='h-4 w-4 mr-1' />
          List
        </Button>
      </SheetTrigger>

      <SheetContent side='right' className='p-0 w-[280px] dark:bg-[#18181b]'>
        <DialogTitle className='mt-10'>
          <HeaderNode />
        </DialogTitle>

        <ScrollArea className='h-full'>
          <NoteList
            {...props}
            itemClassName='mb-2 px-2'
            iconClassName='absolute right-1 top-1/2 -translate-y-1/2'
          />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
