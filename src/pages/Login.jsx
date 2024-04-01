import { useState } from "react";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router";




function Login() {
    const user = useUser();
    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <section className="flex min-h-screen items-center text-white justify-center">
            <div className="h-[50vh] bg-[#232323] p-4 flex flex-col items-center justify-evenly">
                <h1 className="text-xl">Login or Register</h1>
                <form className="flex flex-col gap-4 mt-4">
                    <input
                        className="text-black"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />
                    <input
                        className="text-black"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                    <div className="flex justify-evenly">
                        <button
                            className="bg-white text-black px-2 rounded-md"
                            type="button"
                            onClick={() => {
                                user.signIn(email, password)
                                navigate("/")
                            }}
                        >
                            Login
                        </button>
                        <button
                            className="bg-white text-black px-2 rounded-md"
                            type="button"
                            onClick={() => {
                                user.signUp(email, password)
                                navigate("/")
                            }}
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Login