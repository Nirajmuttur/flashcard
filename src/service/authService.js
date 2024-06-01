import { account } from '../appwrite/config';
import {ID} from 'appwrite'

export const getCurrentUser = async () => {
    try {
        const user = await account.get();
        return user;
    } catch (error) {
        throw error;
    }
};

export const createAccount = async (email, password, name) => {
    try {
        const response = await account.create(ID.unique(), email, password, name);
        await account.createEmailPasswordSession(email,password)
        const verification = await sendVerification();
        return response;
    } catch (error) {
        throw error;
    }
};

export const login = async (email, password) => {
    try {
        const response = await account.createEmailPasswordSession(email, password);
        return response;
    } catch (error) {
        console.log(error)
        throw error;
    }
};

export const logout = async () => {
    try {
        await account.deleteSession('current');
    } catch (error) {
        throw error;
    }
};

export const sendVerification = async () => {
    try {
        const response = await account.createVerification("http://localhost:3000/verify");
        return response;
    } catch (error) {
        throw error;
    }
};


export const checkEmailVerification = async () => {
    try {
        const user = await account.get();
        return user.emailVerification;
    } catch (error) {
        throw error;
    }
};
