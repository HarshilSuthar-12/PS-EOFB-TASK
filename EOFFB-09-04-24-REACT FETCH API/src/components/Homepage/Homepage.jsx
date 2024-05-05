
// import React, { useState, useEffect } from "react";
// import Navbar from "../Navbar/Navbar";
// import Aside from "../Aside/Aside";
// import InformationSection from "../Information/Information";
// import GroupsSection from "../Groups/Groups";
// import LicensesSection from "../Licences/Licences";
// import DomainSection from "../Domain/Domain";
// import ExecutionComponent from "../Confirm/ExecutionComponent";
// import { Routes, Route } from "react-router-dom";
// import User from "../User/User";
// import Logout from "../Login/Logout";
// import PropTypes from "prop-types";
// import DialogBox from "../DialogBox/DialogBox";

// const Homepage = ({ user }) => {
//   const [userData, setUserData] = useState(null);

//   // Function to fetch user data based on ID
//   const fetchUserData = (userId, callBack) => {
//     fetch(`http://127.0.0.1:8000/employee_info/${userId}`, {
//       method: "GET",
//       headers: {
//         "Access-Control-Allow-Origin": "*"
//       },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setUserData(data);
//         callBack(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   };

//   const fetchUserId = () => {
//     return userData?.userPrincipalName; // Make sure to handle null or undefined cases
//   };

//   return (
//     <>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <div className="container-Homepage">
//               <div className="aside_confirm_section">
//               <Aside onIdSubmit={fetchUserData} />
//               <ExecutionComponent fetchUserId={fetchUserId} fetchUserData={fetchUserData} userData={userData} />
//               </div>
//               <div className="information-container">
//                 <InformationSection userData={userData} />
//                <div className="inner_scetion">
//                <GroupsSection userData={userData} />
//                 <LicensesSection userData={userData} />
//                 <DomainSection userData={userData} />
//                </div>
//                 {/* <DialogBox userData={userData}/> */}
//               </div>
//             </div>
//           }
//         />
//       </Routes>
//     </>
//   );
// };

// export default Homepage;



import React, { useState } from "react";
import Aside from "../Aside/Aside";
import ExecutionComponent from "../Confirm/ExecutionComponent";
import InformationSection from "../Information/Information";
import GroupsSection from "../Groups/Groups";
import LicensesSection from "../Licences/Licences";
import DomainSection from "../Domain/Domain";
// import {Dialog,DialogTitle,DialogContent,DialogActions,Button,CircularProgress,} from "@mui/material";
// import zIndex from "@mui/material/styles/zIndex";

const Homepage = () => {
  const [userData, setUserData] = useState(null);
  const [showUserNotFoundError, setShowUserNotFoundError] = useState(false);

  const fetchUserData = (userId, callBack) => {
    fetch(`http://127.0.0.1:8000/employee_info/${userId}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
    })
      .then((response) => {
        if (!response.ok) {
          // setShowUserNotFoundError(true);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
        callBack(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // if (error.response && error.response.status === 500) {
          // setShowUserNotFoundError(true);
        // }
      });
  };

  const fetchUserId = () => {
    return userData?.userPrincipalName; // Make sure to handle null or undefined cases
  };

  // const handleCloseUserNotFoundError = () => {
  //   setShowUserNotFoundError(false);
  // };

  return (
    <div className="container-Homepage">
      <div className="aside_confirm_section">
        <Aside onIdSubmit={fetchUserData} />
        <ExecutionComponent fetchUserId={fetchUserId} fetchUserData={fetchUserData} userData={userData} />
      </div>
      <div className="information-container">
        <InformationSection userData={userData} />
        <div className="inner_scetion">
          <GroupsSection userData={userData} />
          <LicensesSection userData={userData} />
          <DomainSection userData={userData} />
        </div>
      </div>
      {/* <Dialog 
      open={showUserNotFoundError}
      onClose={handleCloseUserNotFoundError}>
      <DialogTitle
            sx={{
              fontFamily: "Poppins",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            User not Found
          </DialogTitle>
          <DialogContent dividers>
            <div style={{ textAlign: "center", margin: '20px', color: 'red' }}>
              <h3>User's account is disabled</h3>
            </div>
          </DialogContent>
          <DialogActions style={{ justifyContent: "center" }}></DialogActions>
            <Button
              onClick={onClose}
              variant="contained"
              color="primary"
              sx={{
                fontFamily: "poppins",
                fontSize: "1em",
                padding: "12px 35px",
              }}
            >
              OK
            </Button>
      </Dialog> */}
    </div>
  );
};

export default Homepage;
