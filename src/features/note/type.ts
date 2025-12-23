import type { Models } from 'appwrite'

export type NoteListProps = {
  notes?: Models.DefaultDocument[]
  activeNoteId: string | null
  deletingNoteId: string | null
  onSelect: (id: string) => void
  onDelete: (id: string) => void
  itemClassName?: string
  iconClassName?: string
}
