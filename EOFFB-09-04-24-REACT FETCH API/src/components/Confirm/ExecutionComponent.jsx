import React, { useState, useEffect } from "react";
import axios from "axios";
import ConfirmationDialog from "../Confirm/ConfirmationDialog"; // Import the new ConfirmationDialog component
import FinalConfirmationDialog from "../DialogBox/DialogBox"; // Import the FinalConfirmationDialog component


function ExecutionComponent({ fetchUserId, userData }) {
  const [loading, setLoading] = useState(false);
  const [executionMessage, setExecutionMessage] = useState("");
  const [confirmationData, setConfirmationData] = useState(null);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [showFinalConfirmationDialog, setShowFinalConfirmationDialog] =
    useState(false); // State to control the visibility of FinalConfirmationDialog

  const [userDetails, setUserDetails] = useState(userData);
  useEffect(() => {
    if (userData) {
      setUserDetails(userData);
      console.log("UserData", userData);
    }
  }, [userData]);
  console.log("userDetails", userDetails);

  const [domains, setDomains] = useState({
    "Disable account": true,
    "Move to OU": true,
    "Removed Groups": true,
    "Removed Licences": true,
    "Convert to shared mailbox": true,
    "Set out office": true,
    "Deligate to manager": true,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setDomains({ ...domains, [name]: checked });
  };

  const executeAction = () => {
    const userId = fetchUserId();

    setShowConfirmationDialog(true);
  };

  const confirmOffboarding = () => {
    setLoading(true);

    const userId = fetchUserId();
    console.log("Offboarding user with userId: " + userId);

    const access_token = localStorage.getItem("token");
    fetch(`http://127.0.0.1:8000/offboard/${userId}/confirm`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Access-Control-Allow-Origin": "*",
      },
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
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error offboarding user:", error);
        setExecutionMessage("Error offboarding user");
        // setLoading(false);
      });

    setShowConfirmationDialog(false);
  };

  const fetchConfirmationData = async (userId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/offboard/${userId}/confirmation`
      );
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
    <>
      {loading && <div className="full-page-loading" id="loadingBar"></div>}
      {executionMessage && (
        <div className="message-box">{executionMessage}</div>
      )}
      <div className="aside">
        <h2>
          <i className="fas fa-lock"></i> Tasks
        </h2>
        <div className="checkbox-options-confirm">
          <label>
            <input
              type="checkbox"
              name="Disable account"
              checked={domains["Disable account"]}
              onChange={handleCheckboxChange}
            />
            Disable account
          </label>
          <label>
            <input
              type="checkbox"
              name="Move to OU"
              checked={domains["Move to OU"]}
              onChange={handleCheckboxChange}
            />
            Move to OU
          </label>
          <label>
            <input
              type="checkbox"
              name="Removed Groups"
              checked={domains["Removed Groups"]}
              onChange={handleCheckboxChange}
            />
            Removed Groups
          </label>
          <label>
            <input
              type="checkbox"
              name="Removed Licences"
              checked={domains["Removed Licences"]}
              onChange={handleCheckboxChange}
            />
            Removed Licences
          </label>
          <label>
            <input
              type="checkbox"
              name="Convert to shared mailbox"
              checked={domains["Convert to shared mailbox"]}
              onChange={handleCheckboxChange}
            />
            Convert to shared mailbox
          </label>
          <label>
            <input
              type="checkbox"
              name="Set out office"
              checked={domains["Set out office"]}
              onChange={handleCheckboxChange}
            />
            Set out office
          </label>
          <label>
            <input
              type="checkbox"
              name="Deligate to manager"
              checked={domains["Deligate to manager"]}
              onChange={handleCheckboxChange}
            />
            Deligate to manager
          </label>
        </div>
        <div className="">
          <button id="executeButton" onClick={executeAction} disabled={loading}>
            Confirm
          </button>
        </div>

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
    </>
  );
}

export default ExecutionComponent;
