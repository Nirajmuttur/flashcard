import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, login, createAccount, logout, checkEmailVerification } from '../service/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [emailVerified, setEmailVerified] = useState(false)

    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkUserSession();
    }, []);

    const handleLogin = async (email, password) => {
        setLoading(true);
        try {
            await login(email, password);
            handleVerification()
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleCreateAccount = async (email, password, name) => {
        setLoading(true);
        try {
            await createAccount(email, password, name);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleVerification =async()=>{
        setLoading(true);
        try {
            const emailVerification = await checkEmailVerification()
            if(emailVerification){
                const currentUser = await getCurrentUser();
                setUser(currentUser);
                setEmailVerified(true)
            }
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }


    return (
        <AuthContext.Provider value={{ user, loading, handleCreateAccount,handleLogin,handleLogout,emailVerified}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
