import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/Notestate";
import Login from "./components/Login";
import Createuser from "./components/Createuser";
import { useState } from "react";
import Alert from "./components/Alert";

function App() {
    const [alert, newalert] = useState(null);
const setAlert = (message, type) => {
    newalert({
      msg: message,
      typ: type,
    });
    setTimeout(() => {
      newalert(null);
    }, 1500);
  };
  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
<Alert alert={alert} />
<div className="container">
        <Routes>
          <Route exact path="/" element={<Home setAlert={setAlert}/>} />
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/login" element={<Login setAlert={setAlert}/>} />
          <Route exact path="/createuser" element={<Createuser setAlert={setAlert}/>} />

        </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
