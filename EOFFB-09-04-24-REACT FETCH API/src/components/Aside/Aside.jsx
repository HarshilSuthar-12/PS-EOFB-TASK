// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSpinner } from "@fortawesome/free-solid-svg-icons";
// import "../css/Globals.css";

// function Aside({ onIdSubmit }) {
//   const [inputValue, setInputValue] = useState("");
//   const [validationMessage, setValidationMessage] = useState("");
//   const [placeholderText, setPlaceholderText] = useState("Enter INumber");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [errorMessageVisible, setErrorMessageVisible] = useState(false);

//   const handleInputChange = (event) => {
//     const value = event.target.value.trim();
//     setInputValue(value);
//     validateID(value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     validateID(inputValue.trim());

//     if (!validationMessage) {
//       setLoading(true);
//       try {
//      const response =   onIdSubmit(inputValue,(res) => {
//       console.log("onIdSubmit Value: -", res);
//       setLoading(false);
//       setInputValue("");
//       setPlaceholderText("Enter Email ID");
//      });
      
//       } catch (error) {
//         setError(error.message || "Error submitting data");
//         setLoading(false);
//         setErrorMessageVisible(true);
//       }
//     }
//   };

//   const validateID = (id) => {
//     if (id.trim() === "") {
//       setValidationMessage("Please enter an ID");
//     } else {
//       setValidationMessage("");
//       const atIndex = id.indexOf("@");
//       if (atIndex === -1 || atIndex === 0) {
//         setValidationMessage("Invalid email format");
//       } else {
//         const domain = id.slice(atIndex + 1);
//         if (!domain.endsWith("productsquads.co")) {
//           setValidationMessage("Invalid domain postfix. Must be 'productsquads.co'");
//         }
//       }
//     }
//   };

//   const isSubmitDisabled = validationMessage !== "";

//   return (
//     <>
//       {loading && <div className="loading-bar" id="loadingBar"></div>}
//       <aside className="aside">
//         <h3>
//           <i className="fas fa-user"></i> INumber
//         </h3>
//         <form id="id-form" onSubmit={handleSubmit}>
//           <div className="input-wrapper">
//             <i className="fas fa-search"></i>
//             <input
//               type="text"
//               id="idInput"
//               placeholder={placeholderText}
//               value={inputValue}
//               onChange={handleInputChange}
//             />
//           </div>
//           {validationMessage && (
//             <div className="error-message">{validationMessage}</div>
//           )}
//           <button type="submit" disabled={isSubmitDisabled || loading}>
//             {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Submit"}
//           </button>
//         </form>
//         {errorMessageVisible && error && (
//           <div className="error-message">{error}</div>
//         )}
//       </aside>
//     </>
//   );
// }

// export default Aside;



import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "../css/Globals.css";

function Aside({ onIdSubmit }) {
  const [inputValue, setInputValue] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [placeholderText, setPlaceholderText] = useState("Enter INumber");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);

  const handleInputChange = (event) => {
    const value = event.target.value.trim();
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
        setError(error.message || "Error submitting data");
        setLoading(false);
        setErrorMessageVisible(true);
      }
    }
  };

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

  // Disable submit button if validationMessage is not empty or inputValue is empty
  const isSubmitDisabled = validationMessage !== "" || inputValue.trim() === "";

  return (
    <>
      {loading && <div className="loading-bar" id="loadingBar"></div>}
      <aside className="aside">
        <h3>
          <i className="fas fa-user"></i> INumber
        </h3>
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
          <button type="submit" disabled={isSubmitDisabled || loading}>
            {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Submit"}
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
