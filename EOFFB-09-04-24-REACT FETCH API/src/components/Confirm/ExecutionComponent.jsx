import React, { useState } from 'react';

function ExecutionComponent({ fetchUserId }) {
  const [loading, setLoading] = useState(false);
  const [executionMessage, setExecutionMessage] = useState("");

  const executeAction = () => {
    setLoading(true); // Activate loading state before the fetch request

    const userId = fetchUserId();
    console.log("Offboarding user with userId: " + userId);
    
    const access_token = localStorage.getItem("token");
    // Perform the offboarding action here
    fetch(`http://127.0.0.1:8000/offboard/${userId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        "Access-Control-Allow-Origin": "*", // This header is typically set by the server, not by the client
        // Add any other headers you need here
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      setExecutionMessage("User offboarded successfully");
    })
    .catch((error) => {
      console.error("Error offboarding user:", error);
      setExecutionMessage("Error offboarding user");
    })
    .finally(() => {
      setLoading(false); // Deactivate loading state after the fetch request
    });
  };

  return (
    <div>
      <div className="execute-btn">
        <button id="executeButton" onClick={executeAction} disabled={loading}>
          Confirm
        </button>
      </div>
      {loading && <div className="loading-bar" id="loadingBar"></div>}
      {executionMessage && <div className="message-box">{executionMessage}</div>}
    </div>
  );
}

export default ExecutionComponent;
