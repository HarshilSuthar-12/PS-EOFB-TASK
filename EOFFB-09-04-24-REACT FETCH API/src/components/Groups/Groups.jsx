
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
                      <td colSpan="3">Not a member of any groups</td>
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

export default GroupsSection;
