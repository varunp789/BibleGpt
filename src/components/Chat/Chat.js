import React, { useEffect, useState } from "react";
import "./chat.css";

const Chat = () => {
  const [apiData, setApiData] = useState([]);
  const [id, SetId] = useState("");

  const [isLoading, setIsLoading] = useState(true);
   
  useEffect(() => {
    fetchApiData();
    const GetId = localStorage.getItem("generatedUuid");
    if (GetId) {
      SetId(GetId);
    } else {
      console.log("Id not in localStorage");
      alert("Could not find id");
    }
  }, []);
  const fetchApiData = async () => {
    try {
      const response = await fetch(`http://192.168.1.188:3000/${id}`);
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
