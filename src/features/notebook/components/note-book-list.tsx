import { Folder } from 'lucide-react'
import { HeaderNodeBookList } from '~/features/notebook/components/header-node-book-list'
import { useDeleteNotebook, useGetNoteBooks } from '../notebook.query'
import { ErrorData, LoadingSkeleton } from '~/components/shared/status-data'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

const NoteBookList = () => {
  const { data: noteBooks, refetch, isLoading, error } = useGetNoteBooks()
  const navigate = useNavigate()

  const deleteNotebook = useDeleteNotebook()

  const handleDelete = async (id: string) => {
    deleteNotebook.mutate(id, {
      onSuccess: () => {
        toast.success('Deleted notebook successfully')
        // Nếu người dùng đang đứng ở trong notebook vừa xoá,
        // hãy đẩy họ về trang chủ để tránh lỗi 404
        navigate('/')
      },
    })
  }

  if (isLoading) return <LoadingSkeleton totalLoading={14} />
  if (error) return <ErrorData refetch={refetch} />

  return (
    <div className='space-y-0.5 pr-3'>
      {noteBooks?.map((notebook) => (
        <HeaderNodeBookList
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
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}

export default NoteBookList
