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

  // Function to fetch user data based on ID
  const fetchUserData =  (userId, callBack) => {
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
        return  response.json();
        console.log("Res: - ", res);
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
    return userData?.employeeDetails?.email; // Make sure to handle null or undefined cases
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
                <ExecutionComponent fetchUserId={fetchUserId} />
              </div>
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default Homepage;
