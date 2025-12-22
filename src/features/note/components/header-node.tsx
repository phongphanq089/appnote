import {
  CheckSquare,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Search,
} from 'lucide-react'
import { useSearchParams } from 'react-router'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useLayout } from '~/provider/layout-provider'
import { useCreateNote } from '../note.query'
import { toast } from 'react-toastify'

const HeaderNode = () => {
  const { toggleLeftSidebar, isLeftCollapsed } = useLayout()

  const [searchParams, setSearchParams] = useSearchParams()

  const getNoteBookId = searchParams.get('notebookId') || ''

  const { mutate: addNewNote, isPending } = useCreateNote()

  const handleAddNote = () => {
    if (!getNoteBookId) {
      toast.error('Please slelect Notebook before creating a Note!')
      return
    }
    addNewNote(getNoteBookId, {
      onSuccess: (newNote) => {
        setSearchParams((prev) => {
          prev.set('notebookId', newNote.notebookId)
          prev.set('noteId', newNote.$id)
          return prev
        })
      },
      onError: (error) => {
        toast.error(error.message)
        console.log(error.message, 'error.message ============>')
      },
    })
  }

  return (
    <div className='p-3 space-y-3 border-b dark:border-zinc-800 h-auto flex-none'>
      <div className='flex gap-2'>
        {/* NÚT TOGGLE SIDEBAR TRÁI */}
        <Button
          variant='ghost'
          size='icon'
          onClick={toggleLeftSidebar}
          className='h-8 w-8 text-blue-500 dark:text-zinc-400 shrink-0'
          title={isLeftCollapsed ? 'Open Sidebar' : 'Close Sidebar'}
        >
          {isLeftCollapsed ? (
            <PanelLeftOpen className='h-4 w-4' />
          ) : (
            <PanelLeftClose className='h-4 w-4' />
          )}
        </Button>

        <Button
          className='flex-1 bg-blue-600 hover:bg-blue-700 text-white h-8 text-xs font-medium'
          onClick={handleAddNote}
          disabled={isPending}
        >
          <Plus className='h-3.5 w-3.5 mr-1' /> Note
        </Button>
        <Button
          variant='secondary'
          className='bg-zinc-700 hover:bg-zinc-600 text-zinc-200 h-8 text-xs border border-zinc-600 px-2'
        >
          <CheckSquare className='h-3.5 w-3.5' />
        </Button>
      </div>
      <div className='relative'>
        <Search className='absolute left-2 top-2 h-4 w-4 text-zinc-500' />
        <Input
          placeholder='Search...'
          className='pl-8 dark:bg-zinc-900 dark:border-zinc-700 text-zinc-300 h-8 text-sm focus-visible:dark:ring-zinc-600'
        />
      </div>
    </div>
  )
}

export default HeaderNode
