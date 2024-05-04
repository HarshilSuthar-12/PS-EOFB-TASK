// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   CircularProgress,
// } from "@mui/material";
// import { styled } from "@mui/system";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// // Custom styled Paper component for dark mode
// const DarkPaper = styled("div")({
//   color: "#070808", // White text color
//   boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//   padding: "20px",
//   borderRadius: "4px",
//   overflow: "hidden", // Hide overflow to remove scrollbar
// });

// const ConfirmationDialog = ({
//   open,
//   onClose,
//   onConfirm,
//   executionMessage,
//   confirmationData,
//   fetchUserData,
//   userData,
// }) => {
//   const [userDetails, setUserDetails] = useState(userData);
//   const [loading, setLoading] = useState(false);

//   // Effect to update user details when userData prop changes
//   React.useEffect(() => {
//     setUserDetails(userData);
//   }, [userData]);

//   const handleConfirm = async () => {
//     setLoading(true); // Set loading to true when confirming
//     try {
//       await onConfirm(); // Call the onConfirm function passed from parent
//     } catch (error) {
//       console.error("Error:", error);
//       // setLoading(false); // Set loading to false when confirmation process is complete
//     }
//     setLoading(false);
//   };

//   return (
//     <>
//       {loading && (
//         <div className="full-page-loading">
//           <FontAwesomeIcon icon={faSpinner} spin />
//         </div>
//       )}
//       <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
//         <DarkPaper>
//           <DialogTitle
//             sx={{
//               fontFamily: "Poppins",
//               fontWeight: "bold",
//               textAlign: "center",
//             }}
//           >
//             Are you sure you want to Terminate the user?
//           </DialogTitle>
//           <DialogContent dividers>
//             <>
//               <table id="information-table" className="section-content">
//                 <tbody>
//                   <tr>
//                     <th>Employee ID</th>
//                     <td>{userDetails?.employeeID || "N/A"}</td>
//                   </tr>
//                   <tr>
//                     <th>Name</th>
//                     <td>{userDetails?.name || "N/A"}</td>
//                   </tr>
//                   <tr>
//                     <th>Email</th>
//                     <td>{userDetails?.email || "N/A"}</td>
//                   </tr>
//                   <tr>
//                     <th>Account Status</th>
//                     <td>{userDetails?.accountStatus || "N/A"}</td>
//                   </tr>
//                 </tbody>
//               </table>
//               <div className="message-box" style={{ textAlign: "center" }}>
//                 {executionMessage}
//               </div>
//             </>
//           </DialogContent>
//           <DialogActions style={{ justifyContent: "center" }}>
//             <Button
//               onClick={handleConfirm}
//               disabled={loading}
//               variant="contained"
//               color="primary"
//               sx={{
//                 fontFamily: "poppins",
//                 fontSize: "1em",
//                 padding: "12px 35px",
//               }}
//             >
//               {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "YES"}
//             </Button>
//             <Button
//               onClick={onClose}
//               variant="contained"
//               color="error"
//               sx={{
//                 fontFamily: "poppins",
//                 fontSize: "1em",
//                 padding: "12px 35px",
//               }}
//             >
//               NO
//             </Button>
//           </DialogActions>
//         </DarkPaper>
//       </Dialog>
//     </>
//   );
// };

// export default ConfirmationDialog;

import React, { useState } from "react";
import {Dialog,DialogTitle,DialogContent,DialogActions,Button,} from "@mui/material";
import { styled } from "@mui/system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";


// Custom styled Paper component for dark mode
// const DarkPaper = styled("div")({
//   color: "#070808", // White text color
//   boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//   padding: "20px",
//   borderRadius: "4px",
//   overflow: "hidden", // Hide overflow to remove scrollbar
// });

const ConfirmationDialog = ({open,onClose,onConfirm,executionMessage,userData,}) => {
  const [userDetails, setUserDetails] = useState(userData);
  const [loading, setLoading] = useState(false);
  

  // Effect to update user details when userData prop changes
  React.useEffect(() => {
    setUserDetails(userData);
  }, [userData]);

  const handleConfirm = async () => {
    setLoading(true); // Set loading to true when confirming
    try {
      await onConfirm(); // Call the onConfirm function passed from parent
      setLoading(false); // Set loading to false regardless of success or error
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {loading && (
        <div className="full-page-loading">
          <FontAwesomeIcon icon={faSpinner} spin />
        </div>
      )}
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
        {/* <DarkPaper> */}
          <DialogTitle
            sx={{
              fontFamily: "Poppins",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Are you sure you want to Terminate the user?
          </DialogTitle>
          <DialogContent dividers>
            <>
              <table id="information-table" className="section-content">
                <tbody>
                  <tr>
                    <th>Employee ID</th>
                    <td>{userDetails?.employeeID || "N/A"}</td>
                  </tr>
                  <tr>
                    <th>Name</th>
                    <td>{userDetails?.name || "N/A"}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{userDetails?.email || "N/A"}</td>
                  </tr>
                  <tr>
                    <th>Account Status</th>
                    <td>{userDetails?.accountStatus || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
              <div className="message-box" style={{ textAlign: "center" }}>
                {executionMessage}
              </div>
            </>
          </DialogContent>
          <DialogActions style={{ justifyContent: "center" }}>
            <Button
              onClick={handleConfirm}
              disabled={loading}
              variant="contained"
              color="primary"
              sx={{
                fontFamily: "poppins",
                fontSize: "1em",
                padding: "12px 35px",
              }}
            >
              {/* {loading && (
                <div className="full-page-loading">
                  <FontAwesomeIcon icon={faSpinner} spin />
                </div>
              )} */}
              YES
            </Button>
            <Button
              onClick={onClose}
              variant="contained"
              color="error"
              sx={{
                fontFamily: "poppins",
                fontSize: "1em",
                padding: "12px 35px",
              }}
            >
              NO
            </Button>
          </DialogActions>
        {/* </DarkPaper> */}
      </Dialog>
    </>
  );
};

export default ConfirmationDialog;

// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   CircularProgress,
// } from "@mui/material";
// import { styled } from "@mui/system";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// // Custom styled Paper component for dark mode
// const DarkPaper = styled("div")({
//   color: "#070808", // White text color
//   boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//   padding: "20px",
//   borderRadius: "4px",
//   overflow: "hidden", // Hide overflow to remove scrollbar
// });

// const ConfirmationDialog = ({
//   open,
//   onClose,
//   onConfirm,
//   executionMessage,
//   confirmationData,
//   fetchUserData,
//   userData,
// }) => {
//   const [userDetails, setUserDetails] = useState(userData);
//   const [loading, setLoading] = useState(false);

//   // Effect to update user details when userData prop changes
//   React.useEffect(() => {
//     setUserDetails(userData);
//   }, [userData]);

//   const handleConfirm = async () => {
//     if (userDetails?.accountStatus === "Disable") {
//       // Show disabled account message pop-up
//       setOpenDisabledAccountDialog(true);
//       return; // Prevent further actions if account is disabled
//     }

//     setLoading(true); // Set loading to true when confirming
//     try {
//       await onConfirm(); // Call the onConfirm function passed from parent
//       setLoading(false); // Set loading to false regardless of success or error
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   // Function to get the message based on account status
//   const getStatusMessage = () => {
//     if (userDetails?.accountStatus === "Disable") {
//       return " Disabled";
//     }
//     // Add more conditions for other account status values if needed
//     return "Active"; // Default message if no specific condition matches
//   };

//   return (
//     <>
//       {loading && (
//         <div className="full-page-loading">
//           <FontAwesomeIcon icon={faSpinner} spin />
//         </div>
//       )}
//       <Dialog open={open && userDetails?.accountStatus !== "Disable"} onClose={onClose} fullWidth maxWidth="lg">
//         <DarkPaper>
//           <DialogTitle
//             sx={{
//               fontFamily: "Poppins",
//               fontWeight: "bold",
//               textAlign: "center",
//             }}
//           >
//             Are you sure you want to Terminate the user?
//           </DialogTitle>
//           <DialogContent dividers>
//             <>
//               <table id="information-table" className="section-content">
//                 <tbody>
//                   <tr>
//                     <th>Employee ID</th>
//                     <td>{userDetails?.employeeID || "N/A"}</td>
//                   </tr>
//                   <tr>
//                     <th>Name</th>
//                     <td>{userDetails?.name || "N/A"}</td>
//                   </tr>
//                   <tr>
//                     <th>Email</th>
//                     <td>{userDetails?.email || "N/A"}</td>
//                   </tr>
//                   <tr>
//                     <th>Account Status</th>
//                     <td>{getStatusMessage()}</td> {/* Render the status message */}
//                   </tr>
//                 </tbody>
//               </table>
//               <div className="message-box" style={{ textAlign: "center" }}>
//                 {executionMessage}
//               </div>
//             </>
//           </DialogContent>
//           <DialogActions style={{ justifyContent: "center" }}>
//             <Button
//               onClick={handleConfirm}
//               disabled={loading}
//               variant="contained"
//               color="primary"
//               sx={{
//                 fontFamily: "poppins",
//                 fontSize: "1em",
//                 padding: "12px 35px",
//               }}
//             >
//               {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "YES"}
//             </Button>
//             <Button
//               onClick={onClose}
//               variant="contained"
//               color="error"
//               sx={{
//                 fontFamily: "poppins",
//                 fontSize: "1em",
//                 padding: "12px 35px",
//               }}
//             >
//               NO
//             </Button>
//           </DialogActions>
//         </DarkPaper>
//       </Dialog>

//       <Dialog open={open && userDetails?.accountStatus === "Disable"} onClose={onClose} fullWidth maxWidth="lg">
//         <DarkPaper>
//           <DialogTitle
//             sx={{
//               fontFamily: "Poppins",
//               fontWeight: "bold",
//               textAlign: "center",
//             }}
//           >
//             User's account is disabled
//           </DialogTitle>
//           <DialogContent dividers>
//             <div style={{ textAlign: "center", margin: '20px', color: 'red' }}>
//               {/* <h3>User's account is disabled</h3> */}
//             </div>
//           </DialogContent>
//           <DialogActions style={{ justifyContent: "center" }}>
//             <Button
//               onClick={onClose}
//               variant="contained"
//               color="primary"
//               sx={{
//                 fontFamily: "poppins",
//                 fontSize: "1em",
//                 padding: "12px 35px",
//               }}
//             >
//               OK
//             </Button>
//           </DialogActions>
//         </DarkPaper>
//       </Dialog>
//     </>
//   );
// };

// export default ConfirmationDialog;
