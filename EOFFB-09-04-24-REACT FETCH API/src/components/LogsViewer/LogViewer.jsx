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
            variant="contained"
            onClick={downloadLogFile}
            style={{ marginTop: "0px", marginLeft: "0px" }} // Adjusted margin
          >
            Download Logs
          </Button>
          <Button
            onClick={handleRefresh}
            disabled={loading}
            variant="contained"
            color="error" // Changed color to red
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
