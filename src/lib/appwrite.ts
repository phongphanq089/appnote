import { Client, TablesDB, Account } from 'appwrite'

const client = new Client()
client
  .setEndpoint('https://sgp.cloud.appwrite.io/v1')
  .setProject('6906eafc002b9600435a')

export const account = new Account(client)
export const tablesDB = new TablesDB(client)
