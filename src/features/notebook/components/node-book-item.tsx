import { Edit } from 'lucide-react'
import { useSearchParams } from 'react-router'
import { Button } from '~/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'
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
      className={`w-full justify-start px-2 py-1.5 text-sm font-normal relative rounded-none transition-colors group ${
        activeNotebookId === id
          ? 'bg-primary text-primary-foreground font-bold'
          : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
      }`}
    >
      <Button
        variant='ghost'
        onClick={() => handleSelectNotebook(id)}
        className={`flex justify-start gap-2 w-full pr-10 hover:bg-transparent rounded-none h-8 ${activeNotebookId === id ? 'text-primary-foreground' : ''}`}
      >
        <span
          className={`mr-2 flex items-center justify-center opacity-100 ${activeNotebookId === id ? 'text-black' : 'text-primary'}`}
        >
          {icon}
        </span>
        <div className='w-full overflow-hidden'>
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className='flex-1 block text-left whitespace-nowrap overflow-hidden text-ellipsis w-full'>
                  {label}
                </span>
              </TooltipTrigger>
              <TooltipContent
                side='right'
                className='max-w-[300px] wrap-break-word'
              >
                <p>{label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
            <span
              className={`cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity ${activeNotebookId === id ? 'text-primary-foreground hover:text-background' : 'text-muted-foreground hover:text-primary'}`}
            >
              <Edit size={14} />
            </span>
          }
        />
      </div>
    </div>
  )
}
