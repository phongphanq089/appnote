import type { Models } from 'appwrite'
import { Loader2, Trash2 } from 'lucide-react'
import { cn } from '~/lib/utils'

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
        'border-b dark:border-zinc-800 cursor-pointer transition-colors py-2 px-4 rounded-md',
        isActive ? 'bg-primary/20' : ''
      )}
    >
      <div className='flex items-center justify-between relative w-full'>
        <h4
          className={cn(
            'text-sm font-semibold mb-1 line-clamp-1 pr-4',
            isActive ? 'dark:text-white' : 'dark:text-zinc-300'
          )}
        >
          {note.title || 'Untitled Note'}
        </h4>

        {isDeleting ? (
          <Loader2
            className={cn('h-4 w-4 animate-spin text-red-700', iconClassName)}
          />
        ) : (
          <Trash2
            size={18}
            className={cn('text-red-700 cursor-pointer', iconClassName)}
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
