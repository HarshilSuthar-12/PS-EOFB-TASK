// import React from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress } from '@mui/material';
// import { styled } from '@mui/system';

// // Custom styled Paper component for dark mode
// const DarkPaper = styled('div')({
//   backgroundColor: '#070808', // Dark background color
//   color: '#fff', // White text color
//   boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//   padding: '20px',
//   borderRadius: '4px',
//   width: '800px', // Adjust width
//   maxHeight: '600px', // Adjust max height
//   overflow: 'hidden', // Hide overflow
// });

// const ConfirmationDialog = ({ open, onClose, onConfirm, executionMessage, loading, confirmationData, fetchUserData }) => {
//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg"> {/* Adjust maxWidth */}
//       <DarkPaper>
//         <DialogTitle sx={{ fontFamily: 'Poppins', fontWeight: 'bold', textAlign: 'center' }}>
//           Final Confirmation
//         </DialogTitle>
//         <DialogContent dividers>
//           <p style={{ textAlign: 'center', margin: '10px 0' }}>Are you sure you want to disable the user?</p>
//           {loading ? (
//             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//               <CircularProgress size={20} />
//             </div>
//           ) : (
//             <>
//               <table id="information-table" className="section-content">
//                 <tbody>
//                   <tr>
//                     <th>Employee ID</th>
//                     <td>{confirmationData?.employee_info?.employeeID || 'N/A'}</td>
//                   </tr>
//                   <tr>
//                     <th>Name</th>
//                     <td>{confirmationData?.employee_info?.name || 'N/A'}</td>
//                   </tr>
//                   <tr>
//                     <th>Email</th>
//                     <td>{confirmationData?.employee_info?.email || 'N/A'}</td>
//                   </tr>
//                   <tr>
//                     <th>Account Status</th>
//                     <td>{confirmationData?.employee_info?.accountStatus || 'N/A'}</td>
//                   </tr>
//                   <tr>
//                     <th>Licenses</th>
//                     <td>
//                       {confirmationData?.employee_info?.licensesActiveStatus?.map((license, index) => (
//                         <div key={index}>{license.name}</div>
//                       ))}
//                       {confirmationData?.employee_info?.licensesActiveStatus?.length === 0 && (
//                         <div>Licenses are removed</div>
//                       )}
//                     </td>
//                   </tr>
//                   <tr>
//                     <th>Groups</th>
//                     <td>
//                       {confirmationData?.employee_info?.groupsActiveStatus?.map((group, index) => (
//                         <div key={index}>{group.name}</div>
//                       ))}
//                       {confirmationData?.employee_info?.groupsActiveStatus?.length === 0 && (
//                         <div>Groups are removed</div>
//                       )}
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//               <div className="message-box" style={{ textAlign: 'center' }}>{executionMessage}</div>
//             </>
//           )}
//         </DialogContent>
//         <DialogActions style={{ justifyContent: 'center', paddingBottom: '20px' }}>
//           <Button onClick={onConfirm} disabled={loading} variant="contained" color="primary">
//             YES
//           </Button>
//           <Button onClick={onClose} disabled={loading} variant="contained" color="secondary">
//             NO
//           </Button>
//         </DialogActions>
//       </DarkPaper>
//     </Dialog>
//   );
// };

// export default ConfirmationDialog;





// import React from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress } from '@mui/material';
// import { styled } from '@mui/system';

// const DarkPaper = styled('div')({
//   backgroundColor: '#070808',
//   color: '#fff',
//   boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//   padding: '20px',
//   borderRadius: '4px',
//   width: '800px',
//   maxHeight: '600px',
//   overflow: 'hidden',
// });

// const ConfirmationDialog = ({ open, onClose, onConfirm, executionMessage, loading, confirmationData, fetchUserData }) => {
//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
//       <DarkPaper>
//         <DialogTitle sx={{ fontFamily: 'Poppins', fontWeight: 'bold', textAlign: 'center' }}>
//           Final Confirmation
//         </DialogTitle>
//         <DialogContent dividers>
//           <p style={{ textAlign: 'center', margin: '10px 0' }}>Are you sure you want to disable the user?</p>
//           {loading ? (
//             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//               <CircularProgress size={20} />
//             </div>
//           ) : (
//             <>
//               <table id="information-table" className="section-content">
//                 <tbody>
//                   <tr>
//                     <th>Employee ID</th>
//                     <td>{confirmationData?.employee_info?.employeeID || 'N/A'}</td>
//                   </tr>
//                   <tr>
//                     <th>Name</th>
//                     <td>{confirmationData?.employee_info?.name || 'N/A'}</td>
//                   </tr>
//                   <tr>
//                     <th>Email</th>
//                     <td>{confirmationData?.employee_info?.email || 'N/A'}</td>
//                   </tr>
//                   <tr>
//                     <th>Account Status</th>
//                     <td>{confirmationData?.employee_info?.accountStatus || 'N/A'}</td>
//                   </tr>
//                   <tr>
//                     <th>Licenses</th>
//                     <td>
//                       {confirmationData?.employee_info?.licensesActiveStatus?.map((license, index) => (
//                         <div key={index}>{license.name}</div>
//                       ))}
//                       {confirmationData?.employee_info?.licensesActiveStatus?.length === 0 && (
//                         <div>Licenses are removed</div>
//                       )}
//                     </td>
//                   </tr>
//                   <tr>
//                     <th>Groups</th>
//                     <td>
//                       {confirmationData?.employee_info?.groupsActiveStatus?.map((group, index) => (
//                         <div key={index}>{group.name}</div>
//                       ))}
//                       {confirmationData?.employee_info?.groupsActiveStatus?.length === 0 && (
//                         <div>Groups are removed</div>
//                       )}
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//               <div className="message-box" style={{ textAlign: 'center' }}>{executionMessage}</div>
//             </>
//           )}
//         </DialogContent>
//         <DialogActions style={{ justifyContent: 'center', paddingBottom: '20px' }}>
//           <Button onClick={onConfirm} disabled={loading} variant="contained" color="primary">
//             YES
//           </Button>
//           <Button onClick={onClose} disabled={loading} variant="contained" color="secondary">
//             NO
//           </Button>
//         </DialogActions>
//       </DarkPaper>
//     </Dialog>
//   );
// };

// export default ConfirmationDialog;





import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import { useState, useEffect } from 'react';

// Custom styled Paper component for dark mode
const DarkPaper = styled('div')({
    backgroundColor: '#070808', // Dark background color
    color: '#fff', // White text color
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    // padding: '20px',
    borderRadius: '4px',
    // width: '100%', // Full width
    maxHeight: '90vh', // Adjusted maximum height
    overflow: 'hidden', // Hide overflow to remove scrollbar
});

const ConfirmationDialog = ({ open, onClose, onConfirm, executionMessage, loading, confirmationData, fetchUserData, userData }) => {
  const [userDetails, setUserDetails] = useState(userData);

  useEffect(() => {
    if (userData) {
      setUserDetails(userData);
      console.log("UserData", userData);
    }
  }, [userData]);
  console.log("userDetails", userDetails);
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DarkPaper>
        <DialogTitle sx={{ fontFamily: 'Poppins', fontWeight: 'bold', textAlign: 'center' }}>
        Are you sure you want to disable the user?
        </DialogTitle>
        <DialogContent dividers>
          {/* <p style={{ textAlign: 'center', margin: '10px 0' }}>Are you sure you want to disable the user?</p> */}
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress size={20} />
            </div>
          ) : (
            <>
              <table id="information-table" className="section-content">
                <tbody>
                  <tr>
                    <th>Employee ID</th>
                    <td>{userDetails?.employeeID || 'N/A'}</td>
                  </tr>
                  <tr>
                    <th>Name</th>
                    <td>{userDetails?.name || 'N/A'}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{userDetails?.email || 'N/A'}</td>
                  </tr>
                  <tr>
                    <th>Account Status</th>
                    <td>{userDetails?.accountStatus || 'N/A'}</td>
                  </tr>
                  <tr>
                    <th>Licenses</th>
                    <td>
                      {userDetails?.licensesActiveStatus?.map((license, index) => (
                        <div key={index}>{license.name}</div>
                      ))}
                      {userDetails?.licensesActiveStatus?.length === 0 && (
                        // <div>Licences are removed</div>
                        <div>{userDetails?.licensesActiveStatus?.name || "N/A"}</div>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>Groups</th>
                    <td>
                      {userDetails?.groupsActiveStatus?.map((group, index) => (
                        <div key={index}>{group.name}</div>
                      ))}
                      {userDetails?.groupsActiveStatus?.length === 0 && (
                        // <div>Groups are removed</div>
                        <div>{userDetails?.groupsActiveStatus?.name   || "N/A"}</div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="message-box" style={{ textAlign: 'center' }}>{executionMessage}</div>
            </>
          )}
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center', paddingBottom: '20px' }}>
          <Button onClick={onConfirm} disabled={loading} variant="contained" color="primary" sx={{  fontFamily: "poppins", fontSize: '1em', padding: '12px 45px' }} >
            YES
          </Button>
          <Button onClick={onClose} disabled={loading} variant="contained" color="error" sx={{  fontFamily: "poppins", fontSize: '1em', padding: '12px 45px' }}>
            NO
          </Button>
        </DialogActions>
      </DarkPaper>
    </Dialog>
  );
};

export default ConfirmationDialog;



