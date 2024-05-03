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
//   const fetchUserData =  (userId, callBack) => {
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
//         return  response.json();
//         // console.log("Res: - ", res);
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
//     return userData?.email; // Make sure to handle null or undefined cases
//   };


//   return (
//     <>
//       <Navbar />
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
//                 <DialogBox userData={userData}/>
//               </div>
//             </div>
//           }
//         />
//       </Routes>
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
import DialogBox from "../DialogBox/DialogBox";

const Homepage = ({ user }) => {
  const [userData, setUserData] = useState(null);

  // Function to fetch user data based on ID
  const fetchUserData = (userId, callBack) => {
    fetch(`http://127.0.0.1:8000/employee_info/${userId}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*"
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
        callBack(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const fetchUserId = () => {
    return userData?.email; // Make sure to handle null or undefined cases
  };

  return (
    <>
      <Navbar />
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
                <ExecutionComponent fetchUserId={fetchUserId} fetchUserData={fetchUserData} userData={userData} />
                <DialogBox userData={userData}/>
              </div>
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default Homepage;
