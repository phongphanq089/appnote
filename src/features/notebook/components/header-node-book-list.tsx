import { Edit } from 'lucide-react'
import { useSearchParams } from 'react-router'
import { Button } from '~/components/ui/button'

export function HeaderNodeBookList({
  icon,
  label,
  id,
  onDelete,
}: {
  icon: React.ReactNode
  label: string
  count?: number
  active?: boolean
  id: string
  onDelete: (id: string) => void
}) {
  const [searchParams, setSearchParams] = useSearchParams()

  const activeNotebookId = searchParams.get('notebookId')

  const handleSelectNotebook = (notebookId: string) => {
    setSearchParams({ notebookId: notebookId })
  }

  return (
    <div
      className={`w-full justify-start h-8 px-2 text-sm font-normal relative ${
        activeNotebookId === id
          ? 'bg-blue-600/20 text-blue-400 font-bold'
          : 'dark:text-zinc-400 hover:dark:text-zinc-100 hover:dark:bg-zinc-800 hover:bg-gray-200'
      }`}
    >
      <Button
        variant='ghost'
        onClick={() => handleSelectNotebook(id)}
        className='flex items-center gap-2'
      >
        <span className='mr-2 opacity-100'>{icon}</span>
        <div className='max-w-[95px] w-full'>
          <span className='flex-1 text-left truncate line-clamp-1'>
            {label}
          </span>
        </div>
      </Button>

      <div className='flex items-center gap-2 absolute top-1/2 -translate-y-1/2 right-0 min-w-[35px] z-5'>
        <span className='cursor-pointer' onClick={() => onDelete(id)}>
          <Edit className='text-red-500' size={16} />
        </span>
      </div>
    </div>
  )
}
