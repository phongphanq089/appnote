import { ArrowRight } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { DialogTitle } from '~/components/ui/dialog'
import { ScrollArea } from '~/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet'
import { useResponsive } from '~/hooks/use-responsive'
import HeaderNode from './header-node'
import { cn } from '~/lib/utils'
import { useGetNotes } from '../note.query'
import { useSearchParams } from 'react-router'

const SidebarNoteList = () => {
  const { isMd } = useResponsive()

  const [searchParams] = useSearchParams()

  const activeNotebookId = searchParams.get('notebookId')

  const { data: notes, isLoading } = useGetNotes(activeNotebookId || '')

  console.log(notes, '======= get notes')

  if (isLoading) return <div>Đang tải ghi chú...</div>

  return <>{isMd ? <SidebarNoteListDesktop /> : <SidebarNoteListMobile />}</>
}

export default SidebarNoteList

const noteList = [
  {
    id: 1,
    title: '@tanstack/react-query',
    active: true,
    snippet: '@tanstack/react-query là một thư viện giúp quản lý...',
  },
  {
    id: 2,
    title: 'TanStack Table',
    active: false,
    snippet: 'Headless UI for building powerful tables...',
  },
  {
    id: 3,
    title: 'Zustand State',
    active: false,
    snippet: 'Small, fast and scalable bearbones state-management...',
  },
]

const SidebarNoteListMobile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='dark:text-zinc-400 text-xs'
        >
          <ArrowRight className='h-4 w-4 mr-1' /> List
        </Button>
      </SheetTrigger>
      <SheetContent side='right' className='p-0 w-[280px] dark:bg-[#18181b]'>
        <DialogTitle>
          <div className='mt-10'>
            <HeaderNode />
          </div>
        </DialogTitle>

        <ScrollArea className='h-full flex-1 min-h-0'>
          {noteList.map((note) => (
            <div
              key={note.id}
              className={cn(
                'p-4 border-b dark:border-zinc-800 text-gray-700 dark:text-zinc-300',
                note.active
                  ? 'bg-blue-200 dark:bg-[#0f2e4a] border-l-4 border-l-blue-500'
                  : 'border-l-4 border-l-transparent'
              )}
            >
              {note.title}
            </div>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

const SidebarNoteListDesktop = () => {
  return (
    <div className='flex-1 min-h-0 overflow-hidden'>
      <ScrollArea className='h-full w-full'>
        {noteList.map((note) => (
          <div
            key={note.id}
            className={`p-3 border-b dark:border-zinc-800 cursor-pointer group hover:bg-zinc-800/10 transition-colors ${
              note.active
                ? 'bg-blue-200 dark:bg-[#0f2e4a] border-l-4 border-l-blue-500'
                : 'border-l-4 border-l-transparent'
            }`}
          >
            <h4
              className={`text-sm font-semibold mb-1 ${
                note.active ? 'dark:text-white' : 'dark:text-zinc-300'
              }`}
            >
              {note.title}
            </h4>
            <p className='text-xs text-zinc-700 dark:text-zinc-500 line-clamp-2'>
              {note.snippet}
            </p>
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}
