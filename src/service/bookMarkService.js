import { databases } from '../appwrite/config';
import {ID, Query} from 'appwrite'

const databaseId= process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID
const collectionId= process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID
export const fetchBookmarks = async (userId) => {
    try {
        
        const { documents } = await databases.listDocuments(databaseId, collectionId, [
            Query.equal('userid',userId)
        ]);

        return documents;
    } catch (error) {
        throw error;
    }
};

export const addBookmark = async (details) => {
    try {
        const document = await databases.createDocument(databaseId, collectionId, ID.unique(),details);
        return document;
    } catch (error) {
        console.log(error)
        throw error;
    }
};

export const removeBookmark = async (bookmarkId) => {
    try {
        await databases.deleteDocument(databaseId, collectionId, bookmarkId);
        return true; 
    } catch (error) {
        throw error;
    }
};