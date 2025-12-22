import { ArrowRight, Trash2 } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { DialogTitle } from '~/components/ui/dialog'
import { ScrollArea } from '~/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet'
import { useResponsive } from '~/hooks/use-responsive'
import HeaderNode from './header-node'
import { cn } from '~/lib/utils'
import { useDeleteNote, useGetNotes } from '../note.query'
import { useSearchParams } from 'react-router'
import {
  EmptyData,
  ErrorData,
  LoadingSkeleton,
} from '~/components/shared/status-data'
import type { Models } from 'appwrite'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const SidebarNoteList = () => {
  const { isMd } = useResponsive()

  const [searchParams, setSearchParams] = useSearchParams()

  const activeNotebookId = searchParams.get('notebookId')

  const activeNoteId = searchParams.get('noteId')

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

  const handleDeleNote = (noteId: string) => {
    deleteNote.mutate(noteId, {
      onSuccess: () => {
        toast.success(`Delenote success`)
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
        />
      ) : (
        <SidebarNoteListMobile
          notes={notes}
          activeNoteId={activeNoteId}
          onSelect={handleSelectNote}
          onDelete={handleDeleNote}
        />
      )}
    </>
  )
}

export default SidebarNoteList

const SidebarNoteListMobile = ({
  notes,
  activeNoteId,
  onSelect,
  onDelete,
}: {
  notes: Models.DefaultDocument[] | undefined
  activeNoteId: string | null
  onSelect: (id: string) => void
  onDelete: (id: string) => void
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='dark:text-zinc-400 text-xs'
        >
          <ArrowRight className='h-4 w-4 mr-1' />
          List
        </Button>
      </SheetTrigger>
      <SheetContent side='right' className='p-0 w-[280px] dark:bg-[#18181b]'>
        <DialogTitle>
          <div className='mt-10'>
            <HeaderNode />
          </div>
        </DialogTitle>

        <ScrollArea className='h-full flex-1 min-h-0'>
          {!notes || notes.length === 0 ? (
            <EmptyData />
          ) : (
            <>
              {notes.map((note) => {
                const isActive = activeNoteId === note.$id
                return (
                  <div
                    key={note.$id}
                    onClick={() => onSelect(note.$id)}
                    className={cn(
                      'p-4 border-b dark:border-zinc-800 text-gray-700 dark:text-zinc-300 cursor-pointer',
                      isActive
                        ? 'bg-blue-200 dark:bg-[#0f2e4a] border-l-4 border-l-blue-500'
                        : 'border-l-4 border-l-transparent'
                    )}
                  >
                    <div className='flex items-center justify-between relative w-full'>
                      <h4
                        className={`text-sm font-semibold mb-1 line-clamp-1 ${
                          isActive ? 'dark:text-white' : 'dark:text-zinc-300'
                        }`}
                      >
                        {note.title ? note.title : 'Untitled Note'}
                      </h4>
                      <span
                        className='cursor-pointer absolute top-1/2  -translate-y-1/2 right-1 text-red-700'
                        onClick={() => onDelete(note.$id)}
                      >
                        <Trash2 size={19} />
                      </span>
                    </div>
                  </div>
                )
              })}
            </>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

const SidebarNoteListDesktop = ({
  notes,
  activeNoteId,
  onSelect,
  onDelete,
}: {
  notes: Models.DefaultDocument[] | undefined
  activeNoteId: string | null
  onSelect: (id: string) => void
  onDelete: (id: string) => void
}) => {
  return (
    <div className='flex-1 min-h-0 overflow-hidden'>
      <ScrollArea className='h-full w-full'>
        {!notes || notes.length === 0 ? (
          <EmptyData />
        ) : (
          <>
            {notes?.map((note) => {
              const isActive = activeNoteId === note.$id
              return (
                <div
                  key={note.$id}
                  onClick={() => onSelect(note.$id)}
                  className={`p-3 border-b dark:border-zinc-800 cursor-pointer group hover:bg-zinc-800/10 transition-colors ${
                    isActive
                      ? 'bg-blue-200 dark:bg-[#0f2e4a] border-l-4 border-l-blue-500'
                      : 'border-l-4 border-l-transparent'
                  }`}
                >
                  <div className='flex items-center justify-between relative w-full'>
                    <h4
                      className={`text-sm font-semibold mb-1 line-clamp-1 ${
                        isActive ? 'dark:text-white' : 'dark:text-zinc-300'
                      }`}
                    >
                      {note.title ? note.title : 'Untitled Note'}
                    </h4>
                    <span
                      className='cursor-pointer absolute top-1/2 px-3 -translate-y-1/2 right-2 text-red-700'
                      onClick={() => onDelete(note.$id)}
                    >
                      <Trash2 size={19} />
                    </span>
                  </div>
                </div>
              )
            })}
          </>
        )}
      </ScrollArea>
    </div>
  )
}
