import { Edit } from 'lucide-react'
import { useSearchParams } from 'react-router'
import { Button } from '~/components/ui/button'
import ModalAction from './modal-action'

export function NodeBookItem({
  icon,
  label,
  id,
}: {
  icon: React.ReactNode
  label: string
  count?: number
  active?: boolean
  id: string
}) {
  const [searchParams, setSearchParams] = useSearchParams()

  const activeNotebookId = searchParams.get('notebookId')

  const handleSelectNotebook = (notebookId: string) => {
    setSearchParams({ notebookId: notebookId })
  }

  return (
    <div
      className={`w-full justify-start px-2 text-sm font-normal relative rounded-sm ${
        activeNotebookId === id
          ? 'bg-primary/20 text-priamry font-bold'
          : 'dark:text-zinc-400 hover:dark:text-zinc-100 hover:dark:bg-zinc-800 hover:bg-gray-200'
      }`}
    >
      <Button
        variant='ghost'
        onClick={() => handleSelectNotebook(id)}
        className='flex justify-start gap-2 w-full hover:bg-transparent'
      >
        <span className='mr-2 opacity-100'>{icon}</span>
        <div className='max-w-[95px] w-full'>
          <span className='flex-1 text-left truncate line-clamp-1'>
            {label}
          </span>
        </div>
      </Button>

      <div className='flex items-center gap-2 absolute top-1/2 -translate-y-1/2 right-0 min-w-[35px] z-5'>
        <ModalAction
          mode='edit'
          initialData={{
            id: id,
            title: label,
          }}
          trigger={
            <span className='cursor-pointer'>
              <Edit className='text-red-500' size={16} />
            </span>
          }
        />
      </div>
    </div>
  )
}
