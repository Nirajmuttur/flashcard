import { Client, Account, Databases } from 'appwrite';

const client = new Client();
client
.setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
.setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID)

const databases = new Databases(client);
const account = new Account(client);

export { client, account, databases };
