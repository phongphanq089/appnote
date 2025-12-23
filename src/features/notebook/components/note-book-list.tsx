import { Folder } from 'lucide-react'
import { useGetNoteBooks } from '../notebook.query'
import { ErrorData, LoadingSkeleton } from '~/components/shared/status-data'

import { useAuthStore } from '~/store/use-auth-store'
import { NodeBookItem } from './node-book-item'

const NoteBookList = () => {
  const { user } = useAuthStore()
  const {
    data: noteBooks,
    refetch,
    isLoading,
    error,
  } = useGetNoteBooks(user?.$id as string)

  if (isLoading) return <LoadingSkeleton totalLoading={14} />
  if (error) return <ErrorData refetch={refetch} />

  return (
    <div className='space-y-0.5 pr-3'>
      {noteBooks?.map((notebook) => (
        <NodeBookItem
          key={notebook.$id}
          icon={
            <Folder
              className={`h-4 w-4 text-primary`}
              fill='currentColor'
              fillOpacity={0.2}
            />
          }
          label={notebook.title}
          count={notebook.$sequence}
          active={false}
          id={notebook.$id}
        />
      ))}
    </div>
  )
}

export default NoteBookList
