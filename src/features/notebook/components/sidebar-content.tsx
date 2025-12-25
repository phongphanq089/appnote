import { LogOut, Plus } from 'lucide-react'
import NoteBookList from '~/features/notebook/components/note-book-list'
import { ScrollArea } from '~/components/ui/scroll-area'
import { Button } from '~/components/ui/button'
import ModalAction from './modal-action'
import { useAuthStore } from '~/store/use-auth-store'
import { authQuery } from '~/features/auth/auth.query'

const AppSidebarContent = () => {
  const { user } = useAuthStore()
  console.log(user, 'ksadhlkasjd')
  const { mutate: logout } = authQuery.useLogOut()
  return (
    <div className='flex flex-col h-full bg-gray-100 text-black font-bold dark:text-zinc-400 dark:bg-[#18181b]'>
      <div className='p-4 flex items-center gap-10 md:justify-between h-14 flex-none'>
        <div className='flex items-center gap-2 font-semibold dark:text-zinc-100'>
          <span className='text-sm'>NOTEBOOKS</span>
        </div>

        <ModalAction
          mode='create'
          userCtx={{
            userId: user?.$id as string,
            email: user?.email as string,
          }}
          trigger={
            <Button variant='ghost' size='icon' className='h-6 w-6'>
              <Plus className='h-4 w-4' />
            </Button>
          }
        />
      </div>
      <div className='flex-1 min-h-0 overflow-hidden'>
        <ScrollArea className='h-full'>
          <NoteBookList />
        </ScrollArea>
      </div>

      <div className='p-3 border-t dark:border-zinc-800 flex-none px-3'>
        <div className='flex items-center gap-3'>
          <Button
            type='button'
            onClick={() => logout()}
            variant={'outline'}
            className='flex items-center justify-between min-h-[55px] w-full'
          >
            <div className='flex text-start justify-start flex-col gap-1'>
              <h4 className='font-bold text-gray-700 dark:text-white uppercase'>
                Logout
              </h4>
              <p className='text-xs font-light text-gray-700 dark:text-gray-300'>
                {user?.email}
              </p>
            </div>
            <LogOut />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AppSidebarContent
