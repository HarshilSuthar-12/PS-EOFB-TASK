// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
// import "../css/Globals.css";

// function InformationSection({ userData }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [userDetails, setUserDetails] = useState(null);

//   useEffect(() => {
//     if (userData) {
//       setUserDetails(userData.employeeDetails);
//     }
//   }, [userData]);

//   const toggleSection = () => {
//     setIsOpen(!isOpen);
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
//           <i className="fas fa-info-circle"></i> Information
//         </span>
//         <span style={{ marginLeft: "10px" }}>
//           <FontAwesomeIcon
//             icon={faChevronUp}
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
//         {userDetails && (
//           <table id="information-table" className="section-content">
//             <tbody>
//               <tr>
//                 <th>Employee ID</th>
//                 <td>{userDetails.employeeId || "N/A"}</td>
//               </tr>
//               <tr>
//                 <th>Name</th>
//                 <td>{userDetails.name || "N/A"}</td>
//               </tr>
//               <tr>
//                 <th>Email</th>
//                 <td>{userDetails.email || "N/A"}</td>
//               </tr>
//               <tr>
//                 <th>Manager</th>
//                 <td>{userDetails.manager || "N/A"}</td>
//               </tr>
//               <tr>
//                 <th>Position</th>
//                 <td>{userDetails.position || "N/A"}</td>
//               </tr>
//               <tr>
//                 <th>Employee Type</th>
//                 <td>{userDetails.employeeType || "N/A"}</td>
//               </tr>
//               <tr>
//                 <th>Created Date</th>
//                 <td>{userDetails.creationDate || "N/A"}</td>
//               </tr>
//               <tr>
//                 <th>Account Status</th>
//                 <td>{userDetails.accountStatus || "N/A"}</td>
//               </tr>
//               <tr>
//                 <th>Department</th>
//                 <td>{userDetails.department || "N/A"}</td>
//               </tr>
//               <tr>
//                 <th>City</th>
//                 <td>{userDetails.city || "N/A"}</td>
//               </tr>
//               <tr>
//                 <th>Country</th>
//                 <td>{userDetails.country || "N/A"}</td>
//               </tr>
//               <tr>
//                 <th>Office Location</th>
//                 <td>{userDetails.officeLocation || "N/A"}</td>
//               </tr>
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

// export default InformationSection;

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "../css/Globals.css";

// "id": "979a02d0-2391-4171-9c02-debcb54e128a",
//     "name": "Test OB",
//     "email": "testob@productsquads.co",
//     "position": "test title",
//     "creationDate": "2024-04-18T11:09:15Z",
//     "employeeID": "1111",
//     "employeeType": "test Emp type",
//     "city": "testCity",
//     "officeLocation": "Ahmedabad",
//     "country": "Inida",
//     "department": "test department",
//     "accountStatus": "Inactive",
//     "manager": {
//         "id": "7f53c1f7-d554-4f52-914a-e6cce73969df",
//         "name": "Prasun Madhup",
//         "email": "prasun.madhup@productsquads.co"
//     },

// Demo data
const demoUserData = {
  name: "John Doe",
  email: "john.doe@example.com",
  position: "Software Engineer",
  creationDate: "2023-01-01",
  employeeID: "12345",
  employeeType: "Full-time",
  city: "New York",
  officeLocation: "Office A",
  country: "USA",
  department: "Engineering",
  accountStatus: "Active",
  manager: {
    managerName: "Jhon Doe",
    manager_email: "jane@example.com",
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
                  <th>Email</th>
                  <td>{userDetails.email || "N/A"}</td>
                </tr>
                <tr>
                  <th>Manager</th>
                  <td>{userDetails.manager.managerName || "N/A"}</td>
                </tr>
                <tr>
                  <th>Manager</th>
                  <td>{userDetails.manager.manager_email || "N/A"}</td>
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
                  <td>{userDetails.accountStatus || "N/A"}</td>
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
