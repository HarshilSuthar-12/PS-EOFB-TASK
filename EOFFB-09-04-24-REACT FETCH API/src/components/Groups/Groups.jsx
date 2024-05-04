// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUsers, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
// import '../css/Globals.css';

// function GroupsSection({userData}) {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleSection = () => {
//     setIsOpen(!isOpen);
//   };

//   // const formatGroups = (groups) => {
//   //   return groups.map((group) => group.displayName).join(", ");
//   // };

//   // const formatLicenses = (licenses) => {
//   //   return licenses.map((license) => license.licenseName).join(", ");
//   // };

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
//           <i className="fas fa-info-circle"></i> Groups
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
//   <table id="information-table" className="section-content">
//     <tbody>
//       <tr>
//         <th>
//           Name
//         </th>
//       </tr>
//       {userData.groups.map((groups, index) => (
//         <tr key={index}>
//           {/* <th>{groups.id}</th> */}
//           <td>{groups.displayName}</td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// )}

//       </div>
//     </div>
//   );
// }

// export default GroupsSection;

// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
// import "../css/Globals.css";

// // Demo data
// const demoGroupsData = {
//   groups: [
//     { displayName: "Group 1" },
//     { displayName: "Group 2" },
//     { displayName: "Group 3" },
//   ],
// };

// function GroupsSection({ userData }) {
//   const [isOpen, setIsOpen] = useState(true); // Keep the table expanded initially
//   const [groupsData, setGroupsData] = useState(demoGroupsData);

//   useEffect(() => {
//     if (userData) {
//       setGroupsData(userData);
//     }
//   }, [userData]);

//   const toggleSection = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="con">
//       {groupsData && (
//         <>
//           <h2
//             className="section-header"
//             onClick={toggleSection}
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               cursor: "pointer",
//             }}
//           >
//             <span>
//               <i className="fas fa-info-circle"></i> Groups
//             </span>
//             <span style={{ marginLeft: "10px" }}>
//               <FontAwesomeIcon
//                 icon={isOpen ? faChevronUp : faChevronDown}
//                 className="icon"
//                 style={{
//                   marginRight: "1em",
//                   marginTop: "2px",
//                   transition: "transform 0.5s",
//                   transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
//                 }}
//               />
//             </span>
//           </h2>
//           <div
//             style={{
//               transition: "max-height 0.5s ease-in-out",
//               overflow: "hidden",
//               maxHeight: isOpen ? "1000px" : "0",
//             }}
//           >
//             {isOpen && (
//               <table id="information-table" className="section-content">
//                 <tbody>
//                   <tr>
//                     <th>Name</th>
//                   </tr>
//                   {groupsData.groups.map((group, index) => (
//                     <tr key={index}>
//                       <td>{group.displayName}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default GroupsSection;

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "../css/Globals.css";

// Demo data
const demoGroupsData = {
  groups: [
    {
      id: "d2f7a222-3f53-4616-bded-156dc0ed3d65",
      isChecked: false,
      isDisabled: true,
    },
    { name: "", isChecked: false, isDisabled: true },
    { activeStatus: true, isChecked: false, isDisabled: true },
  ],
};

function GroupsSection({ userData }) {
  const [isOpen, setIsOpen] = useState(true); // Keep the table expanded initially
  const [groupsData, setGroupsData] = useState(demoGroupsData.groups);

  useEffect(() => {
    if (userData) {
      setGroupsData(
        userData.groupsActiveStatus.map((group) => ({
          ...group,
          isChecked: false,
          isDisabled: true, // Initially disable the checkbox
        }))
      );
    }
  }, [userData]);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (index) => {
    const updatedGroupsData = [...groupsData];
    updatedGroupsData[index].isChecked = !updatedGroupsData[index].isChecked;
    setGroupsData(updatedGroupsData);
  };

  return (
    <div className="con">
      {groupsData && (
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
            <i class="fa-solid fa-user-group"></i> Groups
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
              transition: 'max-height 0.5s ease-in-out',
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
                    {/* <th>Confirmation</th> */}
                  </tr>
                  {groupsData && groupsData.length > 0 ? (
                    groupsData.map((group, index) => (
                      <tr key={index}>
                        <td>{group.name || "N/A"}</td>
                        <td>{group.activeStatus ? "Active" : "Inactive"}</td>
                        {/* <td>Your checkbox code</td> */}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No groups assigned</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default GroupsSection;
