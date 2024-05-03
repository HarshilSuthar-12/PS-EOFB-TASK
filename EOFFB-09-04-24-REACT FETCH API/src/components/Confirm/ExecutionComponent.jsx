// import React, { useState } from 'react';
// import FinalConfirmationDialog from '../DialogBox/DialogBox'; // Import the FinalConfirmationDialog component
// import axios from 'axios';

// function ExecutionComponent({ fetchUserId }) {
//   const [loading, setLoading] = useState(false);
//   const [executionMessage, setExecutionMessage] = useState("");
//   const [confirmationData, setConfirmationData] = useState(null); // State to store confirmation data
//   const [showConfirmationDialog, setShowConfirmationDialog] = useState(false); // State to control visibility of the confirmation dialog

//   const executeAction = () => {
//     setLoading(true); // Activate loading state before the fetch request

//     const userId = fetchUserId();
//     console.log("Offboarding user with userId: " + userId);
    
//     const access_token = localStorage.getItem("token");
//     // Perform the offboarding action here
//     fetch(`http://127.0.0.1:8000/offboard/${userId}/confirm`, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${access_token}`,
//         "Access-Control-Allow-Origin": "*", // This header is typically set by the server, not by the client
//         // Add any other headers you need here
//       }
//     })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       setExecutionMessage("User offboarded successfully");
//       setShowConfirmationDialog(true); // Show the confirmation dialog after successful offboarding
      
//       // Fetch confirmation data after successful offboarding
//       fetchConfirmationData(userId);
//     })
//     .catch((error) => {
//       console.error("Error offboarding user:", error);
//       setExecutionMessage("Error offboarding user");
//       setLoading(false); // Deactivate loading state after the fetch request
//     });
//   };

//   const fetchConfirmationData = async (userId) => {
//     try {
//       const response = await axios.get(`http://127.0.0.1:8000/offboard/${userId}/confirmation`);
//       setConfirmationData(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error fetching confirmation data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCloseConfirmationDialog = () => {
//     setShowConfirmationDialog(false);
//   };

//   return (
//     <div>
//       <div className="execute-btn">
//         <button id="executeButton" onClick={executeAction} disabled={loading}>
//           Confirm
//         </button>
//       </div>
//       {loading && <div className="loading-bar" id="loadingBar"></div>}
//       {executionMessage && <div className="message-box">{executionMessage}</div>}
      
//       {/* Render FinalConfirmationDialog component when showConfirmationDialog is true */}
//       <FinalConfirmationDialog open={showConfirmationDialog} onClose={handleCloseConfirmationDialog} confirmationData={confirmationData} />
//     </div>
//   );
// }

// export default ExecutionComponent;






// import React, { useState } from 'react';
// import axios from 'axios';
// import ConfirmationDialog from '../Confirm/ConfirmationDialog'; // Import the new ConfirmationDialog component

// function ExecutionComponent({ fetchUserId }) {
//   const [loading, setLoading] = useState(false);
//   const [executionMessage, setExecutionMessage] = useState("");
//   const [confirmationData, setConfirmationData] = useState(null);
//   const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

//   const executeAction = () => {
//     setShowConfirmationDialog(true);
//   };

//   const confirmOffboarding = () => {
//     setLoading(true);

//     const userId = fetchUserId();
//     console.log("Offboarding user with userId: " + userId);
    
//     const access_token = localStorage.getItem("token");
//     fetch(`http://127.0.0.1:8000/offboard/${userId}/confirm`, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${access_token}`,
//         "Access-Control-Allow-Origin": "*",
//       }
//     })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       setExecutionMessage("User offboarded successfully");
//       fetchConfirmationData(userId);
//     })
//     .catch((error) => {
//       console.error("Error offboarding user:", error);
//       setExecutionMessage("Error offboarding user");
//       setLoading(false);
//     });

//     setShowConfirmationDialog(false);
//   };

//   const fetchConfirmationData = async (userId) => {
//     try {
//       const response = await axios.get(`http://127.0.0.1:8000/offboard/${userId}/confirmation`);
//       setConfirmationData(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error fetching confirmation data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCloseConfirmationDialog = () => {
//     setShowConfirmationDialog(false);
//     setExecutionMessage("Offboarding process cancelled");
//   };

//   return (
//     <div>
//       <div className="execute-btn">
//         <button id="executeButton" onClick={executeAction} disabled={loading}>
//           Confirm
//         </button>
//       </div>
//       {loading && <div className="loading-bar" id="loadingBar"></div>}
//       {executionMessage && <div className="message-box">{executionMessage}</div>}
      
//       {/* Render ConfirmationDialog component when showConfirmationDialog is true */}
//       <ConfirmationDialog
//         open={showConfirmationDialog}
//         onClose={handleCloseConfirmationDialog}
//         onConfirm={confirmOffboarding}
//         confirmationData={confirmationData}
//       />
//     </div>
//   );
// }

// export default ExecutionComponent;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useState, useEffect } from 'react';
import ConfirmationDialog from '../Confirm/ConfirmationDialog'; // Import the new ConfirmationDialog component
import FinalConfirmationDialog from '../DialogBox/DialogBox'; // Import the FinalConfirmationDialog component

function ExecutionComponent({ fetchUserId, userData }) {
  const [loading, setLoading] = useState(false);
  const [executionMessage, setExecutionMessage] = useState("");
  const [confirmationData, setConfirmationData] = useState(null);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [showFinalConfirmationDialog, setShowFinalConfirmationDialog] = useState(false); // State to control the visibility of FinalConfirmationDialog


  const [userDetails, setUserDetails] = useState(userData);

  useEffect(() => {
    if (userData) {
      setUserDetails(userData);
      console.log("UserData", userData);
    }
  }, [userData]);
  console.log("userDetails", userDetails);




  const executeAction = () => {
    setShowConfirmationDialog(true);
  };

  const confirmOffboarding = () => {
    setLoading(true);

    const userId = fetchUserId();
    console.log("Offboarding user with userId: " + userId);
    
    const access_token = localStorage.getItem("token");
    fetch(`http://127.0.0.1:8000/offboard/${userId}/confirm`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        "Access-Control-Allow-Origin": "*",
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
      fetchConfirmationData(userId);
      setShowFinalConfirmationDialog(true); // Set showFinalConfirmationDialog to true after successful offboarding
    })
    .catch((error) => {
      console.error("Error offboarding user:", error);
      setExecutionMessage("Error offboarding user");
      setLoading(false);
    });

    setShowConfirmationDialog(false);
  };

  const fetchConfirmationData = async (userId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/offboard/${userId}/confirmation`);
      setConfirmationData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching confirmation data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseConfirmationDialog = () => {
    setShowConfirmationDialog(false);
    setExecutionMessage("Offboarding process cancelled");
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
      
      {/* Render ConfirmationDialog component when showConfirmationDialog is true */}
      <ConfirmationDialog
        open={showConfirmationDialog}
        onClose={handleCloseConfirmationDialog}
        onConfirm={confirmOffboarding}
        confirmationData={confirmationData}
        userData={userData}
      />

      {/* Render FinalConfirmationDialog component when showFinalConfirmationDialog is true */}
      {showFinalConfirmationDialog && (
        <FinalConfirmationDialog
          open={showFinalConfirmationDialog}
          onClose={() => setShowFinalConfirmationDialog(false)}
          confirmationData={confirmationData}
          loading={loading}
        />
      )}
    </div>
  );
}

export default ExecutionComponent;




