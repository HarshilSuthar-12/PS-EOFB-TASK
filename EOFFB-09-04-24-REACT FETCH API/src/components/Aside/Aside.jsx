import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "../css/Globals.css";
import {Dialog,DialogTitle,DialogContent,DialogActions,Button,CircularProgress,} from "@mui/material";

function Aside({ onIdSubmit }) {
  const [inputValue, setInputValue] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [placeholderText, setPlaceholderText] = useState("Enter ID");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  // const [showUserNotFoundError, setShowUserNotFoundError] = useState(false);
  const [domains, setDomains] = useState({
    "QC.Local": true,
    "3Eco.com": true,
    "3ecorp.com": true,
    "Dev.Local": true,
  });

  const handleInputChange = (event) => {
    const value = event.target.value.trim().toLowerCase(); // Convert input to lowercase
    setInputValue(value);
    validateID(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    validateID(inputValue.trim());

    if (!validationMessage) {
      setLoading(true);
      try {
        const response = await onIdSubmit(inputValue, (res) => {
          console.log("onIdSubmit Value: -", res);
          setLoading(false);
          setInputValue("");
          setPlaceholderText("Enter Email ID");
        });
      } catch (error) {
        // if (response.status === 500) {
        //   setError("User Not Found");
        //   setShowUserNotFoundError(true);
        //   setLoading(false);
        // }
        // setError(error.message || "Error submitting data");
        setError("User Not Found");
        setLoading(false);
        setErrorMessageVisible(true);
      }
    }
  };

  // const handleCloseUserNotFoundError = () => {
  //   setShowUserNotFoundError(false);
  // };
  const validateID = (id) => {
    if (id.trim() === "") {
      setValidationMessage("Please enter an ID");
    } else {
      setValidationMessage("");
      const atIndex = id.indexOf("@");
      if (atIndex === -1 || atIndex === 0) {
        setValidationMessage("Invalid email format");
      } else {
        const domain = id.slice(atIndex + 1);
        if (!domain.endsWith("productsquads.co")) {
          setValidationMessage(
            "Invalid domain postfix. Must be 'productsquads.co'"
          );
        }
      }
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setDomains({ ...domains, [name]: checked });
  };

  // Disable submit button if validationMessage is not empty or inputValue is empty
  const isSubmitDisabled = validationMessage !== "" || inputValue.trim() === "";

  return (
    <>
      {loading && (
        <div className="full-page-loading">
          <FontAwesomeIcon icon={faSpinner} spin />
        </div>
      )}
      <aside className="aside">
        <h2>
          <i class="fa-solid fa-envelope"></i> Email ID
        </h2>
        <form id="id-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <i className="fas fa-search"></i>
            <input
              type="text"
              id="idInput"
              placeholder={placeholderText}
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
          {validationMessage && (
            <div className="error-message">{validationMessage}</div>
          )}
          {/* Checkbox options for domains */}
          <div className="checkbox-options">
            <label>
              <input
                type="checkbox"
                name="QC.Local"
                checked={domains["QC.Local"]}
                onChange={handleCheckboxChange}
              />
              QC.Local
            </label>
            <label>
              <input
                type="checkbox"
                name="3Eco.com"
                checked={domains["3Eco.com"]}
                onChange={handleCheckboxChange}
              />
              3Eco.com
            </label>
            <label>
              <input
                type="checkbox"
                name="3ecorp.com"
                checked={domains["3ecorp.com"]}
                onChange={handleCheckboxChange}
              />
              3ecorp.com
            </label>
            <label>
              <input
                type="checkbox"
                name="Dev.Local"
                checked={domains["Dev.Local"]}
                onChange={handleCheckboxChange}
              />
              Dev.Local
            </label>
          </div>
          {/* <button type="submit" disabled={isSubmitDisabled || loading}>
            {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Submit"}
          </button> */}
          <button
            type="submit"
            className={isSubmitDisabled ? "disabled-button" : ""}
            disabled={isSubmitDisabled || loading}
          >
            {/* {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Submit"} */}
            Submit
          </button>
        </form>
        {errorMessageVisible && error && (
          <div className="error-message">{error}</div>
        )}  
      </aside>
    </>
  );
}

export default Aside;


