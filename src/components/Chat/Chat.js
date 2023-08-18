import React, { useEffect, useState } from "react";
import "./chat.css";

const Chat = () => {
  const [apiData, setApiData] = useState([]);
  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getIdFromLocalStorage = localStorage.getItem("generatedUuid");
    if (getIdFromLocalStorage) {
      setId(getIdFromLocalStorage);
      fetchApiData(getIdFromLocalStorage); // Call fetchApiData with the ID
    } else {
      console.log("Id not in localStorage");
      alert("Could not find id");
    }
  }, []);
  // const GetId = localStorage.getItem("generatedUuid");
  console.log(id);
  const fetchApiData = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/${id}`);
      console.log(response);
      const responseData = await response.json();
      console.log(responseData);

      if (Array.isArray(responseData.dataEntries)) {
        setApiData(responseData.dataEntries);
      } else {
        console.error("Invalid API response format");
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching API data:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="chat-main">
          <table>
            <thead>
              <tr>
                <th>Prompt</th>
                <th>Prompt Time</th>
                <th>Response</th>
              </tr>
            </thead>
            <tbody>
              {apiData.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.prompt}</td>
                  <td>{new Date(entry.prompt_time).toLocaleString()}</td>
                  <td>{entry.response}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Chat;
