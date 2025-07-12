import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CssBaseline
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // force light mode
    primary: {
      main: "#1976d2", // MUI default blue or your brand color
    },
    background: {
      default: "#f5f5f5", // light gray background
    },
  },
});

export default function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateTime, setDateTime] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      phone,
      appointment_time: dateTime,
    };

    try {
      const res = await fetch("http://localhost:5678/webhook/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Appointment booked successfully!");
        setName("");
        setPhone("");
        setDateTime(new Date());
      } else {
        alert("Failed to book appointment.");
      }
    } catch (err) {
      console.error(err);
      alert("Error booking appointment.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Container maxWidth="sm" sx={{ mt: 8 }}>
          <Typography variant="h4" gutterBottom>
            Book an Appointment
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <DateTimePicker
              label="Appointment Date & Time"
              value={dateTime}
              onChange={(newValue) => setDateTime(newValue)}
              renderInput={(params) => <TextField {...params} required />}
            />
            <Button variant="contained" type="submit">
              Book Appointment
            </Button>
          </Box>
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
