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




import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
    TextField,
    Grid,
} from "@mui/material";

const LogViewer = ({ userDetails }) => {
    const [logs, setLogs] = useState([]);
    const [open, setOpen] = useState(false);
    const [parsedLogs, setParsedLogs] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [filteredLogs, setFilteredLogs] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setLoading(true);
        axios.get('/api/logs')
            .then(response => {
                setLogs(response.data.logs);
                parseLogs(response.data.logs);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching logs:', error);
                setLoading(false);
                // If API call fails, use demo data
                setLogs(demoLogs);
                parseLogs(demoLogs);
            });
    };

    const demoLogs = [
        "2024-05-07 14:21:24,148 - msgraph-backend - DEBUG - Successfully removed testuser@productsquads.co from group ProductSquads Technolabs LLP",
        "2024-05-07 14:21:24,148 - msgraph-backend - DEBUG - Successfully removed testuser@productsquads.co from group ProductSquads Technolabs LLP",
        "2024-05-07 14:21:24,148 - msgraph-backend - DEBUG - Successfully removed testuser@productsquads.co from group ProductSquads Technolabs LLP",
        "2024-05-07 14:21:24,148 - msgraph-backend - DEBUG - Successfully removed testuser@productsquads.co from group ProductSquads Technolabs LLP",
        "2024-05-07 14:21:24,148 - msgraph-backend - DEBUG - Successfully removed testuser@productsquads.co from group ProductSquads Technolabs LLP",
        // Add more demo log entries as needed
    ];

    const parseLogs = (logs) => {
        const parsed = logs.map(log => {
            const parts = log.split(' - ');
            return {
                timestamp: parts[0],
                module: parts[1],
                level: parts[2],
                message: parts.slice(3).join(' - '),
            };
        });
        setParsedLogs(parsed);
        setFilteredLogs(parsed);
    };

    const getStatusMessage = () => {
        return userDetails?.accountStatus === "active" ? "Active" : "Inactive";
    };

    const filterLogs = () => {
        if (!loading) {
            const filtered = parsedLogs.filter(log => {
                const logTimestamp = new Date(log.timestamp);
                const startDateTime = new Date(startDate + "T" + startTime);
                const endDateTime = new Date(endDate + "T" + endTime);

                return logTimestamp >= startDateTime && logTimestamp <= endDateTime;
            });

            setFilteredLogs(filtered);
        }
    };

    const clearFilters = () => {
        if (!loading) {
            setStartDate("");
            setEndDate("");
            setStartTime("");
            setEndTime("");
            setFilteredLogs(parsedLogs);
        }
    };

    const handleStartDateChange = (e) => {
        if (!loading) {
            const selectedDate = new Date(e.target.value);
            if (selectedDate > new Date(endDate)) {
                setEndDate(e.target.value);
            }
            setStartDate(e.target.value);
        }
    };

    const handleEndDateChange = (e) => {
        if (!loading) {
            const selectedDate = new Date(e.target.value);
            if (selectedDate < new Date(startDate)) {
                setStartDate(e.target.value);
            }
            setEndDate(e.target.value);
        }
    };

    const handleStartTimeChange = (e) => {
        if (!loading) {
            const selectedTime = e.target.value;
            if (selectedTime > endTime) {
                setEndTime(selectedTime);
            }
            setStartTime(selectedTime);
        }
    };

    const handleEndTimeChange = (e) => {
        if (!loading) {
            const selectedTime = e.target.value;
            if (selectedTime < startTime) {
                setStartTime(selectedTime);
            }
            setEndTime(selectedTime);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='con'>
            <h2 style={{ fontFamily: "Poppins", fontWeight: 'bolder', marginBottom: "20px" }}><i class="fa-solid fa-microchip"></i>Log Viewer</h2>
            {/* <Button variant="contained" color="primary" onClick={handleClickOpen} disabled={loading}>
                View Logs
            </Button> */}
            <Button
              onClick={handleClickOpen}
              disabled={loading}
              variant="contained"
              color="warning"
              sx={{
                fontFamily: "poppins",
                fontSize: "0.7em",
                padding: "10px 25px",
              }}
            >
               View Logs
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
               <DialogTitle style={{ fontFamily: "Poppins" }}> <i class="fa-solid fa-microchip"></i> Log Viewer</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                label="Start Date"
                                type="date"
                                value={startDate}
                                onChange={handleStartDateChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                                disabled={loading}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="End Date"
                                type="date"
                                value={endDate}
                                onChange={handleEndDateChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                                disabled={loading}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Start Time"
                                type="time"
                                value={startTime}
                                onChange={handleStartTimeChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                                disabled={loading}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="End Time"
                                type="time"
                                value={endTime}
                                onChange={handleEndTimeChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                                disabled={loading}
                            />
                        </Grid>
                    </Grid>
                    <div className='log-btn'>
                        <Button variant="outlined" color="primary" onClick={filterLogs} style={{ marginTop: "20px", marginRight: "10px" }} disabled={loading}>
                            Apply Filters
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={clearFilters} style={{ marginTop: "20px" }} disabled={loading}>
                            Clear Filters
                        </Button>
                    </div>
                    {loading ? (
                        <p style={{ fontFamily: "Poppins", marginTop: "20px" }}>Loading...</p>
                    ) : (
                        filteredLogs !== null ? (
                            filteredLogs.length > 0 ? (
                                <TableContainer component={Paper} style={{ marginTop: "20px" }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{ fontFamily: "Poppins", fontWeight: "bold" }}>Timestamp</TableCell>
                                                <TableCell style={{ fontFamily: "Poppins", fontWeight: "bold" }}>Module</TableCell>
                                                <TableCell style={{ fontFamily: "Poppins", fontWeight: "bold" }}>Level</TableCell>
                                                <TableCell style={{ fontFamily: "Poppins", fontWeight: "bold" }}>Message</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {filteredLogs.map((log, index) => (
                                                <TableRow key={index}>
                                                    <TableCell style={{ fontFamily: "Poppins" }}>{log.timestamp}</TableCell>
                                                    <TableCell style={{ fontFamily: "Poppins" }}>{log.module}</TableCell>
                                                    <TableCell style={{ fontFamily: "Poppins" }}>{log.level}</TableCell>
                                                    <TableCell style={{ fontFamily: "Poppins" }}>{log.message}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : (
                                <p style={{ fontFamily: "Poppins", marginTop: "20px" }}>No logs available</p>
                            )
                        ) : (
                            <p style={{ fontFamily: "Poppins", marginTop: "20px" }}>Loading...</p>
                        )
                    )}
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={handleClose} color="error" sx={{padding: '10px 20px '}}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default LogViewer;
