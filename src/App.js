import React from "react";
import "./App.css";
import Chat from "./components/Chat/Chat";
import Input from "./components/Input/Input";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
// import Footer from "./components/Footer/Footer";
// import { Skeleton } from 'antd';
function App() {
  return (
    <div>
       {/* <Skeleton active /> */}
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Input />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route path="*" element={<div>404 || Content Not Found</div>}></Route>
      </Routes>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
