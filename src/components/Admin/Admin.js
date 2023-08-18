import React, { useState } from "react";
import './admin.css';

const Admin = () => {
  const [Adding, setAdding] = useState(false);
  const [AddPrompt, setAddPtompt] = useState("");

  const addData = async () => {
    setAdding(true);
    const API = `${process.env.REACT_APP_URL}/admin/add`;
    const reqData = {
      method: "POST",
      body: JSON.stringify({
        answer: AddPrompt,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };
    try {
      const response = await fetch(API, reqData);
      const responseAdminData = await response.text();
      console.log(responseAdminData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
    setAdding(false);
    setAddPtompt("");
  };
  const handleprompt = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <div className="admin">
        <input
          type="text"
          value={AddPrompt}
          placeholder="Add youur prompt"
          onChange={(e) => setAddPtompt(e.target.value)}
        />
        <button onClick={addData} disabled={Adding} onSubmit={handleprompt} >Add Prompt</button>
      </div>
    </div>
  );
};

export default Admin;
