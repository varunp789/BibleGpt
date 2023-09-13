import React, { useEffect, useState } from "react";
import "./chat.css";
import { Historytable} from "../constants/Constant";

const Chat = () => {
  const [apiData, setApiData] = useState([]);
  // eslint-disable-next-line no-unused-vars
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
  // console.log("UserId:",id);

  /// USERS CHAT HISTORY

  const fetchApiData = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/${id}`);
      const responseData = await response.json();

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
                <th>{`${Historytable.col1}`}</th>
                <th>{`${Historytable.col2}`}</th>
              </tr>
            </thead>
            <tbody>
              {apiData.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.prompt}</td>
                  {/* <td>{new Date(entry.prompt_time).toLocaleString()}</td> */}
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