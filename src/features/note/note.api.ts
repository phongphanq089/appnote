import { ID, Query } from 'appwrite'
import { databases } from '~/lib/appwrite'
import { APPWRITE_CONFIG } from '~/lib/appwrite-config'

const { DATABASE_ID, COLLECTION_NAME } = APPWRITE_CONFIG

export const noteApi = {
  getNoteByNoteBookId: async (notebookId: string) => {
    if (!notebookId) return []
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_NAME.notes,
      [Query.equal('notebookId', notebookId), Query.orderDesc('$createdAt')]
    )
    return response.documents
  },
  createNote: async (notebookId: string) => {
    console.log(notebookId)
    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_NAME.notes,
      ID.unique(),
      {
        notebookId: notebookId,
        content: '',
        createdDate: new Date().toISOString(),
      }
    )
    return response
  },
}
