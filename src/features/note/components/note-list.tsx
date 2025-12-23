import { EmptyData } from '~/components/shared/status-data'
import { NoteItem } from './note-item'

import type { NoteListProps } from '../type'

export const NoteList = ({
  notes,
  activeNoteId,
  deletingNoteId,
  onSelect,
  onDelete,
  itemClassName,
  iconClassName,
}: NoteListProps) => {
  if (!notes || notes.length === 0) return <EmptyData />

  return (
    <>
      {notes.map((note) => (
        <div key={note.$id} className={itemClassName}>
          <NoteItem
            note={note}
            isActive={activeNoteId === note.$id}
            isDeleting={deletingNoteId === note.$id}
            onSelect={onSelect}
            onDelete={onDelete}
            iconClassName={iconClassName}
          />
        </div>
      ))}
    </>
  )
}
