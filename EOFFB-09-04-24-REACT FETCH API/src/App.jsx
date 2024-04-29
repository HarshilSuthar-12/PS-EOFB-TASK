// import "./App.css";
// import Navbar from "./components/Navbar/Navbar";
// import Aside from "./components/Aside/Aside";
// import InformationSection from "./components/Information/Information";
// import GroupsSection from "./components/Groups/Groups";
// import LicensesSection from "./components/Licences/Licences";
// import DomainSection from "./components/Domain/Domain";
// import ExecutionComponent from "./components/Confirm/ExecutionComponent";
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import UserInformation from "./components/User/User";
// import { useState } from "react";
// import Login from "./components/Login/Login.jsx";
// import AuthProvider from "./components/Login/AuthProvider";


// function App() {
//   const [userData, setUserData] = useState(null);

//   // Function to fetch user data based on ID
//   const fetchUserData = (userId) => {
//     fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setUserData(data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   };

//   const exampleData = {
//     'Name': 'Harshil Suthar',
//     'Email': 'i01014@3eco.com',
//     'Job Title': 'Engineer',
//     'Manager Name': 'Dummy Manager',
//     'Location': 'India',
//     'OU Path': '3E Contractor/Harshil Suthar',
//     'Emp type': 'Contractor',
//     'Account Status': 'Activated',
//   };
//   const groupsData = {
//     'Group Name': 'Windows 365',
//     'Groups': 'Normal',
//     'Distribution List': 'Windows 365',
//     'Security Groups': 'N/A',
//   };

//   return (
//     <BrowserRouter>
//     <Navbar title="Employee Off-Boarding" icon="fas fa-user-circle"/>
//     <Routes>
//       <Route path="/" element={
//         <div className="container">
//           <Aside onIdSubmit={fetchUserData}/>
//           <div className="information-container">
//             <InformationSection userData={userData} />
//             <GroupsSection  userData={groupsData}/>
//             <LicensesSection />
//             <DomainSection />
//             <ExecutionComponent />
//           </div>
//         </div>
//       } />
//       <Route path="/user" element={<UserInformation />} />
//       <Route path="/login" element={<Login />} />
//     </Routes>
//   </BrowserRouter>
//   );
// }

// export default App;











import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage'; // Adjust the path as needed
import Login from './components/Login/Login'; // Adjust the path as needed
import InformationSection from './components/Information/Information';
import ErrorBoundary from './components/ErrorBoundry';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const App = () => {
  return (
    <>
    <ErrorBoundary>
    <BrowserRouter>
      {/* <Navbar title="Employee Off-Boarding" icon="fas fa-user-circle" /> */}
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/Homepage" element={<ProtectedRoute component={<Homepage />} />} />
        
      </Routes>
    </BrowserRouter>
    </ErrorBoundary>
    </>
  );
}

export default App;
