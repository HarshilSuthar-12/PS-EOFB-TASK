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

const FinalConfirmationDialog = ({
  open,
  onClose,
  confirmationData,
  loading,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle
        sx={{ fontFamily: "Poppins", fontWeight: "Bold", borderRadius: "0px" }}
      >
        User is Terminated!
      </DialogTitle>
      <DialogContent dividers>
        <DarkPaper>
        </DarkPaper>
      </DialogContent>
      <DialogActions>
        {/* <div className="execute-btn"> */}
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        {/* </div> */}
      </DialogActions>
    </Dialog>
  );
};

export default FinalConfirmationDialog;
