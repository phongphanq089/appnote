import { useMutation, useQuery } from '@tanstack/react-query'
import { noteApi } from './note.api'

export const useGetNotes = (notebookId: string) => {
  return useQuery({
    queryKey: ['notes', notebookId],
    queryFn: () => noteApi.getNoteByNoteBookId(notebookId),
    enabled: !!notebookId,
    staleTime: 1000 * 60 * 5,
  })
}

export const useCreateNote = () => {
  return useMutation({
    mutationFn: (notebookId: string) => noteApi.createNote(notebookId),
  })
}
