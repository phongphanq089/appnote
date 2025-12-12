import { Folder } from 'lucide-react'
import { HeaderNodeBookList } from '~/features/notebook/components/header-node-book-list'
import { useGetNoteBooks } from '../notebook.query'

const NoteBookList = () => {
  const { data: noteBooks, isLoading, error } = useGetNoteBooks()

  if (isLoading) return <div>Đang tải danh sách...</div>
  if (error) return <div>Lỗi khi tải ghi chú!</div>

  return (
    <div className='space-y-0.5 pr-3'>
      {noteBooks?.map((notebook) => (
        <HeaderNodeBookList
          key={notebook.id}
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
