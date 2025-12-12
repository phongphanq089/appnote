import { Edit } from 'lucide-react'
import { useSearchParams } from 'react-router'
import { Button } from '~/components/ui/button'

export function HeaderNodeBookList({
  icon,
  label,
  count,
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
    <Button
      variant='ghost'
      onClick={() => handleSelectNotebook(id)}
      className={`w-full justify-start h-8 px-2 text-sm font-normal relative ${
        activeNotebookId === id
          ? 'bg-blue-600/20 text-blue-400 font-bold'
          : 'dark:text-zinc-400 hover:dark:text-zinc-100 hover:dark:bg-zinc-800 hover:bg-gray-200'
      }`}
    >
      <span className='mr-2 opacity-100'>{icon}</span>
      <div className='max-w-[95px] w-full'>
        <span className='flex-1 text-left truncate line-clamp-1'>{label}</span>
      </div>
      <div className='flex items-center gap-2 absolute top-1/2 -translate-y-1/2 right-1 min-w-[35px]'>
        <span className='cursor-pointer'>
          <Edit className='text-red-500' />
        </span>
        {count !== undefined && (
          <span className='ml-auto text-xs opacity-100 font-bold'>
            {count}{' '}
          </span>
        )}
      </div>
    </Button>
  )
}
