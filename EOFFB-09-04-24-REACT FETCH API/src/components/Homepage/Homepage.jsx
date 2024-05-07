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

// import React, { useState } from "react";
// import Aside from "../Aside/Aside";
// import ExecutionComponent from "../Confirm/ExecutionComponent";
// import InformationSection from "../Information/Information";
// import GroupsSection from "../Groups/Groups";
// import LicensesSection from "../Licences/Licences";
// import DomainSection from "../Domain/Domain";

// const Homepage = () => {
//   const [userData, setUserData] = useState(null);

//   const fetchUserData = (userId, callBack) => {
//     fetch(`http://127.0.0.1:8000/employee_info/${userId}`, {
//       method: "GET",
//       headers: {
//         "Access-Control-Allow-Origin": "*"
//       },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           // setShowUserNotFoundError(true);
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
//     return userData?.userPrincipalName;
//   };

//   return (
//     <div className="container-Homepage">
//       <div className="aside_confirm_section">
//         <Aside onIdSubmit={fetchUserData} />
//         <ExecutionComponent fetchUserId={fetchUserId} fetchUserData={fetchUserData} userData={userData} />
//       </div>
//       <div className="information-container">
//         <InformationSection userData={userData} />
//         <div className="inner_scetion">
//           <GroupsSection userData={userData} />
//           <LicensesSection userData={userData} />
//           {/* <DomainSection userData={userData} /> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Homepage;




// import React, { useState } from "react";
// import Aside from "../Aside/Aside";
// import ExecutionComponent from "../Confirm/ExecutionComponent";
// import InformationSection from "../Information/Information";
// import GroupsSection from "../Groups/Groups";
// import LicensesSection from "../Licences/Licences";
// import DomainSection from "../Domain/Domain";
// import LogViewer from "../LogsViewer/LogViewer";

// const Homepage = () => {
//   const [userData, setUserData] = useState(null);
//   const [isDataFetched, setIsDataFetched] = useState(false);

//   const fetchUserData = async (userId, callBack) => {
//     try {
//       const response = await fetch(
//         `http://127.0.0.1:8000/employee_info/${userId}`,
//         {
//           method: "GET",
//           headers: {
//             "Access-Control-Allow-Origin": "*",
//           },
//         }
//       )
//         .then((response) => {
//           if (!response.ok) {
  
//             throw new Error("Network response was not ok");
//           }
//           return response.json();
//         })
//         .then((data) => {
//           setIsDataFetched(true);
//           setUserData(data);
//           callBack(data);
//         });
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       // Handle error
//     }
//   };
//   const handleIdSubmit = async (id) => {
//     setIsDataFetched(false); 
//     await fetchUserData(id);
//   };

//   const fetchUserId =  () => {
//     return userData?.userPrincipalName; 
//   };

//   return (
//     <div className="container-Homepage">
//       <div className="aside_confirm_section">
//         <Aside
//           onIdSubmit={handleIdSubmit}
//           setIsDataFetched={setIsDataFetched}
//         />
//         {isDataFetched && (
//           <ExecutionComponent
//             fetchUserId={fetchUserId}
//             fetchUserData={fetchUserData}
//             userData={userData}
//           />
//         )}
//       </div>
//       <div className="information-container">
//         <InformationSection userData={userData} />
//         <div className="inner_scetion">
//           <GroupsSection userData={userData} />
//           <LicensesSection userData={userData} />
//           {/* <DomainSection userData={userData} /> */}
//           <LogViewer />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Homepage;



// import React, { useState } from "react";
// import Aside from "../Aside/Aside";
// import ExecutionComponent from "../Confirm/ExecutionComponent";
// import InformationSection from "../Information/Information";
// import GroupsSection from "../Groups/Groups";
// import LicensesSection from "../Licences/Licences";
// import DomainSection from "../Domain/Domain";
// import LogViewer from "../LogsViewer/LogViewer";
// import FinalConfirmationDialog from "../DialogBox/DialogBox"; // Import your FinalConfirmationDialog component

// const Homepage = () => {
//   const [userData, setUserData] = useState(null);
//   const [isDataFetched, setIsDataFetched] = useState(false);
//   const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

//   const fetchUserData = async (userId, callBack) => {
//     try {
//       const response = await fetch(
//         `http://127.0.0.1:8000/employee_info/${userId}`,
//         {
//           method: "GET",
//           headers: {
//             "Access-Control-Allow-Origin": "*",
//           },
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       setIsDataFetched(true);
//       setUserData(data);
//       callBack(data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       // Handle error
//     }
//   };

//   const handleIdSubmit = async (id) => {
//     setIsDataFetched(false);
//     await fetchUserData(id);
//   };

//   const fetchUserId = () => {
//     return userData?.userPrincipalName;
//   };

//   return (
//     <div className="container-Homepage">
//       <div className="aside_confirm_section">
//         <Aside onIdSubmit={handleIdSubmit} setIsDataFetched={setIsDataFetched} />
//         {isDataFetched && (
//           <ExecutionComponent
//             fetchUserId={fetchUserId}
//             fetchUserData={fetchUserData}
//             userData={userData}
//             setIsConfirmationOpen={setIsConfirmationOpen}
//           />
//         )}
//       </div>
//       <div className="information-container">
//         <InformationSection userData={userData} />
//         <div className="inner_scetion">
//           <GroupsSection userData={userData} />
//           <LicensesSection userData={userData} />
//           {/* <DomainSection userData={userData} /> */}
//           {isDataFetched && !isConfirmationOpen && <LogViewer />}
//         </div>
//       </div>
//       <FinalConfirmationDialog
//         open={isConfirmationOpen}
//         onClose={() => setIsConfirmationOpen(false)}
//       />
//     </div>
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
import LogViewer from "../LogsViewer/LogViewer";
import FinalConfirmationDialog from "../DialogBox/DialogBox"; // Import your FinalConfirmationDialog component

const Homepage = () => {
  const [userData, setUserData] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const fetchUserData = async (userId, callBack) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/employee_info/${userId}`,
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setIsDataFetched(true);
      setUserData(data);
      callBack(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error
    }
  };

  const handleIdSubmit = async (id) => {
    setIsDataFetched(false);
    await fetchUserData(id);
  };

  const fetchUserId = () => {
    return userData?.userPrincipalName;
  };

  return (
    <div className="container-Homepage">
      <div className="aside_confirm_section">
        <Aside onIdSubmit={handleIdSubmit} setIsDataFetched={setIsDataFetched} />
        {isDataFetched && (
          <ExecutionComponent
            fetchUserId={fetchUserId}
            fetchUserData={fetchUserData}
            userData={userData}
            setIsConfirmationOpen={setIsConfirmationOpen}
          />
        )}
      </div>
      <div className="information-container">
        {isDataFetched && (
          <>
            <InformationSection userData={userData} />
            <div className="inner_scetion">
              <GroupsSection userData={userData} />
              <LicensesSection userData={userData} />
              {/* <DomainSection userData={userData} /> */}
            {!isConfirmationOpen && <LogViewer />} 
            </div>
          </>
        )}
      <FinalConfirmationDialog
        open={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        />
    </div>
        </div>
  );
};

export default Homepage;
