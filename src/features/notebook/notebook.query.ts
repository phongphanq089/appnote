import { useQuery } from '@tanstack/react-query'
import { notebookApi } from './notebook.api'

export const useGetNoteBooks = () => {
  return useQuery({
    queryKey: ['notesBook'],
    queryFn: notebookApi.getNotebooks,
    staleTime: 1000 * 60 * 5,
  })
}
