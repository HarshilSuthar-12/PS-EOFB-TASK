import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "../css/Globals.css";



// Demo data
const demoUserData = {
  name: "",
  userPrincipalName: "",
  // email: "",
  position: "",
  creationDate: "",
  employeeID: "",
  employeeType: "",
  city: "",
  officeLocation: "",
  country: "",
  department: "",
  accountStatus: "",
  manager: {
    name: "",
    email: "",
  },
};

function InformationSection({ userData }) {
  const [isOpen, setIsOpen] = useState(true); // Keep the table expanded initially
  const [userDetails, setUserDetails] = useState(demoUserData);

  useEffect(() => {
    if (userData) {
      setUserDetails(userData);
      console.log("UserData", userData);
    }
  }, [userData]);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };



  return (
    <div className="con">
      {userDetails && (
        <>
          <h2
            className="section-header"
            onClick={toggleSection}
            style={{
              display: "flex",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <span>
              <i className="fas fa-info-circle"></i> Information
            </span>
            <span style={{ marginLeft: "10px" }}>
              {/* <FontAwesomeIcon
                icon={faChevronUp}
                className="icon"
                style={{
                  marginRight: "1em",
                  marginTop: "2px",
                  transition: "transform 0.5s",
                  transform: isOpen ? "rotate(0deg)" : "rotate(180deg)",
                }}
              /> */}
            </span>
          </h2>
          <div
            style={{
              transition: "max-height 0.5s ease-in-out",
              overflow: "hidden",
              maxHeight: isOpen ? "1000px" : "0",
            }}
          >
            <table id="information-table" className="section-content">
              <tbody>
                <tr>
                  <th>Employee ID</th>
                  <td>{userDetails.employeeID || "N/A"}</td>
                </tr>
                <tr>
                  <th>Name</th>
                  <td>{userDetails.name || "N/A"}</td>
                </tr>
                <tr>
                  <th>User Principal Name</th>
                  <td>{userDetails.userPrincipalName || "N/A"}</td>
                </tr>
                {/* <tr>
                  <th>Email</th>
                  <td>{userDetails.user || "N/A"}</td>
                </tr> */}
                <tr>
                  <th>Manager</th>
                  <td>{userDetails.manager.name || "N/A"}</td>
                </tr>
                <tr>
                  <th>Manager Email</th>
                  <td>{userDetails.manager.email || "N/A"}</td>
                </tr>
                <tr>
                  <th>Position</th>
                  <td>{userDetails.position || "N/A"}</td>
                </tr>
                <tr>
                  <th>Employee Type</th>
                  <td>{userDetails.employeeType || "N/A"}</td>
                </tr>
                <tr>
                  <th>Created Date</th>
                  <td>{userDetails.creationDate || "N/A"}</td>
                </tr>
                <tr>
                  <th>Account Status</th>
                  <td >
                    {userDetails.accountStatus || "N/A"}{" "}</td>
                </tr>
                <tr>
                  <th>Department</th>
                  <td>{userDetails.department || "N/A"}</td>
                </tr>
                <tr>
                  <th>City</th>
                  <td>{userDetails.city || "N/A"}</td>
                </tr>
                <tr>
                  <th>Country</th>
                  <td>{userDetails.country || "N/A"}</td>
                </tr>
                <tr>
                  <th>Office Location</th>
                  <td>{userDetails.officeLocation || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default InformationSection;