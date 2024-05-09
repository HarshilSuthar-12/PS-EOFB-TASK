

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "../css/Globals.css";

// Demo data
const demoLicensesData = {
  licenses: [
    {
      id: "d2f7a222-3f53-4616-bded-156dc0ed3d65",
      status: "Active",
      isChecked: false,
      isDisabled: true,
    },
  ],
};

function LicensesSection({ userData }) {
  const [isOpen, setIsOpen] = useState(true); // Keep the table expanded initially
  const [licensesData, setLicensesData] = useState(demoLicensesData.licenses);

  useEffect(() => {
    if (userData) {
      // console.log("Active Status: - ",userData.activeStatus);
      setLicensesData(
        userData.licensesActiveStatus.map((license) => ({
          ...license,
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
    const updatedLicensesData = [...licensesData];
    updatedLicensesData[index].isChecked =
      !updatedLicensesData[index].isChecked;
    setLicensesData(updatedLicensesData);
  };

  return (
    <div className="con">
      {licensesData && (
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
            <i class="fa-solid fa-id-card"></i> Licenses
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
              transition: "max-height 0.5s ease-in-out",
              overflow: "hidden",

            }}
          >

              <table id="information-table" className="section-content">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                    {/* <th>Confirmation</th> */}
                  </tr>
                  {licensesData && licensesData.length > 0 ? (
                    licensesData.map((license, index) => (
                      <tr key={index}>
                        <td>{license.name || "N/A"}</td>
                        <td>{license.activeStatus ? "Active" : "Inactive"}</td>
                        {/* <td>Your checkbox code</td> */}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No license assignments found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
          </div>
        </>
      )}
    </div>
  );
}

export default LicensesSection;
