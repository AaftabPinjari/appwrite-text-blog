import { Client, Databases, ID, Query } from "appwrite";

class DatabaseService {
    client = new Client()
    database;

    constructor() {
        this.client.setEndpoint(String(import.meta.env.VITE_APPWRITE_ENDPOINT))
            .setProject(String(import.meta.env.VITE_APPWRITE_PROJECT_ID))

        this.database = new Databases(this.client)
    }

    async create(doc) {
        try {
            const response = await this.database.createDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                ID.unique(),
                doc
            )
            return response;
        } catch (error) {
            console.log("error while creating document", error)
        }
    }

    async remove(id) {
        try {

            await this.database.deleteDocument(import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                id);
            await this.list(); // Refetch ideas to ensure we have 10 items
        } catch (error) {
            console.log("error while deleting document", error)
        }
    }

    async list() {
        try {

            const response = await this.database.listDocuments(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                [Query.orderDesc("$createdAt"), Query.limit(10)]
            );
            return response;
        } catch (error) {
            console.log("error while listing document", error)
        }
    }
}

export const databaseService = new DatabaseService()
