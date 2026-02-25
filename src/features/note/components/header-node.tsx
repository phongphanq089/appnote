import { Menu, PanelLeftClose, PanelLeftOpen, Search } from 'lucide-react'
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
    <div className='p-4 space-y-4 border-b border-border h-auto flex-none bg-background'>
      <div className='flex gap-2 items-center'>
        <Button
          variant='ghost'
          size='icon'
          onClick={toggleLeftSidebar}
          className='h-10 w-10 text-muted-foreground hover:text-primary shrink-0'
          title={isLeftCollapsed ? 'Open Sidebar' : 'Close Sidebar'}
        >
          {isLeftCollapsed ? (
            <PanelLeftOpen className='h-5 w-5' />
          ) : (
            <PanelLeftClose className='h-5 w-5' />
          )}
        </Button>

        <Button
          className='flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-10 text-xs font-bold tracking-widest uppercase rounded-sm border-none shadow-sm'
          onClick={handleAddNote}
          disabled={isPending}
        >
          <Menu className='h-4 w-4 mr-2' /> NEW ENTRY
        </Button>
      </div>
      <div className='relative'>
        <Search className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
        <Input
          placeholder='grep search...'
          className='pl-9 bg-background border-border text-foreground h-9 font-mono text-xs focus-visible:ring-primary rounded-sm'
        />
      </div>
    </div>
  )
}

export default HeaderNode
