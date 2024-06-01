// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, login, createAccount, logout } from '../service/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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
        try {
            const response = await login(email, password);
            setUser(response);
        } catch (error) {
            throw error;
        }
    };

    const handleCreateAccount = async (email, password, name) => {
        try {
            const response = await createAccount(email, password, name);
            setUser(response);
        } catch (error) {
            throw error;
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            setUser(null);
        } catch (error) {
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, handleLogin, handleCreateAccount, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
