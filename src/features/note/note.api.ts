/* eslint-disable @typescript-eslint/no-explicit-any */
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
  getNode: async (noteId: string) => {
    if (!noteId) return null
    const response = await databases.getDocument(
      DATABASE_ID,
      COLLECTION_NAME.notes,
      noteId
    )
    return response
  },
  createNote: async (notebookId: string) => {
    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_NAME.notes,
      ID.unique(),
      {
        notebookId: notebookId,
        title: 'Untitled Note',
        content: '',
        createdDate: new Date().toISOString(),
      }
    )
    return response
  },
  updateNote: async (noteId: string, payload: any) => {
    console.log('update note', noteId, payload)
    const response = await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_NAME.notes,
      noteId,
      {
        ...payload,
      }
    )
    return response
  },
  deleteNote: async (noteId: string) => {
    if (!noteId) throw new Error('Note ID is required')

    await databases.deleteDocument(DATABASE_ID, COLLECTION_NAME.notes, noteId)

    return true
  },
}
