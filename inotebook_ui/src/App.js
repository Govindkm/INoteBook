import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import CustomAlert from "./components/Alert";
import NoteStates from "./Context/NotesStates";
import Login from "./components/user/Login";
import Signup from "./components/user/Signup";

function App() {
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <CustomAlert message="My Custom Alert" variant="success" />
        <div className="container">
          <Routes>
            <Route
              exact
              path="/"
              element={
                /* Providing Note Context only to the Home Component and its children */
                <NoteStates>
                  <Home />
                </NoteStates>
              }
            />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login></Login>}></Route>
            <Route exact path="/signup" element={<Signup></Signup>}></Route>
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
      </Router>
    </>
  );
}

export default App;
