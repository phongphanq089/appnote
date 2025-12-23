import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { notebookApi, type CreateNotebookPayload } from './notebook.api'

const NOTEBOOK_KEYS = {
  all: ['notebooks'] as const,
  lists: () => [...NOTEBOOK_KEYS.all, 'list'] as const,
  list: (userId: string) => [...NOTEBOOK_KEYS.lists(), userId] as const,
}

export const useGetNoteBooks = (userId: string) => {
  return useQuery({
    queryKey: NOTEBOOK_KEYS.list(userId),
    queryFn: () => notebookApi.getNotebooks(userId),
    enabled: !!userId,
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
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
    onError: (error) => {
      console.log(error, 'error =======>')
    },
  })
}

export const useCreateNotebook = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateNotebookPayload) =>
      notebookApi.createNoteBook(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: NOTEBOOK_KEYS.list(variables.userId),
      })
    },
  })
}

export const useUpdateNotebook = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      notebookId,
      title,
    }: {
      notebookId: string
      title: string
    }) => notebookApi.updateNoteBook(notebookId, title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTEBOOK_KEYS.lists() })
    },
  })
}
