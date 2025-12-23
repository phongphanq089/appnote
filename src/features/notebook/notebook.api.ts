import { ID, Query } from 'appwrite'
import { databases } from '~/lib/appwrite'
import { APPWRITE_CONFIG } from '~/lib/appwrite-config'

const { DATABASE_ID, COLLECTION_NAME } = APPWRITE_CONFIG

export interface CreateNotebookPayload {
  title: string
  userId: string
  email: string
}

export const notebookApi = {
  getNotebooks: async (userId: string) => {
    if (!userId) return []
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_NAME.notebooks,
      [Query.equal('userId', userId), Query.orderDesc('createdDate')]
    )
    return response.documents
  },
  deleteNotebook: async (notebookId: string) => {
    if (!notebookId) throw new Error('Missing notebookId')
    try {
      const childNotes = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_NAME.notes,
        [Query.equal('notebookId', notebookId), Query.limit(100)]
      )

      // BƯỚC 2: Xoá song song tất cả các note con
      // Sử dụng Promise.all để xoá nhanh hơn
      const deletePromises = childNotes.documents.map((note) =>
        databases.deleteDocument(DATABASE_ID, COLLECTION_NAME.notes, note.$id)
      )

      await Promise.all(deletePromises)

      // BƯỚC 3: Sau khi dọn sạch con, xoá Notebook cha
      await databases.deleteDocument(
        DATABASE_ID,
        COLLECTION_NAME.notebooks,
        notebookId
      )

      return true
    } catch (error) {
      console.error('Error deleting notebook and its contents:', error)
      throw error
    }
  },
  createNoteBook: async ({ title, userId, email }: CreateNotebookPayload) => {
    return await databases.createDocument(
      DATABASE_ID,
      COLLECTION_NAME.notebooks,
      ID.unique(),
      {
        title,
        userId,
        createdBy: email,
        createdDate: new Date().toISOString(),
        isPublic: false,
        lastModified: null,
      }
    )
  },

  updateNoteBook: async (notebookId: string, title: string) => {
    return await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_NAME.notebooks,
      notebookId,
      {
        title,
        lastModified: new Date().toISOString(),
      }
    )
  },
}
