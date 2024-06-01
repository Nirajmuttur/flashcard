import { Client, Account } from 'appwrite';

const client = new Client();
client
.setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
.setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID)

const account = new Account(client);

export { client, account };
