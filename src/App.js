import React from "react";
import "./App.css";
import Chat from "./components/Chat/Chat";
import Input from "./components/Input/Input";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import AdminChat from "./components/Admin/AdminChat";
import Notfound from "./components/404/Notfound";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import PrivateRoutes from "./components/Utils/PrivateRoutes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar />

      <Routes>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/check" element={<Navigate replace to="/login" />}></Route>
        <Route path="/" element={<Input />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/admin" element={<AdminChat />}></Route>
          <Route path="/About" element={<About />}></Route>
        </Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="*" element={<Notfound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
