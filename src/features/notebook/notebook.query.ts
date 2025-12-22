import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { notebookApi } from './notebook.api'

const NOTEBOOK_KEYS = {
  all: ['notebooks'] as const,
  lists: () => [...NOTEBOOK_KEYS.all, 'list'] as const,
}

export const useGetNoteBooks = () => {
  return useQuery({
    queryKey: NOTEBOOK_KEYS.lists(),
    queryFn: notebookApi.getNotebooks,
    staleTime: 1000 * 60 * 5,
  })
}

export const useDeleteNotebook = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (notebookId: string) => notebookApi.deleteNotebook(notebookId),
    onSuccess: () => {
      // 1. Cập nhật lại danh sách Notebook (Sidebar)
      queryClient.invalidateQueries({ queryKey: NOTEBOOK_KEYS.lists() })

      // 2. Cập nhật lại danh sách Note (vì note đã bị xoá hết)
      // Giả sử key bên file note.query.ts là 'notes'
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
    onError: (error) => {
      // Xử lý lỗi (ví dụ: Toast notification)
      console.log(error, 'error =======>')
    },
  })
}
