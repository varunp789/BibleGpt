import React, { useState, useEffect } from "react";
import "./input.css";
import { SendOutlined } from "@ant-design/icons";
import { FaCross, FaUserCircle } from "react-icons/fa";
import { Button, message, Popconfirm, Skeleton } from "antd";
import { v4 as uuidv4 } from "uuid";
import { Input } from "antd";
import { Col, Row } from "antd";
import { BsArrowUpRight } from "react-icons/bs";
import { input, presuggestions } from "../constants/Constant";

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [generatedUuid, setGeneratedUuid] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  /// FOR PROMPT SUGGETIONS
  
  const predefinedSuggestions = [
    `${presuggestions.Question1}`,
    `${presuggestions.Question2}`,
    `${presuggestions.Question3}`,
    `${presuggestions.Question4}`,
  ];
  const generateSuggestions = (input) => {
    const filteredSuggestions = predefinedSuggestions.filter((question) =>
      question.toLowerCase().includes(input.toLowerCase())
    );

    const limitedSuggestions = filteredSuggestions.slice(0, 3);
    setSuggestions(limitedSuggestions);
  };

  /// FOR GENERATE CHAT UUID AND STORE IT
  
  useEffect(() => {
    const storedChatHistory = localStorage.getItem("chatHistory");
    if (storedChatHistory) {
      setChatHistory(JSON.parse(storedChatHistory));
    }
    const storedUuid = localStorage.getItem("generatedUuid");
    if (storedUuid) {
      setGeneratedUuid(storedUuid);
    } else {
      const newUuid = uuidv4();
      setGeneratedUuid(newUuid);
      localStorage.setItem("generatedUuid", newUuid);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  /// FOR SEND USERS PROMPTS TO BACK-END
  
  const fetchData = async () => {
    setIsFetching(true);

    const url = `${process.env.REACT_APP_URL}/${generatedUuid}`;

    const requestData = {
      method: "POST",
      body: JSON.stringify({
        prompt: prompt,
        data: [chatHistory],
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    try {
      const response = await fetch(url, requestData);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      console.log(response);
      const responseData = await response.text();
      console.log(responseData);
      setChatHistory((prevHistory) => [...prevHistory, responseData]);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setErrorMessage(
        `${input.error}`
      );
    }

    setIsFetching(false);
    setPrompt("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchData();
    }
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
        <div className="messages">
          <h2>{`${input.h2}`}</h2>
          <h4>{`${input.h4}`}</h4>

          {chatHistory.map((message, index) => {
            const parts = message.split("\n");
            const firstPart = parts[0];
            const secondPart = parts.slice(1).join("");

            return (
              <div key={index} className="message-container">
                <div className="prompt">
                  <pre className="que">{firstPart}</pre>
                  <FaUserCircle className="user-icon" />
                </div>
                <div className="ab">
                  <div className="response">
                    <pre className="ans">
                      <FaCross /> {secondPart}
                    </pre>
                  </div>
                </div>
              </div>
            );
          })}
          {isFetching && <Skeleton active />}
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </div>
      <Row gutter={16} className="sg-main">
        {suggestions.map((suggestion, index) => (
          <Col key={index} span={8} className="sg">
            <div
              onClick={() => {
                setPrompt(suggestion);
                // Clear suggestions when a suggestion is clicked
                setSuggestions([]);
              }}
              className="suggestion-card">
              {suggestion} <BsArrowUpRight />
            </div>
          </Col>
        ))}
      </Row>
      <div className="input-main">
        <div className="input-container">
          <Input
            type="text"
            className="input-field"
            value={prompt}
            placeholder="Just Ask me what you want..."
            onChange={(e) => {
              setPrompt(e.target.value);
              generateSuggestions(e.target.value);
            }}
            onKeyPress={handleKeyPress}
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
