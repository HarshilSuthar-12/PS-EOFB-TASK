// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Button,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     TextField,
//     Grid,
// } from "@mui/material";

// const LogViewer = () => {
//     const [logs, setLogs] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [parsedLogs, setParsedLogs] = useState(null);
//     const [startDate, setStartDate] = useState("");
//     const [endDate, setEndDate] = useState("");
//     const [startTime, setStartTime] = useState("");
//     const [endTime, setEndTime] = useState("");
//     const [filteredLogs, setFilteredLogs] = useState(null);

//     useEffect(() => {
//         // Fetch log data from the backend when the component mounts
//         axios.get('/api/logs')
//             .then(response => {
//                 setLogs(response.data.logs);
//                 parseLogs(response.data.logs);
//             })
//             .catch(error => {
//                 console.error('Error fetching logs:', error);
//             });
//     }, []);

//     const parseLogs = (logs) => {
//         const parsed = logs.map(log => {
//             // Assuming log format is 'timestamp - module - log level - message'
//             const parts = log.split(' - ');
//             return {
//                 timestamp: parts[0],
//                 module: parts[1],
//                 level: parts[2],
//                 message: parts.slice(3).join(' - '), // Join remaining parts as message
//             };
//         });
//         setParsedLogs(parsed);
//         setFilteredLogs(parsed);
//     };

//     const filterLogs = () => {
//         const filtered = parsedLogs.filter(log => {
//             const logTimestamp = new Date(log.timestamp);
//             const startDateTime = new Date(startDate + "T" + startTime);
//             const endDateTime = new Date(endDate + "T" + endTime);

//             return logTimestamp >= startDateTime && logTimestamp <= endDateTime;
//         });

//         setFilteredLogs(filtered);
//     };

//     const clearFilters = () => {
//         setStartDate("");
//         setEndDate("");
//         setStartTime("");
//         setEndTime("");
//         setFilteredLogs(parsedLogs);
//     };

//     const handleStartDateChange = (e) => {
//         const selectedDate = new Date(e.target.value);
//         if (selectedDate > new Date(endDate)) {
//             setEndDate(e.target.value);
//         }
//         setStartDate(e.target.value);
//     };

//     const handleEndDateChange = (e) => {
//         const selectedDate = new Date(e.target.value);
//         if (selectedDate < new Date(startDate)) {
//             setStartDate(e.target.value);
//         }
//         setEndDate(e.target.value);
//     };

//     const handleStartTimeChange = (e) => {
//         const selectedTime = e.target.value;
//         if (selectedTime > endTime) {
//             setEndTime(selectedTime);
//         }
//         setStartTime(selectedTime);
//     };

//     const handleEndTimeChange = (e) => {
//         const selectedTime = e.target.value;
//         if (selectedTime < startTime) {
//             setStartTime(selectedTime);
//         }
//         setEndTime(selectedTime);
//     };

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     return (
//         <div>
//             <h2 style={{ fontFamily: "Poppins", fontWeight: 'bolder' , marginBottom: "20px" }}>Log Viewer</h2>
//             <Button variant="contained" color="primary" onClick={handleClickOpen}>
//                 View Logs
//             </Button>
//             <Dialog open={open} onClose={handleClose} fullWidth>
//                 <DialogTitle style={{ fontFamily: "Poppins" }}>Log Viewer</DialogTitle>
//                 <DialogContent>
//                     <Grid container spacing={2}>
//                         <Grid item xs={6}>
//                             <TextField
//                                 label="Start Date"
//                                 type="date"
//                                 value={startDate}
//                                 onChange={handleStartDateChange}
//                                 InputLabelProps={{
//                                     shrink: true,
//                                 }}
//                                 fullWidth
//                             />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField
//                                 label="End Date"
//                                 type="date"
//                                 value={endDate}
//                                 onChange={handleEndDateChange}
//                                 InputLabelProps={{
//                                     shrink: true,
//                                 }}
//                                 fullWidth
//                             />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField
//                                 label="Start Time"
//                                 type="time"
//                                 value={startTime}
//                                 onChange={handleStartTimeChange}
//                                 InputLabelProps={{
//                                     shrink: true,
//                                 }}
//                                 fullWidth
//                             />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField
//                                 label="End Time"
//                                 type="time"
//                                 value={endTime}
//                                 onChange={handleEndTimeChange}
//                                 InputLabelProps={{
//                                     shrink: true,
//                                 }}
//                                 fullWidth
//                             />
//                         </Grid>
//                     </Grid>
//                     <div className='log-btn'>
//                     <Button variant="outlined" color="primary" onClick={filterLogs} style={{ marginTop: "20px", marginRight: "10px" }}>
//                         Apply Filters
//                     </Button>
//                     <Button variant="outlined" color="secondary" onClick={clearFilters} style={{ marginTop: "20px" }}>
//                         Clear Filters
//                     </Button>
//                     </div>
//                     {filteredLogs !== null ? (
//                         filteredLogs.length > 0 ? (
//                             <TableContainer component={Paper} style={{ marginTop: "20px" }}>
//                                 <Table>
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell style={{ fontFamily: "Poppins", fontWeight: "bold" }}>Timestamp</TableCell>
//                                             <TableCell style={{ fontFamily: "Poppins", fontWeight: "bold" }}>Module</TableCell>
//                                             <TableCell style={{ fontFamily: "Poppins", fontWeight: "bold" }}>Level</TableCell>
//                                             <TableCell style={{ fontFamily: "Poppins", fontWeight: "bold" }}>Message</TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {filteredLogs.map((log, index) => (
//                                             <TableRow key={index}>
//                                                 <TableCell style={{ fontFamily: "Poppins" }}>{log.timestamp}</TableCell>
//                                                 <TableCell style={{ fontFamily: "Poppins" }}>{log.module}</TableCell>
//                                                 <TableCell style={{ fontFamily: "Poppins" }}>{log.level}</TableCell>
//                                                 <TableCell style={{ fontFamily: "Poppins" }}>{log.message}</TableCell>
//                                             </TableRow>
//                                         ))}
//                                     </TableBody>
//                                 </Table>
//                             </TableContainer>
//                         ) : (
//                             <p style={{ fontFamily: "Poppins", marginTop: "20px" }}>No logs available</p>
//                         )
//                     ) : (
//                         <p style={{ fontFamily: "Poppins", marginTop: "20px" }}>Loading...</p>
//                     )}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="primary">
//                         Close
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// };

// export default LogViewer;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Button,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     TextField,
//     Grid,
// } from "@mui/material";

// const LogViewer = () => {
//     const [logs, setLogs] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [parsedLogs, setParsedLogs] = useState(null);
//     const [startDate, setStartDate] = useState("");
//     const [endDate, setEndDate] = useState("");
//     const [startTime, setStartTime] = useState("");
//     const [endTime, setEndTime] = useState("");
//     const [filteredLogs, setFilteredLogs] = useState(null);

//     useEffect(() => {
//         // Fetch log data from the backend when the component mounts
//         axios.get('/api/logs')
//             .then(response => {
//                 setLogs(response.data.logs);
//                 parseLogs(response.data.logs);
//             })
//             .catch(error => {
//                 console.error('Error fetching logs:', error);
//                 // If API call fails, use demo data
//                 setLogs(demoLogs); // Assuming demoLogs is defined elsewhere
//                 parseLogs(demoLogs);
//             });
//     }, []);

//     const demoLogs = [
//         "2024-05-07 14:21:24,148 - msgraph-backend - DEBUG - Successfully removed testuser@productsquads.co from group ProductSquads Technolabs LLP",
//         // Add more demo log entries as needed
//     ];

//     const parseLogs = (logs) => {
//         const parsed = logs.map(log => {
//             // Assuming log format is 'timestamp - module - log level - message'
//             const parts = log.split(' - ');
//             return {
//                 timestamp: parts[0],
//                 module: parts[1],
//                 level: parts[2],
//                 message: parts.slice(3).join(' - '), // Join remaining parts as message
//             };
//         });
//         setParsedLogs(parsed);
//         setFilteredLogs(parsed);
//     };

//     const filterLogs = () => {
//         const filtered = parsedLogs.filter(log => {
//             const logTimestamp = new Date(log.timestamp);
//             const startDateTime = new Date(startDate + "T" + startTime);
//             const endDateTime = new Date(endDate + "T" + endTime);

//             return logTimestamp >= startDateTime && logTimestamp <= endDateTime;
//         });

//         setFilteredLogs(filtered);
//     };

//     const clearFilters = () => {
//         setStartDate("");
//         setEndDate("");
//         setStartTime("");
//         setEndTime("");
//         setFilteredLogs(parsedLogs);
//     };

//     const handleStartDateChange = (e) => {
//         const selectedDate = new Date(e.target.value);
//         if (selectedDate > new Date(endDate)) {
//             setEndDate(e.target.value);
//         }
//         setStartDate(e.target.value);
//     };

//     const handleEndDateChange = (e) => {
//         const selectedDate = new Date(e.target.value);
//         if (selectedDate < new Date(startDate)) {
//             setStartDate(e.target.value);
//         }
//         setEndDate(e.target.value);
//     };

//     const handleStartTimeChange = (e) => {
//         const selectedTime = e.target.value;
//         if (selectedTime > endTime) {
//             setEndTime(selectedTime);
//         }
//         setStartTime(selectedTime);
//     };

//     const handleEndTimeChange = (e) => {
//         const selectedTime = e.target.value;
//         if (selectedTime < startTime) {
//             setStartTime(selectedTime);
//         }
//         setEndTime(selectedTime);
//     };

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     return (
//         <div>
//             <h2 style={{ fontFamily: "Poppins", fontWeight: 'bolder', marginBottom: "20px" }}>Log Viewer</h2>
//             <Button variant="contained" color="primary" onClick={handleClickOpen}>
//                 View Logs
//             </Button>
//             <Dialog open={open} onClose={handleClose} fullWidth>
//                 <DialogTitle style={{ fontFamily: "Poppins" }}>Log Viewer</DialogTitle>
//                 <DialogContent>
//                     <Grid container spacing={2}>
//                         <Grid item xs={6}>
//                             <TextField
//                                 label="Start Date"
//                                 type="date"
//                                 value={startDate}
//                                 onChange={handleStartDateChange}
//                                 InputLabelProps={{
//                                     shrink: true,
//                                 }}
//                                 fullWidth
//                             />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField
//                                 label="End Date"
//                                 type="date"
//                                 value={endDate}
//                                 onChange={handleEndDateChange}
//                                 InputLabelProps={{
//                                     shrink: true,
//                                 }}
//                                 fullWidth
//                             />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField
//                                 label="Start Time"
//                                 type="time"
//                                 value={startTime}
//                                 onChange={handleStartTimeChange}
//                                 InputLabelProps={{
//                                     shrink: true,
//                                 }}
//                                 fullWidth
//                             />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField
//                                 label="End Time"
//                                 type="time"
//                                 value={endTime}
//                                 onChange={handleEndTimeChange}
//                                 InputLabelProps={{
//                                     shrink: true,
//                                 }}
//                                 fullWidth
//                             />
//                         </Grid>
//                     </Grid>
//                     <div className='log-btn'>
//                         <Button variant="outlined" color="primary" onClick={filterLogs} style={{ marginTop: "20px", marginRight: "10px" }}>
//                             Apply Filters
//                         </Button>
//                         <Button variant="outlined" color="secondary" onClick={clearFilters} style={{ marginTop: "20px" }}>
//                             Clear Filters
//                         </Button>
//                     </div>
//                     {filteredLogs !== null ? (
//                         filteredLogs.length > 0 ? (
//                             <TableContainer component={Paper} style={{ marginTop: "20px" }}>
//                                 <Table>
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell style={{ fontFamily: "Poppins", fontWeight: "bold" }}>Timestamp</TableCell>
//                                             <TableCell style={{ fontFamily: "Poppins", fontWeight: "bold" }}>Module</TableCell>
//                                             <TableCell style={{ fontFamily: "Poppins", fontWeight: "bold" }}>Level</TableCell>
//                                             <TableCell style={{ fontFamily: "Poppins", fontWeight: "bold" }}>Message</TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {filteredLogs.map((log, index) => (
//                                             <TableRow key={index}>
//                                                 <TableCell style={{ fontFamily: "Poppins" }}>{log.timestamp}</TableCell>
//                                                 <TableCell style={{ fontFamily: "Poppins" }}>{log.module}</TableCell>
//                                                 <TableCell style={{ fontFamily: "Poppins" }}>{log.level}</TableCell>
//                                                 <TableCell style={{ fontFamily: "Poppins" }}>{log.message}</TableCell>
//                                             </TableRow>
//                                         ))}
//                                     </TableBody>
//                                 </Table>
//                             </TableContainer>
//                         ) : (
//                             <p style={{ fontFamily: "Poppins", marginTop: "20px" }}>No logs available</p>
//                         )
//                     ) : (
//                         <p style={{ fontFamily: "Poppins", marginTop: "20px" }}>Loading...</p>
//                     )}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="primary">
//                         Close
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// };

// export default LogViewer;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Button,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     TextField,
//     Grid,
// } from "@mui/material";

// const LogViewer = ({ userDetails }) => {
//     const [logs, setLogs] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [parsedLogs, setParsedLogs] = useState(null);
//     const [startDate, setStartDate] = useState("");
//     const [endDate, setEndDate] = useState("");
//     const [startTime, setStartTime] = useState("");
//     const [endTime, setEndTime] = useState("");
//     const [filteredLogs, setFilteredLogs] = useState(null);

//     useEffect(() => {
//         // Fetch log data from the backend when the component mounts
//         axios.get('/api/logs')
//             .then(response => {
//                 setLogs(response.data.logs);
//                 parseLogs(response.data.logs);
//             })
//             .catch(error => {
//                 console.error('Error fetching logs:', error);
//                 // If API call fails, use demo data
//                 setLogs(demoLogs); // Assuming demoLogs is defined elsewhere
//                 parseLogs(demoLogs);
//             });
//     }, []);

//     const demoLogs = [
//         "2024-05-07 14:21:24,148 - msgraph-backend - DEBUG - Successfully removed testuser@productsquads.co from group ProductSquads Technolabs LLP",
//         // Add more demo log entries as needed
//     ];

//     const parseLogs = (logs) => {
//         const parsed = logs.map(log => {
//             // Assuming log format is 'timestamp - module - log level - message'
//             const parts = log.split(' - ');
//             return {
//                 timestamp: parts[0],
//                 module: parts[1],
//                 level: parts[2],
//                 message: parts.slice(3).join(' - '), // Join remaining parts as message
//             };
//         });
//         setParsedLogs(parsed);
//         setFilteredLogs(parsed);
//     };

//     const getStatusMessage = () => {
//         // Logic to determine the account status message
//         // You can replace this with your actual logic
//         return userDetails?.accountStatus === "active" ? "Active" : "Inactive";
//     };

//     const filterLogs = () => {
//         const filtered = parsedLogs.filter(log => {
//             const logTimestamp = new Date(log.timestamp);
//             const startDateTime = new Date(startDate + "T" + startTime);
//             const endDateTime = new Date(endDate + "T" + endTime);

//             return logTimestamp >= startDateTime && logTimestamp <= endDateTime;
//         });

//         setFilteredLogs(filtered);
//     };

//     const clearFilters = () => {
//         setStartDate("");
//         setEndDate("");
//         setStartTime("");
//         setEndTime("");
//         setFilteredLogs(parsedLogs);
//     };

//     const handleStartDateChange = (e) => {
//         const selectedDate = new Date(e.target.value);
//         if (selectedDate > new Date(endDate)) {
//             setEndDate(e.target.value);
//         }
//         setStartDate(e.target.value);
//     };

//     const handleEndDateChange = (e) => {
//         const selectedDate = new Date(e.target.value);
//         if (selectedDate < new Date(startDate)) {
//             setStartDate(e.target.value);
//         }
//         setEndDate(e.target.value);
//     };

//     const handleStartTimeChange = (e) => {
//         const selectedTime = e.target.value;
//         if (selectedTime > endTime) {
//             setEndTime(selectedTime);
//         }
//         setStartTime(selectedTime);
//     };

//     const handleEndTimeChange = (e) => {
//         const selectedTime = e.target.value;
//         if (selectedTime < startTime) {
//             setStartTime(selectedTime);
//         }
//         setEndTime(selectedTime);
//     };

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     return (
//         <div className='con'>
//             <h2 style={{ fontFamily: "Poppins", fontWeight: 'bolder', marginBottom: "20px" }}><i class="fa-solid fa-microchip"></i>Log Viewer</h2>
//             <Button variant="contained" color="primary" onClick={handleClickOpen}>
//                 View Logs
//             </Button>
//             <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
//                <DialogTitle style={{ fontFamily: "Poppins" }}> <i class="fa-solid fa-microchip"></i> Log Viewer</DialogTitle>
//                 <DialogContent>
//                     <Grid container spacing={2}>
//                         <Grid item xs={6}>
//                             <TextField
//                                 label="Start Date"
//                                 type="date"
//                                 value={startDate}
//                                 onChange={handleStartDateChange}
//                                 InputLabelProps={{
//                                     shrink: true,
//                                 }}
//                                 fullWidth
//                             />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField
//                                 label="End Date"
//                                 type="date"
//                                 value={endDate}
//                                 onChange={handleEndDateChange}
//                                 InputLabelProps={{
//                                     shrink: true,
//                                 }}
//                                 fullWidth
//                             />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField
//                                 label="Start Time"
//                                 type="time"
//                                 value={startTime}
//                                 onChange={handleStartTimeChange}
//                                 InputLabelProps={{
//                                     shrink: true,
//                                 }}
//                                 fullWidth
//                             />
//                         </Grid>
//                         <Grid item xs={6}>
//                             <TextField
//                                 label="End Time"
//                                 type="time"
//                                 value={endTime}
//                                 onChange={handleEndTimeChange}
//                                 InputLabelProps={{
//                                     shrink: true,
//                                 }}
//                                 fullWidth
//                             />
//                         </Grid>
//                     </Grid>
//                     <div className='log-btn'>
//                         <Button variant="outlined" color="primary" onClick={filterLogs} style={{ marginTop: "20px", marginRight: "10px" }}>
//                             Apply Filters
//                         </Button>
//                         <Button variant="outlined" color="secondary" onClick={clearFilters} style={{ marginTop: "20px" }}>
//                             Clear Filters
//                         </Button>
//                     </div>
//                     {filteredLogs !== null ? (
//                         filteredLogs.length > 0 ? (
//                             <TableContainer component={Paper} style={{ marginTop: "20px" }}>
//                                 <Table>
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell style={{ fontFamily: "Poppins", fontWeight: "bold" }}>Timestamp</TableCell>
//                                             <TableCell style={{ fontFamily: "Poppins", fontWeight: "bold" }}>Module</TableCell>
//                                             <TableCell style={{ fontFamily: "Poppins", fontWeight: "bold" }}>Level</TableCell>
//                                             <TableCell style={{ fontFamily: "Poppins", fontWeight: "bold" }}>Message</TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {filteredLogs.map((log, index) => (
//                                             <TableRow key={index}>
//                                                 <TableCell style={{ fontFamily: "Poppins" }}>{log.timestamp}</TableCell>
//                                                 <TableCell style={{ fontFamily: "Poppins" }}>{log.module}</TableCell>
//                                                 <TableCell style={{ fontFamily: "Poppins" }}>{log.level}</TableCell>
//                                                 <TableCell style={{ fontFamily: "Poppins" }}>{log.message}</TableCell>
//                                             </TableRow>
//                                         ))}
//                                     </TableBody>
//                                 </Table>
//                             </TableContainer>
//                         ) : (
//                             <p style={{ fontFamily: "Poppins", marginTop: "20px" }}>No logs available</p>
//                         )
//                     ) : (
//                         <p style={{ fontFamily: "Poppins", marginTop: "20px" }}>Loading...</p>
//                     )}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="primary">
//                         Close
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// };

// export default LogViewer;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Grid,
// } from "@mui/material";

// const LogViewer = ({ userDetails }) => {
//   const [logs, setLogs] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [parsedLogs, setParsedLogs] = useState(null);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [filteredLogs, setFilteredLogs] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = () => {
//     setLoading(true);
//     axios
//       .get(f`http://127.0.0.1:8000/log/logs/${filename}`)
//       .then((response) => {
//         setLogs(response.data.logs);
//         parseLogs(response.data.logs);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching logs:", error);
//         setLoading(false);
//         // If API call fails, use demo data
//         setLogs(demoLogs);
//         parseLogs(demoLogs);
//       });
//   };

//   const demoLogs = [
//     "2024-05-07 14:21:24,148 - msgraph-backend - DEBUG - Successfully removed testuser@productsquads.co from group ProductSquads Technolabs LLP",
//     // Add more demo log entries as needed
//   ];

//   const parseLogs = (logs) => {
//     const parsed = logs.map((log) => {
//       const parts = log.split(" - ");
//       return {
//         timestamp: parts[0],
//         module: parts[1],
//         level: parts[2],
//         message: parts.slice(3).join(" - "),
//       };
//     });
//     setParsedLogs(parsed);
//     setFilteredLogs(parsed);
//   };

//   const getStatusMessage = () => {
//     return userDetails?.accountStatus === "active" ? "Active" : "Inactive";
//   };

//   const filterLogs = () => {
//     if (!loading) {
//       const filtered = parsedLogs.filter((log) => {
//         const logTimestamp = new Date(log.timestamp);
//         const startDateTime = new Date(startDate + "T" + startTime);
//         const endDateTime = new Date(endDate + "T" + endTime);

//         return logTimestamp >= startDateTime && logTimestamp <= endDateTime;
//       });

//       setFilteredLogs(filtered);
//     }
//   };

//   const clearFilters = () => {
//     if (!loading) {
//       setStartDate("");
//       setEndDate("");
//       setStartTime("");
//       setEndTime("");
//       setFilteredLogs(parsedLogs);
//     }
//   };

//   const handleStartDateChange = (e) => {
//     if (!loading) {
//       const selectedDate = new Date(e.target.value);
//       if (selectedDate > new Date(endDate)) {
//         setEndDate(e.target.value);
//       }
//       setStartDate(e.target.value);
//     }
//   };

//   const handleEndDateChange = (e) => {
//     if (!loading) {
//       const selectedDate = new Date(e.target.value);
//       if (selectedDate < new Date(startDate)) {
//         setStartDate(e.target.value);
//       }
//       setEndDate(e.target.value);
//     }
//   };

//   const handleStartTimeChange = (e) => {
//     if (!loading) {
//       const selectedTime = e.target.value;
//       if (selectedTime > endTime) {
//         setEndTime(selectedTime);
//       }
//       setStartTime(selectedTime);
//     }
//   };

//   const handleEndTimeChange = (e) => {
//     if (!loading) {
//       const selectedTime = e.target.value;
//       if (selectedTime < startTime) {
//         setStartTime(selectedTime);
//       }
//       setEndTime(selectedTime);
//     }
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div className="con">
//       <h2
//         style={{
//           fontFamily: "Poppins",
//           fontWeight: "bolder",
//           marginBottom: "20px",
//         }}
//       >
//         <i class="fa-solid fa-microchip"></i>Log Viewer
//       </h2>
//       {/* <Button variant="contained" color="primary" onClick={handleClickOpen} disabled={loading}>
//                 View Logs
//             </Button> */}
//       <Button
//         onClick={handleClickOpen}
//         disabled={loading}
//         variant="contained"
//         color="warning"
//         sx={{
//           fontFamily: "Poppins",
//           fontSize: "0.8em",
//           padding: "10px 25px",
//           textTransform: "capitalize",
//         }}
//       >
//         View Logs
//       </Button>
//       <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
//         <DialogTitle style={{ fontFamily: "Poppins" }}>
//           {" "}
//           <i class="fa-solid fa-microchip"></i> Log Viewer
//         </DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2}>
//             <Grid item xs={6}>
//               <TextField
//                 label="Start Date"
//                 type="date"
//                 value={startDate}
//                 onChange={handleStartDateChange}
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//                 fullWidth
//                 disabled={loading}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="End Date"
//                 type="date"
//                 value={endDate}
//                 onChange={handleEndDateChange}
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//                 fullWidth
//                 disabled={loading}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="Start Time"
//                 type="time"
//                 value={startTime}
//                 onChange={handleStartTimeChange}
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//                 fullWidth
//                 disabled={loading}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="End Time"
//                 type="time"
//                 value={endTime}
//                 onChange={handleEndTimeChange}
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//                 fullWidth
//                 disabled={loading}
//               />
//             </Grid>
//           </Grid>
//           <div className="log-btn">
//             <Button
//               variant="outlined"
//               color="primary"
//               onClick={filterLogs}
//               style={{ marginTop: "20px", marginRight: "10px" }}
//               disabled={loading}
//             >
//               Apply Filters
//             </Button>
//             <Button
//               variant="outlined"
//               color="secondary"
//               onClick={clearFilters}
//               style={{ marginTop: "20px" }}
//               disabled={loading}
//             >
//               Clear Filters
//             </Button>
//           </div>
//           {loading ? (
//             <p style={{ fontFamily: "Poppins", marginTop: "20px" }}>
//               Loading...
//             </p>
//           ) : filteredLogs !== null ? (
//             filteredLogs.length > 0 ? (
//               <TableContainer component={Paper} style={{ marginTop: "20px" }}>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell
//                         style={{ fontFamily: "Poppins", fontWeight: "bold" }}
//                       >
//                         Timestamp
//                       </TableCell>
//                       <TableCell
//                         style={{ fontFamily: "Poppins", fontWeight: "bold" }}
//                       >
//                         Module
//                       </TableCell>
//                       <TableCell
//                         style={{ fontFamily: "Poppins", fontWeight: "bold" }}
//                       >
//                         Level
//                       </TableCell>
//                       <TableCell
//                         style={{ fontFamily: "Poppins", fontWeight: "bold" }}
//                       >
//                         Message
//                       </TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {filteredLogs.map((log, index) => (
//                       <TableRow key={index}>
//                         <TableCell style={{ fontFamily: "Poppins" }}>
//                           {log.timestamp}
//                         </TableCell>
//                         <TableCell style={{ fontFamily: "Poppins" }}>
//                           {log.module}
//                         </TableCell>
//                         <TableCell style={{ fontFamily: "Poppins" }}>
//                           {log.level}
//                         </TableCell>
//                         <TableCell style={{ fontFamily: "Poppins" }}>
//                           {log.message}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             ) : (
//               <p style={{ fontFamily: "Poppins", marginTop: "20px" }}>
//                 No logs available
//               </p>
//             )
//           ) : (
//             <p style={{ fontFamily: "Poppins", marginTop: "20px" }}>
//               Loading...
//             </p>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button
//             variant="contained"
//             onClick={handleClose}
//             color="error"
//             sx={{ padding: "10px 20px " }}
//           >
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default LogViewer;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Grid,
// } from "@mui/material";

// const LogViewer = ({ userDetails }) => {
//   const [logs, setLogs] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [parsedLogs, setParsedLogs] = useState(null);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [filteredLogs, setFilteredLogs] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = () => {
//     setLoading(true);
//     axios
//       .get("http://127.0.0.1:8000/log/logs/msgraph-backend.log")
//       .then((response) => {
//         setLogs(response.data.split('\n'));
//         parseLogs(response.data.split('\n'));
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching logs:", error);
//         setLoading(false);
//         // If API call fails, use demo data
//         setLogs(demoLogs);
//         parseLogs(demoLogs);
//       });
//   };

//   const demoLogs = [
//     "2024-05-07 14:21:24,148 - msgraph-backend - DEBUG - Successfully removed testuser@productsquads.co from group ProductSquads Technolabs LLP",
//     // Add more demo log entries as needed
//   ];

//   const parseLogs = (logs) => {
//     const parsed = logs
//       .map((log) => {
//         const parts = log.split(" - ");
//         const timestamp = parts[0];
//         const module = parts[1];
//         const level = parts[2];
//         const message = parts.slice(3).join(" - ");

//         if (level === "DEBUG" || level === "INFO" && message.includes("Successfully")) {
//           return { timestamp, module, level, message };
//         }
//         return null;
//       })
//       .filter((log) => log !== null);

//     setParsedLogs(parsed);
//     setFilteredLogs(parsed);
//   };

//   const getStatusMessage = () => {
//     return userDetails?.accountStatus === "active" ? "Active" : "Disabled";
//   };

//   const filterLogs = () => {
//     if (!loading) {
//       const filtered = parsedLogs.filter((log) => {
//         const logTimestamp = new Date(log.timestamp);
//         const startDateTime = new Date(startDate + "T" + startTime);
//         const endDateTime = new Date(endDate + "T" + endTime);

//         return logTimestamp >= startDateTime && logTimestamp <= endDateTime;
//       });

//       setFilteredLogs(filtered);
//     }
//   };

//   const clearFilters = () => {
//     if (!loading) {
//       setStartDate("");
//       setEndDate("");
//       setStartTime("");
//       setEndTime("");
//       setFilteredLogs(parsedLogs);
//     }
//   };

//   const handleStartDateChange = (e) => {
//     if (!loading) {
//       const selectedDate = new Date(e.target.value);
//       if (selectedDate > new Date(endDate)) {
//         setEndDate(e.target.value);
//       }
//       setStartDate(e.target.value);
//     }
//   };

//   const handleEndDateChange = (e) => {
//     if (!loading) {
//       const selectedDate = new Date(e.target.value);
//       if (selectedDate < new Date(startDate)) {
//         setStartDate(e.target.value);
//       }
//       setEndDate(e.target.value);
//     }
//   };

//   const handleStartTimeChange = (e) => {
//     if (!loading) {
//       const selectedTime = e.target.value;
//       if (selectedTime > endTime) {
//         setEndTime(selectedTime);
//       }
//       setStartTime(selectedTime);
//     }
//   };

//   const handleEndTimeChange = (e) => {
//     if (!loading) {
//       const selectedTime = e.target.value;
//       if (selectedTime < startTime) {
//         setStartTime(selectedTime);
//       }
//       setEndTime(selectedTime);
//     }
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div className="con">
//       <h2
//         style={{
//           fontFamily: "Poppins",
//           fontWeight: "bolder",
//           marginBottom: "20px",
//         }}
//       >
//         <i className="fa-solid fa-microchip"></i>Log Viewer
//       </h2>
//       <Button
//         onClick={handleClickOpen}
//         disabled={loading}
//         variant="contained"
//         color="warning"
//         sx={{
//           fontFamily: "Poppins",
//           fontSize: "0.8em",
//           padding: "10px 25px",
//           textTransform: "capitalize",
//         }}
//       >
//         View Logs
//       </Button>
//       <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
//         <DialogTitle style={{ fontFamily: "Poppins" }}>
//           {" "}
//           <i className="fa-solid fa-microchip"></i> Log Viewer
//         </DialogTitle>
//         <DialogContent>
//           {/* <Grid container spacing={2}>
//             <Grid item xs={6}>
//               <TextField
//                 label="Start Date"
//                 type="date"
//                 value={startDate}
//                 onChange={handleStartDateChange}
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//                 fullWidth
//                 disabled={loading}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="End Date"
//                 type="date"
//                 value={endDate}
//                 onChange={handleEndDateChange}
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//                 fullWidth
//                 disabled={loading}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="Start Time"
//                 type="time"
//                 value={startTime}
//                 onChange={handleStartTimeChange}
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//                 fullWidth
//                 disabled={loading}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="End Time"
//                 type="time"
//                 value={endTime}
//                 onChange={handleEndTimeChange}
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//                 fullWidth
//                 disabled={loading}
//               />
//             </Grid>
//           </Grid> */}
//           {/* <div className="log-btn">
//             <Button
//               variant="outlined"
//               color="primary"
//               onClick={filterLogs}
//               style={{ marginTop: "20px", marginRight: "10px" }}
//               disabled={loading}
//             >
//               Apply Filters
//             </Button>
//             <Button
//               variant="outlined"
//               color="secondary"
//               onClick={clearFilters}
//               style={{ marginTop: "20px" }}
//               disabled={loading}
//             >
//               Clear Filters
//             </Button>
//           </div> */}
//           {loading ? (
//             <p style={{ fontFamily: "Poppins", marginTop: "20px" }}>
//               Loading...
//             </p>
//           ) : filteredLogs !== null ? (
//             filteredLogs.length > 0 ? (
//               <TableContainer component={Paper} style={{ marginTop: "20px" }}>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell
//                         style={{ fontFamily: "Poppins", fontWeight: "bold" }}
//                       >
//                         Timestamp
//                       </TableCell>
//                       <TableCell
//                         style={{ fontFamily: "Poppins", fontWeight: "bold" }}
//                       >
//                         Module
//                       </TableCell>
//                       <TableCell
//                         style={{ fontFamily: "Poppins", fontWeight: "bold" }}
//                       >
//                         Level
//                       </TableCell>
//                       <TableCell
//                         style={{ fontFamily: "Poppins", fontWeight: "bold" }}
//                       >
//                         Message
//                       </TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {filteredLogs.map((log, index) => (
//                       <TableRow key={index}>
//                         <TableCell style={{ fontFamily: "Poppins" }}>
//                           {log.timestamp}
//                         </TableCell>
//                         <TableCell style={{ fontFamily: "Poppins" }}>
//                           {log.module}
//                         </TableCell>
//                         <TableCell style={{ fontFamily: "Poppins" }}>
//                           {log.level}
//                         </TableCell>
//                         <TableCell style={{ fontFamily: "Poppins" }}>
//                           {log.message}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             ) : (
//               <p style={{ fontFamily: "Poppins", marginTop: "20px" }}>
//                 No logs available
//               </p>
//             )
//           ) : (
//             <p style={{ fontFamily: "Poppins", marginTop: "20px" }}>
//               Loading...
//             </p>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button
//             variant="contained"
//             onClick={handleClose}
//             color="error"
//             sx={{ padding: "10px 20px " }}
//           >
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default LogViewer;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";

// const LogViewer = ({ userDetails }) => {
//   const [logs, setLogs] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [parsedLogs, setParsedLogs] = useState(null);
//   const [filteredLogs, setFilteredLogs] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [logLevel, setLogLevel] = useState("INFO"); // Default log level filter

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     parseLogs(logs); // Ensure logs are included in the dependency array
//   }, [logs]);

//   const fetchData = () => {
//     setLoading(true);
//     axios
//       .get("http://127.0.0.1:8000/log/logs/msgraph-backend.log")
//       .then((response) => {
//         setLogs(response.data.split("\n"));
//         parseLogs(response.data.split("\n"));
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching logs:", error);
//         setLoading(false);
//         // If API call fails, use demo data
//         setLogs(demoLogs);
//         parseLogs(demoLogs);
//       });
//   };

//   const demoLogs = [
//     "2024-05-07 14:21:24,148 - msgraph-backend - DEBUG - Successfully removed testuser@productsquads.co from group ProductSquads Technolabs LLP",
//     // Add more demo log entries as needed
//   ];


//   const parseLogs = (logs, logLevel) => {
//     const parsed = logs
//       .map((log) => {
//         const parts = log.split(" - ");
//         const timestamp = parts[0];
//         const module = parts[1];
//         const level = parts[2];
//         const message = parts.slice(3).join(" - ");

//         switch (level) {
//           case "LEVEL":
//             if (
//                 message.includes(" ")
//               )
//             {
//               return { timestamp, module, level, message };
//             }
//             break;
//           case "DEBUG":
//             if (
//               message.includes("Starting disable_employee_account for") ||
//               message.includes("Successfully removed") ||
//               message.includes("Revoking licenses")
//             ) {
//               return { timestamp, module, level, message };
//             }
//             break;
//           case "INFO":
//             if (message.includes("Successfully")) {
//               return { timestamp, module, level, message };
//             }
//             break;
//           case "ERROR":
//             if (
//               message.includes("Failed to") ||
//               message.includes("Error modifying")
//             ) {
//               return { timestamp, module, level, message };
//             }
//             break;
//           default:
//             break;
//         }
//         return null;
//       })
//       .filter((log) => log !== null);

//     setParsedLogs(parsed);
//     setFilteredLogs(parsed.filter((log) => log.level === logLevel));
//   };

//   const getStatusMessage = () => {
//     return userDetails?.accountStatus === "active" ? "Active" : "Disabled";
//   };

//   const handleLogLevelChange = (e) => {
//     setLogLevel(e.target.value);
//     setFilteredLogs(parsedLogs.filter((log) => log.level === e.target.value));
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div className="con">
//       <h2
//         style={{
//           fontFamily: "Poppins",
//           fontWeight: "bolder",
//           marginBottom: "20px",
//         }}
//       >
//         <i className="fa-solid fa-microchip"></i>Log Viewer
//       </h2>
//       <Button
//         onClick={handleClickOpen}
//         disabled={loading}
//         variant="contained"
//         color="warning"
//         sx={{
//           fontFamily: "Poppins",
//           fontSize: "0.8em",
//           padding: "10px 25px",
//           textTransform: "capitalize",
//         }}
//       >
//         View Logs
//       </Button>
//       <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
//         <DialogTitle style={{ fontFamily: "Poppins" }}>
//           {" "}
//           <i className="fa-solid fa-microchip"></i> Log Viewer
//         </DialogTitle>
//         <DialogContent>
//           <FormControl fullWidth style={{ marginBottom: "20px" }}>
//             {/* <InputLabel>Log Level</InputLabel> */}
//             <Select value={logLevel} onChange={handleLogLevelChange}>
//               <MenuItem value="LEVEL">LEVEL</MenuItem>
//               <MenuItem value="INFO">INFO</MenuItem>
//               <MenuItem value="DEBUG">DEBUG</MenuItem>
//               <MenuItem value="ERROR">ERROR</MenuItem>
//             </Select>
//           </FormControl>
//           {loading ? (
//             <p style={{ fontFamily: "Poppins", marginTop: "20px" }}>
//               Loading...
//             </p>
//           ) : filteredLogs !== null ? (
//             filteredLogs.length > 0 ? (
//               <TableContainer component={Paper} style={{ marginTop: "20px" }}>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell
//                         style={{ fontFamily: "Poppins", fontWeight: "bold" }}
//                       >
//                         Timestamp
//                       </TableCell>
//                       <TableCell
//                         style={{ fontFamily: "Poppins", fontWeight: "bold" }}
//                       >
//                         Module
//                       </TableCell>
//                       <TableCell
//                         style={{ fontFamily: "Poppins", fontWeight: "bold" }}
//                       >
//                         Level
//                       </TableCell>
//                       <TableCell
//                         style={{ fontFamily: "Poppins", fontWeight: "bold" }}
//                       >
//                         Message
//                       </TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {filteredLogs.map((log, index) => (
//                       <TableRow key={index}>
//                         <TableCell style={{ fontFamily: "Poppins" }}>
//                           {log.timestamp}
//                         </TableCell>
//                         <TableCell style={{ fontFamily: "Poppins" }}>
//                           {log.module}
//                         </TableCell>
//                         <TableCell style={{ fontFamily: "Poppins" }}>
//                           {log.level}
//                         </TableCell>
//                         <TableCell style={{ fontFamily: "Poppins" }}>
//                           {log.message}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             ) : (
//               <p style={{ fontFamily: "Poppins", marginTop: "20px" }}>
//                 No logs available
//               </p>
//             )
//           ) : (
//             <p style={{ fontFamily: "Poppins", marginTop: "20px" }}>
//               Loading...
//             </p>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button
//             variant="contained"
//             onClick={handleClose}
//             color="error"
//             sx={{ padding: "10px 20px " }}
//           >
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default LogViewer;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";

// const LogViewer = ({ userDetails }) => {
//   const [logs, setLogs] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [parsedLogs, setParsedLogs] = useState(null);
//   const [filteredLogs, setFilteredLogs] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [logLevel, setLogLevel] = useState("INFO"); // Default log level filter

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     parseLogs(logs); // Ensure logs are included in the dependency array
//   }, [logs]);

//   const fetchData = () => {
//     setLoading(true);
//     axios
//       .get("http://127.0.0.1:8000/log/logs/msgraph-backend.log")
//       .then((response) => {
//         setLogs(response.data.split("\n"));
//         parseLogs(response.data.split("\n"));
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching logs:", error);
//         setLoading(false);
//         // If API call fails, use demo data
//         setLogs(demoLogs);
//         parseLogs(demoLogs);
//       });
//   };

//   const demoLogs = [
//     "2024-05-07 14:21:24,148 - msgraph-backend - DEBUG - Successfully removed testuser@productsquads.co from group ProductSquads Technolabs LLP",
//     // Add more demo log entries as needed
//   ];


//   const parseLogs = (logs, logLevel) => {
//     const parsed = logs
//       .map((log) => {
//         const parts = log.split(" - ");
//         const timestamp = parts[0];
//         const module = parts[1];
//         const level = parts[2];
//         const message = parts.slice(3).join(" - ");

//         switch (level) {
//           case "LEVEL":
//             if (
//                 message.includes(" ")
//               )
//             {
//               return { timestamp, module, level, message };
//             }
//             break;
//           case "DEBUG":
//             if (
//               message.includes("Starting disable_employee_account for") ||
//               message.includes("Successfully removed") ||
//               message.includes("Revoking licenses")
//             ) {
//               return { timestamp, module, level, message };
//             }
//             break;
//           case "INFO":
//             if (message.includes("Successfully")) {
//               return { timestamp, module, level, message };
//             }
//             break;
//           case "ERROR":
//             if (
//               message.includes("Failed to") ||
//               message.includes("Error modifying")
//             ) {
//               return { timestamp, module, level, message };
//             }
//             break;
//           default:
//             break;
//         }
//         return null;
//       })
//       .filter((log) => log !== null);

//     setParsedLogs(parsed);
//     setFilteredLogs(parsed.filter((log) => log.level === logLevel));
//   };

//   const downloadLogFile = async () => {
//     try {
//       const filteredLogsForDownload = parsedLogs.filter((log) => log.level === logLevel);
//       const logContentForDownload = filteredLogsForDownload.map((log) => `${log.timestamp} - ${log.module} - ${log.level} - ${log.message}`).join("\n");
//       const blob = new Blob([logContentForDownload], { type: "text/plain" });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", `msgraph-backend-${logLevel.toLowerCase()}.log`);
//       document.body.appendChild(link);
//       link.click();
//     } catch (error) {
//       console.error("Error downloading log file:", error);
//     }
//   };

//   const getStatusMessage = () => {
//     return userDetails?.accountStatus === "active" ? "Active" : "Disabled";
//   };

//   const handleLogLevelChange = (e) => {
//     setLogLevel(e.target.value);
//     setFilteredLogs(parsedLogs.filter((log) => log.level === e.target.value));
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div className="aside">
//       <h2
//         style={{
//           fontFamily: "Poppins",
//           fontWeight: "bolder",
//           marginBottom: "20px",
//         }}
//       >
//         <i className="fa-solid fa-microchip"></i>Log Viewer
//       </h2>
//       <Button
//         onClick={handleClickOpen}
//         disabled={loading}
//         variant="contained"
//         color="warning"
//         sx={{
//           fontFamily: "Poppins",
//           fontSize: "0.8em",
//           // padding: "10px 25px",

//           textTransform: "capitalize",
//         }}
//       >
//         View Logs
//       </Button>
//       <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
//         <DialogTitle style={{ fontFamily: "Poppins" }}>
//           {" "}
//           <i className="fa-solid fa-microchip"></i> Log Viewer
//         </DialogTitle>
//         <DialogContent>
//           <FormControl fullWidth style={{ marginBottom: "20px" }}>
//             {/* <InputLabel>Log Level</InputLabel> */}
//             <Select value={logLevel} onChange={handleLogLevelChange}>
//               <MenuItem value="LEVEL">LEVEL</MenuItem>
//               <MenuItem value="INFO">INFO</MenuItem>
//               <MenuItem value="DEBUG">DEBUG</MenuItem>
//               <MenuItem value="ERROR">ERROR</MenuItem>
//             </Select>
//           </FormControl>
//           {loading ? (
//             <p style={{ fontFamily: "Poppins", marginTop: "20px" }}>
//               Loading...
//             </p>
//           ) : filteredLogs !== null ? (
//             filteredLogs.length > 0 ? (
//               <>
//                <Button
//                   variant="outlined"
//                   onClick={downloadLogFile}
//                   style={{ marginTop: "20px" }}
//                 >
//                   Download Logs
//                 </Button>
//                 <TableContainer component={Paper} style={{ marginTop: "20px" }}>
//                   <Table>
//                     <TableHead>
//                       <TableRow>
//                         <TableCell
//                           style={{ fontFamily: "Poppins", fontWeight: "bold" }}
//                         >
//                           Timestamp
//                         </TableCell>
//                         <TableCell
//                           style={{ fontFamily: "Poppins", fontWeight: "bold" }}
//                         >
//                           Module
//                         </TableCell>
//                         <TableCell
//                           style={{ fontFamily: "Poppins", fontWeight: "bold" }}
//                         >
//                           Level
//                         </TableCell>
//                         <TableCell
//                           style={{ fontFamily: "Poppins", fontWeight: "bold" }}
//                         >
//                           Message
//                         </TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {filteredLogs.map((log, index) => (
//                         <TableRow key={index}>
//                           <TableCell style={{ fontFamily: "Poppins" }}>
//                             {log.timestamp}
//                           </TableCell>
//                           <TableCell style={{ fontFamily: "Poppins" }}>
//                             {log.module}
//                           </TableCell>
//                           <TableCell style={{ fontFamily: "Poppins" }}>
//                             {log.level}
//                           </TableCell>
//                           <TableCell style={{ fontFamily: "Poppins" }}>
//                             {log.message}
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
               
//               </>
//             ) : (
//               <p style={{ fontFamily: "Poppins", marginTop: "20px" }}>
//                 No logs available
//               </p>
//             )
//           ) : (
//             <p style={{ fontFamily: "Poppins", marginTop: "20px" }}>
//               Loading...
//             </p>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button
//             variant="contained"
//             onClick={handleClose}
//             color="error"
//             sx={{ padding: "10px 20px " }}
//           >
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default LogViewer;





import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const LogViewer = ({ userDetails }) => {
  const [logs, setLogs] = useState([]);
  const [open, setOpen] = useState(false);
  const [parsedLogs, setParsedLogs] = useState(null);
  const [filteredLogs, setFilteredLogs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logLevel, setLogLevel] = useState("INFO"); // Default log level filter

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    parseLogs(logs); // Ensure logs are included in the dependency array
  }, [logs]);

  const fetchData = () => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:8000/log/logs/msgraph-backend.log")
      .then((response) => {
        setLogs(response.data.split("\n"));
        parseLogs(response.data.split("\n"));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching logs:", error);
        setLoading(false);
        // If API call fails, use demo data
        setLogs(demoLogs);
        parseLogs(demoLogs);
      });
  };

  const demoLogs = [
    "2024-05-07 14:21:24,148 - msgraph-backend - DEBUG - Successfully removed testuser@productsquads.co from group ProductSquads Technolabs LLP",
    // Add more demo log entries as needed
  ];


  const parseLogs = (logs, logLevel) => {
    const parsed = logs
      .map((log) => {
        const parts = log.split(" - ");
        const timestamp = parts[0];
        const module = parts[1];
        const level = parts[2];
        const message = parts.slice(3).join(" - ");

        switch (level) {
          case "LEVEL":
            if (
                message.includes(" ")
              )
            {
              return { timestamp, module, level, message };
            }
            break;
          case "DEBUG":
            if (
              message.includes("Starting disable_employee_account for") ||
              message.includes("Successfully removed") ||
              message.includes("Revoking licenses")
            ) {
              return { timestamp, module, level, message };
            }
            break;
          case "INFO":
            if (message.includes("Successfully")) {
              return { timestamp, module, level, message };
            }
            break;
          case "ERROR":
            if (
              message.includes("Failed to") ||
              message.includes("Error modifying")
            ) {
              return { timestamp, module, level, message };
            }
            break;
          default:
            break;
        }
        return null;
      })
      .filter((log) => log !== null);

    setParsedLogs(parsed);
    if (logLevel === "LEVEL") {
      setFilteredLogs(parsed);
    } else {
      setFilteredLogs(parsed.filter((log) => log.level === logLevel));
    }
  };

  const downloadLogFile = async () => {
    try {
      const filteredLogsForDownload = parsedLogs.filter((log) => log.level === logLevel);
      const logContentForDownload = filteredLogsForDownload.map((log) => `${log.timestamp} - ${log.module} - ${log.level} - ${log.message}`).join("\n");
      const blob = new Blob([logContentForDownload], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `msgraph-backend-${logLevel.toLowerCase()}.log`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading log file:", error);
    }
  };

  const getStatusMessage = () => {
    return userDetails?.accountStatus === "active" ? "Active" : "Disabled";
  };

  const handleLogLevelChange = (e) => {
    const selectedLogLevel = e.target.value;
    setLogLevel(selectedLogLevel);
    parseLogs(logs, selectedLogLevel);
  };

  const handleRefresh = () => {
    fetchData(); // Refresh all logs
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="aside">
      <h2
        style={{
          fontFamily: "Poppins",
          fontWeight: "bolder",
          marginBottom: "20px",
        }}
      >
        <i className="fa-solid fa-microchip"></i>Log Viewer
      </h2>
      <Button
        onClick={handleClickOpen}
        disabled={loading}
        variant="contained"
        color="warning"
        sx={{
          fontFamily: "Poppins",
          fontSize: "0.8em",
          textTransform: "capitalize",
        }}
      >
        View Logs
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle style={{ fontFamily: "Poppins" }}>
          {" "}
          <i className="fa-solid fa-microchip"></i> Log Viewer
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth style={{ marginBottom: "20px" }}>
            <Select value={logLevel} onChange={handleLogLevelChange}>
              <MenuItem value="LEVEL">LEVEL</MenuItem>
              <MenuItem value="INFO">INFO</MenuItem>
              <MenuItem value="DEBUG">DEBUG</MenuItem>
              <MenuItem value="ERROR">ERROR</MenuItem>
            </Select>
          </FormControl>
          <Button
            onClick={handleRefresh}
            disabled={loading}
            variant="contained"
            color="info"
            sx={{
              fontFamily: "Poppins",
              fontSize: "0.8em",
              marginLeft: "10px",
              textTransform: "capitalize",
            }}
          >
            Refresh
          </Button>
          {loading ? (
            <p style={{ fontFamily: "Poppins", marginTop: "20px" }}>
              Loading...
            </p>
          ) : filteredLogs !== null ? (
            filteredLogs.length > 0 ? (
              <>
                <Button
                  variant="outlined"
                  onClick={downloadLogFile}
                  style={{ marginTop: "20px" }}
                >
                  Download Logs
                </Button>
                <TableContainer component={Paper} style={{ marginTop: "20px" }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{ fontFamily: "Poppins", fontWeight: "bold" }}
                        >
                          Timestamp
                        </TableCell>
                        <TableCell
                          style={{ fontFamily: "Poppins", fontWeight: "bold" }}
                        >
                          Module
                        </TableCell>
                        <TableCell
                          style={{ fontFamily: "Poppins", fontWeight: "bold" }}
                        >
                          Level
                        </TableCell>
                        <TableCell
                          style={{ fontFamily: "Poppins", fontWeight: "bold" }}
                        >
                          Message
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredLogs.map((log, index) => (
                        <TableRow key={index}>
                          <TableCell style={{ fontFamily: "Poppins" }}>
                            {log.timestamp}
                          </TableCell>
                          <TableCell style={{ fontFamily: "Poppins" }}>
                            {log.module}
                          </TableCell>
                          <TableCell style={{ fontFamily: "Poppins" }}>
                            {log.level}
                          </TableCell>
                          <TableCell style={{ fontFamily: "Poppins" }}>
                            {log.message}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            ) : (
              <p style={{ fontFamily: "Poppins", marginTop: "20px" }}>
                No logs available
              </p>
            )
          ) : (
            <p style={{ fontFamily: "Poppins", marginTop: "20px" }}>
              Loading...
            </p>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleClose}
            color="error"
            sx={{ padding: "10px 20px " }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LogViewer;
