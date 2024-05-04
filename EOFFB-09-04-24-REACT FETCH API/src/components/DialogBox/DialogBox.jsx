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

// const FinalConfirmationDialog = ({
//   open,
//   onClose,
//   confirmationData,
//   loading,
// }) => {
//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
//       <DialogTitle
//         sx={{ fontFamily: "Poppins", fontWeight: "Bold", borderRadius: "0px" }}
//       >
//         Completed
//       </DialogTitle>
//       <DialogContent dividers>
//             <div style={{ textAlign: "center" }}>
//               <p>User's account is Termineted</p>
//             </div>
//           </DialogContent>
//       <DialogActions>
//         <Button
//           onClick={onClose}
//           variant="contained"
//           color="error"
//           sx={{ fontFamily: "poppins", fontSize: "1em", padding: "12px 35px" }}>
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default FinalConfirmationDialog;





import React from "react";
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

// Custom styled Paper component for dark mode
const DarkPaper = styled(Paper)({
  backgroundColor: "#070808", // Dark background color
  color: "#fff", // White text color
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
});

const FinalConfirmationDialog = ({ open, onClose, confirmationData, loading }) => {
  const handleClose = () => {
    onClose(); // Close the dialog
    window.location.reload(); // Refresh the page
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle
        sx={{ fontFamily: "Poppins", fontWeight: "Bold", borderRadius: "0px" }}
      >
        Completed
      </DialogTitle>
      <DialogContent dividers>
        <div style={{ textAlign: "center" }}>
          <p>User's account is Terminated</p>
        </div>
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
