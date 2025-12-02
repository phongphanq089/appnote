import { Menu } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet'
import AppSidebarContent from './sidebar-content'
import { useResponsive } from '~/hooks/use-responsive'
import { DialogTitle } from '~/components/ui/dialog'
import SidebarNoteList from '~/features/note/components/sidebar-noteList'

const SidebarNodeBooks = () => {
  const { isMd } = useResponsive()

  return (
    <>
      {isMd ? (
        <AppSidebarContent />
      ) : (
        <div className='flex-none h-14 bg-accent dark:bg-[#18181b] border-b dark:border-zinc-800 flex items-center px-4 justify-between z-50'>
          <div className='flex items-center gap-3'>
            <SidebarNodeBooksMobile />
            <SidebarNoteList />
          </div>
          <span className='dark:text-zinc-200 font-semibold text-sm'>
            @tanstack/react-query
          </span>
        </div>
      )}
    </>
  )
}

export default SidebarNodeBooks

const SidebarNodeBooksMobile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='dark:text-zinc-400'>
          <Menu className='h-5 w-5' />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='p-0 w-[280px] bg-[#18181b] '>
        <DialogTitle className='hidden'></DialogTitle>
        <AppSidebarContent />
      </SheetContent>
    </Sheet>
  )
}
