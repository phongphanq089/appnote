export const APPWRITE_CONFIG = {
  END_POINT:
    import.meta.env.VITE_APPWRITE_ENDPOINT ||
    'https://sgp.cloud.appwrite.io/v1',
  PROJECT_ID:
    import.meta.env.VITE_APPWRITE_PROJECT_ID || '6906eafc002b9600435a',
  DATABASE_ID:
    import.meta.env.VITE_APPWRITE_DATABASE_ID || '6907206c00260a7ecab1',
  COLLECTION_NAME: {
    notes: import.meta.env.VITE_APPWRITE_COLLECTION_NOTES,
    notebooks:
      import.meta.env.VITE_APPWRITE_COLLECTION_NOTEBOOKS || 'notebooks',
    tags: import.meta.env.VITE_APPWRITE_COLLECTION_TAGS,
  },
  BUCKET_IDS: {
    images: import.meta.env.VITE_APPWRITE_BUCKET_IMAGES,
  },
}
