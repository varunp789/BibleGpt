import React from "react";
import "./App.css";
import Chat from "./components/Chat/Chat";
import Input from "./components/Input/Input";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import AdminChat from "./components/Admin/AdminChat";
import Notfound from "./components/404/Notfound";
function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Input />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route path="/admin" element={<AdminChat />}></Route>
        <Route path="*" element={<Notfound/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
