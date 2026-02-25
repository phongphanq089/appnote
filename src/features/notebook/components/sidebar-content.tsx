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
    <div className='flex flex-col h-full bg-background text-foreground tracking-tight'>
      <div className='p-4 flex items-center gap-10 md:justify-between h-14 flex-none'>
        <div className='flex items-center gap-2 font-bold text-primary'>
          <span className='text-sm uppercase tracking-widest'>_NOTEBOOKS</span>
        </div>

        <ModalAction
          mode='create'
          userCtx={{
            userId: user?.$id as string,
            email: user?.email as string,
          }}
          trigger={
            <Button
              variant='ghost'
              size='icon'
              className='h-6 w-6 text-primary hover:text-primary-foreground hover:bg-primary rounded-sm transition-colors'
            >
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

      <div className='p-3 border-t border-border flex-none px-3'>
        <div className='flex items-center gap-3'>
          <Button
            type='button'
            onClick={() => logout()}
            variant={'outline'}
            className='flex items-center justify-between min-h-[55px] w-full border-border bg-background hover:bg-secondary hover:text-foreground text-left'
          >
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground font-bold text-lg rounded-sm'>
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className='flex flex-col gap-0.5 leading-tight'>
                <h4 className='font-bold text-primary uppercase text-xs tracking-wider'>
                  DEV_NODE_ON
                </h4>
                <p className='text-[10px] font-mono text-muted-foreground'>
                  user@{user?.email || 'local'}
                </p>
              </div>
            </div>
            <LogOut className='w-4 h-4 text-muted-foreground' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AppSidebarContent
