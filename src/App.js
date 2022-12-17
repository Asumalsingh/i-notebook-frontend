import "bulma/css/bulma.min.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import NoteProvider from "./context/notes/NoteProvider";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserProvider from "./context/user/UserProvider";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <UserProvider>
        <NoteProvider>
          <Navbar />
          <div
            className="container is-max-desktop px-3"
            style={{ marginTop: "70px" }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />      
              <Route path="/profile" element={<Profile />} />      
            </Routes>
          </div>
        </NoteProvider>
      </UserProvider>
    </>
  );
}

export default App;
