import "bulma/css/bulma.min.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import NoteProvider from "./context/notes/NoteProvider";

function App() {
  return (
    <>
      <NoteProvider>
        <Navbar />
        <div
          className="container is-max-desktop px-3"
          style={{ marginTop: "70px" }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </NoteProvider>
    </>
  );
}

export default App;
