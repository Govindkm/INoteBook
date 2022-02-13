import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import NoteState from "./Context/NotesStates";
import CustomAlert from "./components/Alert";
function App() {
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <CustomAlert message="My Custom Alert" variant="success" />
        <NoteState>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route
                path="*"
                element={
                  <main style={{ padding: "1rem" }}>
                    <h1>404 Error! Sorry this is not available</h1>
                  </main>
                }
              />
            </Routes>
          </div>
        </NoteState>
      </Router>
    </>
  );
}

export default App;
