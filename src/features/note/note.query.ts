import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { noteApi } from './note.api'

const NOTE_KEYS = {
  all: ['notes'] as const,
  lists: () => [...NOTE_KEYS.all, 'list'] as const,
  list: (notebookId: string) => [...NOTE_KEYS.lists(), notebookId] as const,
  details: () => [...NOTE_KEYS.all, 'detail'] as const,
  detail: (noteId: string) => [...NOTE_KEYS.details(), noteId] as const,
}

export const useGetNotes = (notebookId: string) => {
  return useQuery({
    queryKey: NOTE_KEYS.list(notebookId),
    queryFn: () => noteApi.getNoteByNoteBookId(notebookId),
    enabled: !!notebookId,
    staleTime: 1000 * 60 * 5,
  })
}

export const useGetNoteDetail = (noteId: string) => {
  return useQuery({
    queryKey: NOTE_KEYS.detail(noteId),
    queryFn: () => noteApi.getNode(noteId),
    enabled: !!noteId,
  })
}

export const useCreateNote = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (notebookId: string) => noteApi.createNote(notebookId),
    onSuccess: (_, notebookId) => {
      queryClient.invalidateQueries({ queryKey: NOTE_KEYS.list(notebookId) })
    },
  })
}

export const useUpdateNote = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      noteId,
      payload,
    }: {
      noteId: string
      payload: { title?: string; content?: string; notebookId?: string }
    }) => noteApi.updateNote(noteId, payload),
    onSuccess: (data) => {
      queryClient.setQueryData(NOTE_KEYS.detail(data.$id), data)
      // (Tùy chọn) Làm mới danh sách để cập nhật title/preview ở sidebar
      queryClient.invalidateQueries({ queryKey: NOTE_KEYS.lists() })
    },
  })
}

export const useDeleteNote = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (noteId: string) => noteApi.deleteNote(noteId),
    onSuccess: (_, noteId) => {
      queryClient.invalidateQueries({ queryKey: NOTE_KEYS.lists() })
      queryClient.removeQueries({ queryKey: NOTE_KEYS.detail(noteId) })
    },
    onError: (error) => {
      console.error('Delete note failed:', error)
    },
  })
}

// export const useUpdateNote = () => {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: ({
//       noteId,
//       payload,
//     }: {
//       noteId: string
//       payload: { title?: string; content?: string; notebookId?: string }
//     }) => noteApi.updateNote(noteId, payload),

//     onMutate: async ({ noteId, payload }) => {
//       await queryClient.cancelQueries({
//         queryKey: NOTE_KEYS.detail(noteId),
//       })

//       const prev = queryClient.getQueryData(NOTE_KEYS.detail(noteId))

//       queryClient.setQueryData(NOTE_KEYS.detail(noteId), (old: any) => ({
//         ...old,
//         ...payload,
//       }))

//       return { prev }
//     },

//     onError: (_err, { noteId }, ctx) => {
//       if (ctx?.prev) {
//         queryClient.setQueryData(NOTE_KEYS.detail(noteId), ctx.prev)
//       }
//     },

//     onSettled: (_data, _err, { noteId }) => {
//       queryClient.invalidateQueries({
//         queryKey: NOTE_KEYS.detail(noteId),
//       })
//     },
//   })
// }
