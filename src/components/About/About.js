import React, { useState, useEffect } from 'react';

const Chat = () => {
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchApiData();
  }, []);

  const fetchApiData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}` //23cf5bfb-6caa-4434-8f98-4d4d9a72d24f
      );
      const responseData = await response.json();

      if (Array.isArray(responseData)) {
        console.log(responseData)
        setApiData(responseData);
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
          {apiData.map((entry) => (
            <div key={entry.u_id}>
              <h5>User : {entry.u_id}</h5>
              <table>
                <thead>
                  <tr>
                    <th>Prompt</th>
                    <th>prompt-time</th>
                    <th>Response</th>
                    <th>response-time</th>
                  </tr>
                </thead>
                <tbody>
                  {entry.dataEntries.map((dataEntry) => (
                    <tr key={dataEntry.id}>
                      <td>{dataEntry.prompt}</td>
                      <td>{new Date(dataEntry.prompt_time).toLocaleString()}</td>
                      <td>{dataEntry.response}</td>
                      <td>{new Date(dataEntry.response_time).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Chat;
