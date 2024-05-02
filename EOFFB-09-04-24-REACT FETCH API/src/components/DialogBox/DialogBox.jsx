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
        Final Confirmation
      </DialogTitle>
      <DialogContent dividers>
        <DarkPaper>
          <table id="information-table" className="section-content">
            <tbody>
              <tr>
                <th>Employee ID</th>
                <td>
                  {loading ? (
                    <CircularProgress size={20} />
                  ) : (
                    confirmationData?.employee_info?.employeeID || "N/A"
                  )}
                </td>
              </tr>
              <tr>
                <th>Name</th>
                <td>
                  {loading ? (
                    <CircularProgress size={20} />
                  ) : (
                    confirmationData?.employee_info?.name || "N/A"
                  )}
                </td>
              </tr>
              <tr>
                <th>Email</th>
                <td>
                  {loading ? (
                    <CircularProgress size={20} />
                  ) : (
                    confirmationData?.employee_info?.email || "N/A"
                  )}
                </td>
              </tr>
              <tr>
                <th>Account Status</th>
                <td>
                  {loading ? (
                    <CircularProgress size={20} />
                  ) : (
                    confirmationData?.employee_info?.accountStatus || "N/A"
                  )}
                </td>
              </tr>
              <tr>
                <th>Licenses</th>
                <td>
                  {loading ? (
                    <CircularProgress size={20} />
                  ) : (
                    <div>
                      {confirmationData?.employee_info?.licensesActiveStatus?.map(
                        (license, index) => (
                          <div key={index}>{license.name}</div>
                        )
                      )}
                      {confirmationData?.employee_info?.licensesActiveStatus
                        ?.length === 0 && <div>Licenses are removed</div>}
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <th>Groups</th>
                <td>
                  {loading ? (
                    <CircularProgress size={20} />
                  ) : (
                    <div>
                      {confirmationData?.employee_info?.groupsActiveStatus?.map(
                        (group, index) => (
                          <div key={index}>{group.name}</div>
                        )
                      )}
                      {confirmationData?.employee_info?.groupsActiveStatus
                        ?.length === 0 && <div>Groups are removed</div>}
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
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
