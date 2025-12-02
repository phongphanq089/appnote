import { Plus } from 'lucide-react'
import NoteBookList from '~/features/notebook/components/note-book-list'
import SettingDropdown from '~/components/shared/setting-dropdown'
import { ScrollArea } from '~/components/ui/scroll-area'
import { Button } from '~/components/ui/button'

const AppSidebarContent = () => {
  return (
    <div className='flex flex-col h-full bg-gray-100 text-black font-bold dark:text-zinc-400 dark:bg-[#18181b]'>
      <div className='p-4 flex items-center gap-10 md:justify-between h-14 flex-none'>
        <div className='flex items-center gap-2 font-semibold dark:text-zinc-100'>
          <span className='text-sm'>NOTEBOOKS</span>
        </div>
        <Button variant='ghost' size='icon' className='h-6 w-6'>
          <Plus className='h-4 w-4' />
        </Button>
      </div>
      <div className='flex-1 min-h-0 overflow-hidden'>
        <ScrollArea className='h-full'>
          <NoteBookList />
        </ScrollArea>
      </div>

      <div className='p-3 border-t dark:border-zinc-800 flex-none px-'>
        <div className='flex items-center gap-3'>
          <SettingDropdown />
        </div>
      </div>
    </div>
  )
}

export default AppSidebarContent
