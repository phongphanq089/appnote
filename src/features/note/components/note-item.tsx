import type { Models } from 'appwrite'
import { Loader2, Trash2 } from 'lucide-react'
import { cn } from '~/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'

type NoteItemProps = {
  note: Models.DefaultDocument
  isActive: boolean
  isDeleting: boolean
  onSelect: (id: string) => void
  onDelete: (id: string) => void
  iconClassName?: string
}

export const NoteItem = ({
  note,
  isActive,
  isDeleting,
  onSelect,
  onDelete,
  iconClassName,
}: NoteItemProps) => {
  return (
    <div
      onClick={() => onSelect(note.$id)}
      className={cn(
        'border-b border-border cursor-pointer transition-colors py-3 px-4 rounded-none border-l-2',
        isActive
          ? 'border-l-primary bg-primary/5'
          : 'border-l-transparent hover:bg-secondary',
      )}
    >
      <div className='flex items-center justify-between relative w-full'>
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <h4
                className={cn(
                  'text-sm font-bold mb-1 line-clamp-1 pr-10 uppercase tracking-wide flex-1 text-left w-full',
                  isActive
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary transition-colors',
                )}
              >
                {note.title || 'Untitled Note'}
              </h4>
            </TooltipTrigger>
            <TooltipContent side='bottom' className='max-w-[300px] break-words'>
              <p>{note.title || 'Untitled Note'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {isDeleting ? (
          <Loader2
            className={cn(
              'h-4 w-4 animate-spin text-muted-foreground',
              iconClassName,
            )}
          />
        ) : (
          <Trash2
            size={16}
            className={cn(
              'text-muted-foreground pl-2  min-w-8 flex-1 hover:text-destructive cursor-pointer opacity-100 group-hover:opacity-100 transition-opacity',
              iconClassName,
            )}
            onClick={(e) => {
              e.stopPropagation()
              onDelete(note.$id)
            }}
          />
        )}
      </div>
    </div>
  )
}
