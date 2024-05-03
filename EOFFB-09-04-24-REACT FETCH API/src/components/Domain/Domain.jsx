// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
// import '../css/Globals.css';

// function DomainSection({userData}) {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleSection = () => {
//     setIsOpen(!isOpen);
//   };

//   const formatGroups = (groups) => {
//     return groups.map((group) => group.displayName).join(", ");
//   };

//   const formatLicenses = (licenses) => {
//     return licenses.map((license) => license.licenseName).join(", ");
//   };

//   return (
//     <div className="con">
//       <h2
//         className="section-header"
//         onClick={toggleSection}
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           cursor: "pointer",
//         }}
//       >
//         <span>
//           <i className="fas fa-info-circle"></i> Domain
//         </span>
//         <span style={{ marginLeft: "10px", transition: "transform 0.5s" }}>
//           <FontAwesomeIcon
//             icon={isOpen ? faChevronUp : faChevronDown}
//             className="icon"
//             style={{
//               marginRight: "1em",
//               marginTop: "2px",
//               transition: "transform 0.5s",
//               transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
//             }}
//           />
//         </span>
//       </h2>
//       <div
//         style={{
//           transition: "max-height 0.5s ease-in-out",
//           overflow: "hidden",
//           maxHeight: isOpen ? "1000px" : "0",
//         }}
//       >
//         {isOpen && (
//           <table id="information-table" className="section-content">
//             <tbody>
//               <tr>
//                 <th>Name</th>
//               </tr>
//               <tr>
//               <td>{userData.domainName || "N/A"}</td>
//               </tr>
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

// export default DomainSection;



import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "../css/Globals.css";

// Demo data
const demoDomainData = {
  domainName: "",
};

function DomainSection({ userData }) {
  const [isOpen, setIsOpen] = useState(true); // Keep the table expanded initially
  const [domainData, setDomainData] = useState(demoDomainData);

  useEffect(() => {
    if (userData) {
      setDomainData(userData);
    }
  }, [userData]);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="con">
      {domainData && (
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
              <i className="fas fa-info-circle"></i> Domain
            </span>
            <span style={{ marginLeft: "10px" }}>
            <FontAwesomeIcon
                icon={faChevronUp}
                className="icon"
                style={{
                  marginRight: "1em",
                  marginTop: "2px",
                  transition: "transform 0.5s",
                  transform: isOpen ? "rotate(0deg)" : "rotate(180deg)",
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
                  </tr>
                  <tr>
                  {/* <td>{domainData.domainName || "N/A"}</td> */}
                    <td>ProductSquads.co</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default DomainSection;
