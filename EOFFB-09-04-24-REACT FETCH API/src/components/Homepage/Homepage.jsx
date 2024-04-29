// import React, { useState } from "react";
// // import { Route, Routes } from 'react-router-dom';
// import Navbar from "../Navbar/Navbar";
// import Aside from "../Aside/Aside";
// import InformationSection from "../Information/Information";
// import GroupsSection from "../Groups/Groups";
// import LicensesSection from "../Licences/Licences";
// import DomainSection from "../Domain/Domain";
// import ExecutionComponent from "../Confirm/ExecutionComponent";
// import User from "../User/User";
// import { Router, Routes, Route } from "react-router-dom";
// import Logout from "../Login/Logout";

// const Homepage = () => {
//   const [userData, setUserData] = useState(null);
//   const { user } = this.props;
//   // Function to fetch user data based on ID
//   const fetchUserData = (userId) => {
//     fetch(`http://127.0.0.1:8000/employee/${userId}`, {
//       method: 'GET',
//       headers: {
//         "Access-Control-Allow-Origin" : "*", // This header is typically set by the server, not by the client
//           // Add any other headers you need here
//       }})
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setUserData(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   };

//   const fetchUserId = () => {
//     return userData.employeeDetails.email;
//   }

//   // const exampleData = {
//   //     'Name': 'Harshil Suthar',
//   //     'Email': 'i01014@3eco.com',
//   //     'Job Title': 'Engineer',
//   //     'Manager Name': 'Dummy Manager',
//   //     'Location': 'India',
//   //     'OU Path': '3E Contractor/Harshil Suthar',
//   //     'Emp type': 'Contractor',
//   //     'Account Status': 'Activated',
//   // };
//   const groupsData = {
//     "Group Name": "Windows 365",
//     Groups: "Normal",
//     "Distribution List": "Windows 365",
//     "Security Groups": "N/A",
//   };

//   return (
//     <>
//       <Navbar />
//       <h1>Welcome, {user.name}</h1>
//        {/* Include the Navbar component here */}
//       {/* <Logout /> */}
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <div className="container-Homepage">
//               <Aside onIdSubmit={fetchUserData} />
//               {/* <Logout /> */}
//               <div className="information-container">
//                 <InformationSection userData={userData} />
//                 <GroupsSection userData={userData} />
//                 <LicensesSection userData={userData} />
//                 <DomainSection userData={userData} />
//                 <ExecutionComponent fetchUserId={fetchUserId} />
//               </div>
//             </div>
//           }
//         />
//         {/* Uncomment the following line if you want to use UserInformation component */}
//         <Route path="/user" element={<User />} />
//       </Routes>
//     </>
//   );
// };

// export default Homepage;

// import React, { useState } from "react";
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

// const Homepage = ({ user }) => { // Destructuring props to access user directly
//   const [userData, setUserData] = useState(null);

//   // Function to fetch user data based on ID
//   const fetchUserData = (userId) => {
//     fetch(`http://127.0.0.1:8000/employee/${userId}`, {
//       method: 'GET',
//       headers: {
//         "Access-Control-Allow-Origin" : "*", // This header is typically set by the server, not by the client
//           // Add any other headers you need here
//       }})
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setUserData(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   };

//   const fetchUserId = () => {
//     return userData?.employeeDetails?.email; // Make sure to handle null or undefined cases
//   }

//   // const groupsData = {
//   //   "Group Name": "Windows 365",
//   //   Groups: "Normal",
//   //   "Distribution List": "Windows 365",
//   //   "Security Groups": "N/A",
//   // };

//   return (
//     <>
//       <Navbar />
//       <h1>Welcome, {user.name}</h1> {/* Accessing user name from props */}
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <div className="container-Homepage">
//               <Aside onIdSubmit={fetchUserData} />
//               <div className="information-container">
//                 <InformationSection userData={userData} />
//                 <GroupsSection userData={userData} />
//                 <LicensesSection userData={userData} />
//                 <DomainSection userData={userData} />
//                 <ExecutionComponent fetchUserId={fetchUserId} />
//               </div>
//             </div>
//           }
//         />
//         <Route path="/user" element={<User />} />
//       </Routes>
//       <Logout />
//     </>
//   );
// };

// export default Homepage;

import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Aside from "../Aside/Aside";
import InformationSection from "../Information/Information";
import GroupsSection from "../Groups/Groups";
import LicensesSection from "../Licences/Licences";
import DomainSection from "../Domain/Domain";
import ExecutionComponent from "../Confirm/ExecutionComponent";
import { Routes, Route } from "react-router-dom";
import User from "../User/User";
import Logout from "../Login/Logout";
import PropTypes from "prop-types";

const Homepage = ({ user }) => {
  const [userData, setUserData] = useState(null);
  // const [username, setUsername] = useState("");

  const accessToken = localStorage.getItem("accessToken");

  // Function to fetch user data based on ID
  const fetchUserData = (userId) => {
    fetch(`http://127.0.0.1:8000/employee/${userId}`, {
      method: "GET",
      headers: {
        // "Authorization": `Bearer ${accessToken}`,
        "Access-Control-Allow-Origin": "*", // This header is typically set by the server, not by the client
        // Add any other headers you need here
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const fetchUserId = () => {
    return userData?.employeeDetails?.email; // Make sure to handle null or undefined cases
  };

  // useEffect(() => {
  //   // Extract username from the user object and set it to the state
  //   // setUsername(response.acc || "");
  //   setUsername();
  // }, [user]);

  
  return (
    <>
      <Navbar />
      {/* <User /> */}
      {/* <h1>Welcome, {username}</h1>  */}
      {/* response.account.idTokenClaims.name */}
      <Routes>
        <Route
          path="/"
          element={
            <div className="container-Homepage">
              <Aside onIdSubmit={fetchUserData} />
              <div className="information-container">
                <InformationSection userData={userData} />
                <GroupsSection userData={userData} />
                <LicensesSection userData={userData} />
                <DomainSection userData={userData} />
                <ExecutionComponent fetchUserId={fetchUserId} />
              </div>
            </div>
          }
        />
      </Routes>
      {/* <Logout /> */}
    </>
  );
};

export default Homepage;
