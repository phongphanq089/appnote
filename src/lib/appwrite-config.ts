const requiredEnv = (key: string) => {
  const value = import.meta.env[key]
  if (!value) throw new Error(`Missing env: ${key}`)
  return value
}

export const APPWRITE_CONFIG = {
  END_POINT: requiredEnv('VITE_APPWRITE_ENDPOINT'),
  PROJECT_ID: requiredEnv('VITE_APPWRITE_PROJECT_ID'),
  DATABASE_ID: requiredEnv('VITE_APPWRITE_DATABASE_ID'),
  COLLECTION_NAME: {
    notes: requiredEnv('VITE_APPWRITE_COLLECTION_NOTES'),
    notebooks: requiredEnv('VITE_APPWRITE_COLLECTION_NOTEBOOKS'),
    tags: requiredEnv('VITE_APPWRITE_COLLECTION_TAGS'),
  },
  BUCKET_IDS: {
    images: requiredEnv('VITE_APPWRITE_BUCKET_IMAGES'),
  },
}
