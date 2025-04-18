import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Snackbar,
  Alert,
  Box
} from '@mui/material';
import axios from 'axios';

function GroomerDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchAppointments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/grooming');
      setAppointments(res.data);
    } catch (err) {
      console.error("Failed to fetch grooming appointments", err);
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleComplete = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/grooming/${id}`, { status: 'Completed' });
      showSnackbar('Marked as completed');
      fetchAppointments();
    } catch (err) {
      showSnackbar('Failed to update status', 'error');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Groomer Dashboard – All Appointments
      </Typography>

      {appointments.length === 0 ? (
        <Typography>No grooming appointments found.</Typography>
      ) : (
        <Box sx={{ overflowX: 'auto' }}>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Pet</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Service</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map((app) => (
                  <TableRow key={app._id}>
                    <TableCell>{app.userEmail}</TableCell>
                    <TableCell>{app.petName}</TableCell>
                    <TableCell>{app.date}</TableCell>
                    <TableCell>{app.serviceType}</TableCell>
                    <TableCell>{app.status}</TableCell>
                    <TableCell align="right">
                      {app.status === 'Pending' ? (
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleComplete(app._id)}
                          size="small"
                        >
                          Mark as Completed
                        </Button>
                      ) : (
                        <Typography variant="body2" color="textSecondary">
                          Done
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default GroomerDashboard;