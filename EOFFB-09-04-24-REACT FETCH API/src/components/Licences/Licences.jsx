import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import '../css/Globals.css';

function LicensesSection({ userData }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  // const formatGroups = (groups) => {
  //   return groups.map((group) => group.displayName).join(", ");
  // };

  // const formatLicenses = (licenses) => {
  //   return licenses.map((license) => license.licenseName).join(", ");
  // };

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
          <i className="fas fa-info-circle"></i> Licenses
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
      <th>Name</th>
      <th>Status</th>
      </tr>
      {userData.licenses.map((license, index) => (
        <tr key={index}>
          <td>{license.licenseName}</td>
          <td>{license.status}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}

      </div>
    </div>
  );
}

export default LicensesSection;
