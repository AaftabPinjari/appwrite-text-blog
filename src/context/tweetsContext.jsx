/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { databaseService } from "../appwrite/db";

const tweetsContext = createContext()

export const useTweets = () => {
    return useContext(tweetsContext)
}

export const TweetsProvider = ({ children }) => {

    const [tweets, setTweets] = useState([]);

    async function addTweet(tweet) {
        try {
            const data = await databaseService.create(tweet);
            console.log(data)
            setTweets((tweets) => [data.$id, ...tweets].slice(0, 10))

        } catch (error) {
            console.log("error while creating tweet", error)
        }
    }

    async function deleteTweet(id) {
        await databaseService.remove(id)
        setTweets((tweets) => tweets.filter((tweet) => tweet.$id !== id))
        await databaseService.list()
    }

    async function listTweets() {
        const data = await databaseService.list();
        console.log(data)
        setTweets(data.documents)
    }

    useEffect(() => {
        listTweets()
    }, [tweets])


    return (
        <tweetsContext.Provider value={{ current: tweets, addTweet, deleteTweet }}>
            {children}
        </tweetsContext.Provider>
    )
}
