/* eslint-disable react/prop-types */
import { useContext, createContext, useState, useEffect } from "react";
import { authService } from "../appwrite/auth";
// import { useParams } from "react-router";

const userContext = createContext()

export function useUser() {
    return useContext(userContext)
}

export const UserProvider = ({ children }) => {
    // const { id } = useParams()

    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)


    async function signIn(email, password) {
        try {
            const loggedIn = await authService.login(email, password)
            setUser(loggedIn)

        } catch (error) {
            console.log("error in userContext SignIn", error)
            setError(error)
        }
    }
    async function signOut() {
        await authService.logout("current");
        setUser(null);
    }

    async function signUp(email, password) {
        await authService.register(email, password);
        await authService.login(email, password);
    }
    async function getCurrentUser() {
        try {
            const userData = await authService.getUser();
            // console.log(loggedIn)
            setUser(userData);
        } catch (err) {
            setUser(null);
            setError(err)
        }
    }

    useEffect(() => {
        getCurrentUser()
    }, [user])


    return (
        <userContext.Provider value={{ current: user, error, signIn, signOut, signUp }}>
            {children}
        </userContext.Provider>
    )

}