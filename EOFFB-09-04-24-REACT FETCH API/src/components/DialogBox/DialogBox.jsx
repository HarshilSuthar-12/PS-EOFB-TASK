

// import React from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Paper,
// } from "@mui/material"; // Import Material-UI components
// import { styled } from "@mui/system"; // Import styled function for custom styling
// import "../css/Globals.css";
// import { CircularProgress } from "@mui/material";

// // Custom styled Paper component for dark mode
// const DarkPaper = styled(Paper)({
//   backgroundColor: "#070808", // Dark background color
//   color: "#fff", // White text color
//   boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
// });

// const FinalConfirmationDialog = ({ open, onClose, confirmationData, loading }) => {
//   const handleClose = () => {
//     onClose(); // Close the dialog
//     // window.location.reload(); // Refresh the page
//   };

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
//       <DialogTitle
//         sx={{ fontFamily: "Poppins", fontWeight: "Bold", borderRadius: "0px" }}
//       >
//         Completed
//       </DialogTitle>
//       <DialogContent dividers>
//         <div style={{ textAlign: "center" }}>
//           <p>User's account is Terminated</p>
//         </div>
//       </DialogContent>
//       <DialogActions>
//         <Button
//           onClick={handleClose} // Call handleClose function on button click
//           variant="contained"
//           color="error"
//           sx={{ fontFamily: "poppins", fontSize: "1em", padding: "12px 35px" }}
//         >
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default FinalConfirmationDialog;



// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Paper,
// } from "@mui/material"; // Import Material-UI components
// import { styled } from "@mui/system"; // Import styled function for custom styling
// import "../css/Globals.css";
// import { CircularProgress } from "@mui/material";

// // Custom styled Paper component for dark mode
// const DarkPaper = styled(Paper)({
//   backgroundColor: "#070808", // Dark background color
//   color: "#fff", // White text color
//   boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
// });




// const FinalConfirmationDialog = ({ open, onClose, confirmationData, loading }) => {
//   const handleClose = () => {
//     onClose(); // Close the dialog
//     // window.location.reload(); // Refresh the page
//   };

  
//   const [domains, setDomains] = useState({
//     "Disable account": true,
//     "Move to OU": true,
//     "Removed Groups": true,
//     "Removed Licences": true,
//     "Convert to shared mailbox": true,
//     "Set out office": true,
//     "Deligate to manager": true,
//   });

//   const handleCheckboxChange = (event) => {
//     const { name, checked } = event.target;
//     setDomains({ ...domains, [name]: checked });
//   };



//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
//       <DialogTitle
//         sx={{ fontFamily: "Poppins", fontWeight: "Bold", borderRadius: "3px" }}>
//         Completed
//       </DialogTitle>
//       <DialogContent dividers>
//         <div style={{ textAlign: "center" }}>
//           <p>User's account is Terminated</p>
//         </div>
//         </DialogContent>
//         <DialogContent >
//         <div className="checkbox-options-confirm">
//           <label>
//             <input
//               type="checkbox"
//               name="Disable account"
//               checked={domains["Disable account"]}
//               onChange={handleCheckboxChange}
//             />
//             Disable account
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="Move to OU"
//               checked={domains["Move to OU"]}
//               onChange={handleCheckboxChange}
//             />
//             Move to OU
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="Removed Groups"
//               checked={domains["Removed Groups"]}
//               onChange={handleCheckboxChange}
//             />
//             Removed Groups
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="Removed Licences"
//               checked={domains["Removed Licences"]}
//               onChange={handleCheckboxChange}
//             />
//             Removed Licences
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="Convert to shared mailbox"
//               checked={domains["Convert to shared mailbox"]}
//               onChange={handleCheckboxChange}
//             />
//             Convert to shared mailbox
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="Set out office"
//               checked={domains["Set out office"]}
//               onChange={handleCheckboxChange}
//             />
//             Set out office
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="Deligate to manager"
//               checked={domains["Deligate to manager"]}
//               onChange={handleCheckboxChange}
//             />
//             Deligate to manager
//           </label>
//         </div>
//       </DialogContent>
//       <DialogActions>
//         <Button
//           onClick={handleClose} // Call handleClose function on button click
//           variant="contained"
//           color="error"
//           sx={{ fontFamily: "poppins", fontSize: "1em", padding: "12px 35px" }}
//         >
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default FinalConfirmationDialog;




import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Paper,
} from "@mui/material"; // Import Material-UI components
import { styled } from "@mui/system"; // Import styled function for custom styling
import "../css/Globals.css";
import { CircularProgress } from "@mui/material";


const FinalConfirmationDialog = ({ open, onClose, confirmationData, loading }) => {
  const handleClose = () => {
    onClose(); // Close the dialog
    // window.location.reload(); // Refresh the page
  };

  const [domains, setDomains] = useState({
    "Disable account": false,
    "Move to OU": false,
    "Removed Groups": false,
    "Removed Licences": false,
    "Convert to shared mailbox": false,
    "Set out office": false,
    "Deligate to manager": false,
  });

  const [currentCheckboxIndex, setCurrentCheckboxIndex] = useState(-1); // Start with -1 to indicate no checkbox is being shown

  // useEffect(() => {
  //   if (currentCheckboxIndex < Object.keys(domains).length) {
  //     const timer = setTimeout(() => {
  //       setCurrentCheckboxIndex(currentCheckboxIndex + 1);
  //     }, 2000); // Change the delay time here (in milliseconds)
  //     return () => clearTimeout(timer);
  //   } else {
  //     // All checkboxes have been shown, update all domains to true
  //     setDomains((prevDomains) => {
  //       const updatedDomains = {};
  //       for (const domain in prevDomains) {
  //         updatedDomains[domain] = true;
  //       }
  //       return updatedDomains;
  //     });
  //   }
  // }, [currentCheckboxIndex, domains]);


  useEffect(() => {
    if (currentCheckboxIndex < Object.keys(domains).length) {
      const timer = setTimeout(() => {
        setCurrentCheckboxIndex(currentCheckboxIndex + 1);
      }, 2000); // Change the delay time here (in milliseconds)
      return () => clearTimeout(timer);
    }
  }, [currentCheckboxIndex, domains]);
  
  useEffect(() => {
    if (currentCheckboxIndex >= Object.keys(domains).length) {
      // All checkboxes have been shown, update all domains to true
      setDomains((prevDomains) => {
        const updatedDomains = {};
        for (const domain in prevDomains) {
          updatedDomains[domain] = true;
        }
        return updatedDomains;
      });
    }
  }, [currentCheckboxIndex, domains]);
  
  



  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle
        sx={{ fontFamily: "Poppins", fontWeight: "Bold", borderRadius: "3px" }}
      >
        Completed
      </DialogTitle>
      <DialogContent dividers>
        <div style={{ textAlign: "center" }}>
          {currentCheckboxIndex >= 0 && currentCheckboxIndex < Object.keys(domains).length ? (
            <p>Processing: {Object.keys(domains)[currentCheckboxIndex]}</p>
          ) : (
            <p>User's account is Terminated</p>
          )}
        </div>
      </DialogContent>
      <DialogContent>
        <div className="checkbox-options-confirm">
          {Object.entries(domains).map(([domain, checked], index) => (
            <label key={domain}>
              <input
                type="checkbox"
                name={domain}
                checked={checked}
                onChange={() => {}} // No need for onChange handler
                disabled={index > currentCheckboxIndex} // Disable checkbox if its index is greater than currentCheckboxIndex
              />
              {domain}
            </label>
          ))}
        </div>
        {loading && (
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <CircularProgress />
          </div>
        )}
      </DialogContent>  
      <DialogActions>
        <Button
          onClick={handleClose} // Call handleClose function on button click
          variant="contained"
          color="error"
          sx={{ fontFamily: "poppins", fontSize: "1em", padding: "12px 35px" }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FinalConfirmationDialog;
