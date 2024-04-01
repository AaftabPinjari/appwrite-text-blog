import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import { UserProvider } from "./context/userContext"
import Home from "./pages/Home";
import Login from "./pages/Login";
import { TweetsProvider } from "./context/tweetsContext";

const App = () => {
  // const isLoginPage = window.location.pathname === "/login";

  return (
    <UserProvider>
      <TweetsProvider>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/login"} element={<Login />} />
        </Routes>
      </TweetsProvider>
    </UserProvider>
  )
}

export default App