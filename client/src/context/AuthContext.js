import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const AuthContext = createContext();
export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user") || null)
    );

    const login = async (inputs) => {
        const res = await axios.post("http://localhost:8500/api/auth/login", inputs, {withCredentials: true});

        setCurrentUser(res.data);
    }

    const logout = () => {
        setCurrentUser(null);
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    });

    return (
        <AuthContext.Provider value={{currentUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
};