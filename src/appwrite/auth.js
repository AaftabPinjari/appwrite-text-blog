import { Client, Account, ID } from "appwrite";

export class AutService {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(String(import.meta.env.VITE_APPWRITE_ENDPOINT))
            .setProject(String(import.meta.env.VITE_APPWRITE_PROJECT_ID))

        this.account = new Account(this.client)
    }

    async register(email, password) {
        try {
            const user = await this.account.create(ID.unique(), email, password)
            if (user) {
                this.login(email, password)
            } else {
                return user
            }
        } catch (error) {
            console.log("Error While SignUp: ", error)
        }
    }

    async login(email, password) {
        try {
            const loggedIn = await this.account.createEmailSession(email, password)
            if (loggedIn) {
                return true
            } else {
                console.log("error in try block of login")
            }

        } catch (error) {
            console.log("Error While login: ", error)
            return false
        }
    }

    async getUser() {
        try {
            const userData = await this.account.get();
            // console.log(userData)
            if (userData) {
                return userData
            } else {
                console.log("error in try block of getUser")
            }
        } catch (error) {
            console.log("Error While getting user: ", error)
            return false
        }
    }

    async logout() {
        try {
            await this.account.deleteSession("current")
        } catch (error) {
            console.log("Error While logout: ", error)
        }
    }




}

export const authService = new AutService()

