import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "../css/Globals.css";

function InformationSection({ userData }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="con">
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
        <span style={{ marginLeft: "10px", transition: "transform 0.5s" }}>
          <FontAwesomeIcon
            icon={isOpen ? faChevronUp : faChevronDown}
            className="icon"
            style={{
              marginRight: "1em",
              marginTop: "2px",
              transition: "transform 0.5s",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </span>
      </h2>
      <div
        style={{
          transition: "max-height 0.5s ease-in-out",
          overflow: "hidden",
          maxHeight: isOpen ? "1000px" : "0",
        }}
      >
        {isOpen && (
          <table id="information-table" className="section-content">
            <tbody>
              <tr>
                <th>Employee ID</th>
                <td>{userData.employeeDetails?.employeeId || "N/A"}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{userData.employeeDetails?.name || "N/A"}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{userData.employeeDetails?.email || "N/A"}</td>
              </tr>
              <tr>
                <th>Manager</th>
                <td>{userData.employeeDetails?.manager || "N/A"}</td>
              </tr>
              <tr>
                <th>Position</th>
                <td>{userData.employeeDetails?.position || "N/A"}</td>
              </tr>
              <tr>
                <th>Employee Type</th>
                <td>{userData.employeeDetails?.employeeType || "N/A"}</td>
              </tr>
              <tr>
                <th>Created Date</th>
                <td>{userData.employeeDetails?.creationDate || "N/A"}</td>
              </tr>
              <tr>
                <th>Account Status</th>
                <td>{userData.employeeDetails?.accountStatus || "N/A"}</td>
              </tr>
              <tr>
                <th>Department</th>
                <td>{userData.employeeDetails?.department || "N/A"}</td>
              </tr>
              <tr>
                <th>City</th>
                <td>{userData.employeeDetails?.city || "N/A"}</td>
              </tr>
              <tr>
                <th>Country</th>
                <td>{userData.employeeDetails?.country || "N/A"}</td>
              </tr>
              <tr>
                <th>Office Location</th>
                <td>{userData.employeeDetails?.officeLocation || "N/A"}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default InformationSection;
