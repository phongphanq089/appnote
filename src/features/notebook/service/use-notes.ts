import { useQuery } from '@tanstack/react-query'
import { notebookApi } from './note.api'

export const useGetNoteBooks = () => {
  return useQuery({
    queryKey: ['notes'],
    queryFn: notebookApi.getNotes,
    staleTime: 1000 * 60 * 5,
  })
}
