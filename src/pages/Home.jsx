import { useState } from "react";

import { useUser } from "../context/userContext";
import { useTweets } from "../context/tweetsContext";

export default function Home() {
    const user = useUser();
    const tweets = useTweets();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
        <>
            {/* Show the submit form to logged in users. */}
            {user.current ? (
                <section className="mt-3 flex flex-col gap-2 w-full items-center">
                    <h2>Submit Tweet</h2>
                    <form className="flex flex-col gap-2 w-1/2 justify-evenly">
                        <input
                            className="text-black"
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(event) => {
                                setTitle(event.target.value);
                            }}
                        />
                        <textarea
                            className="text-black"
                            placeholder="Description"
                            value={description}
                            onChange={(event) => {
                                setDescription(event.target.value);
                            }}
                        />
                        <button
                            type="button"
                            onClick={() =>
                                tweets.addTweet({ userId: user.current.$id, title, description })
                            }
                        >
                            Submit
                        </button>
                    </form>
                </section>
            ) : (
                <section className="flex flex-col justify-center mt-2 w-full items-center">
                    <p>Please login to submit a Tweet.</p>
                </section>
            )}
            <section className="flex flex-col gap-5 mt-2 w-full items-center">
                <h2>Latest Tweets</h2>
                <ul className="grid grid-cols-3 w-1/2 gap-2 ">
                    {tweets.current && tweets.current.length > 0 ? tweets.current.map((tweet) => (
                        <li
                            className="bg-black rounded-lg flex flex-col items-center"
                            key={tweet.$id}>
                            <strong>{tweet.title}</strong>
                            <p>{tweet.description}</p>
                            {/* Show the remove button to tweet owner. */}
                            {user.current && user.current.$id === tweet.userId && (
                                <button type="button" onClick={() => tweets.deleteTweet(tweet.$id)}>
                                    Remove
                                </button>
                            )}
                        </li>
                    )) : <h1>No tweets</h1>}
                </ul>
            </section>
        </>
    );
}
