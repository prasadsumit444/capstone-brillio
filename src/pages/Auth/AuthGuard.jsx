import React, { createContext, useContext } from 'react'
import { useState } from 'react'

const AuthContext = createContext(null)

export const AuthGuard = ({ children }) => {

    const [userId, setUser] = useState(null)

    const signup = (userId) => {
        setUser(userId)
    }

    const login = (userId) => {
        setUser(userId)
    }

    const logout = () => {
        setUser(null)
    }

    return (
        <div>
            <AuthContext.Provider value={{ userId, login, logout, signup }} >
                {children}
            </AuthContext.Provider>
        </div>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}


