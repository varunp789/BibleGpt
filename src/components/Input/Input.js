import React, { useState, useEffect } from "react";
import "./input.css";
import { SendOutlined } from "@ant-design/icons";
import { FaCross, FaUserCircle } from "react-icons/fa";
import { Button, message, Popconfirm } from "antd";
// import { Skeleton } from "antd";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [generatedUuid, setGeneratedUuid] = useState('');

  useEffect(() => {
    const storedChatHistory = localStorage.getItem("chatHistory");
    if (storedChatHistory) {
      setChatHistory(JSON.parse(storedChatHistory));
    }
    const storedUuid = localStorage.getItem('generatedUuid');
    if (storedUuid) {
      setGeneratedUuid(storedUuid);
    } else {
      const newUuid = uuidv4();
      setGeneratedUuid(newUuid);
      localStorage.setItem('generatedUuid', newUuid); // Store the UUID in local storage
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  const fetchData = async () => {
    setIsFetching(true);

    const url = `${process.env.REACT_APP_URL}/${generatedUuid}`;
    const requestData = {
      method: "POST",
      body: JSON.stringify({
        prompt: prompt,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    try {
      const response = await fetch(url, requestData);
      console.log(response)
      const responseData = await response.text();
      console.log(responseData)
      setChatHistory((prevHistory) => [...prevHistory, responseData]);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }

    setIsFetching(false);
    setPrompt("");
  };
  const confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
    localStorage.removeItem("chatHistory");
    window.location.reload(true);
  };

  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="chat-container">
        <div>
          <h2>JustAskHim</h2>
          <h4>How can i help you via message...</h4>
          {chatHistory.map((message, index) => {
            const parts = message.split("\n");
            return (
              <div key={index} className="message-container">
                <div className="prompt">
                  <pre className="que">{parts[0]}</pre>
                  <FaUserCircle className="user-icon" />
                </div>
                <div className="ab">
                  <div className="response">
                    <pre className="ans">
                      <FaCross /> {parts[1]}
                    </pre>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* {isFetching && <Skeleton active />} */}
        <div className="input-container">
          <input
            type="text"
            className="input-field"
            value={prompt}
            placeholder="Just Ask me what you want..."
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            className="chat-button"
            onClick={fetchData}
            disabled={isFetching}
            onSubmit={handleSubmit}>
            Ask him <SendOutlined />
          </button>
        </div>
      </div>

      <div className="del-btn">
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No">
          <Button danger className="button">
            <svg viewBox="0 0 448 512" className="svgIcon">
              <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
            </svg>
          </Button>
        </Popconfirm>
      </div>
    </>
  );
}
export default App;
