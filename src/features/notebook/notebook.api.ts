import { Query } from 'appwrite'
import { databases } from '~/lib/appwrite'
import { APPWRITE_CONFIG } from '~/lib/appwrite-config'

const { DATABASE_ID, COLLECTION_NAME } = APPWRITE_CONFIG

export const notebookApi = {
  getNotebooks: async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_NAME.notebooks,
      [Query.orderDesc('$createdAt')]
    )
    return response.documents
  },
}
