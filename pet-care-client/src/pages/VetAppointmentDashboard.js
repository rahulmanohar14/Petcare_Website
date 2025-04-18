import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert
} from '@mui/material';
import axios from 'axios';

function VetAppointmentDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [petName, setPetName] = useState('');
  const [date, setDate] = useState('');
  const [concern, setConcern] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/appointments');
      const userAppointments = res.data.filter(a => a.userEmail === user.email);
      setAppointments(userAppointments);
    } catch (err) {
      console.error("Failed to load appointments", err);
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!petName || !date || !concern) {
      showSnackbar('All fields are required!', 'warning');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/appointments',
        { petName, date, concern, userEmail: user?.email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showSnackbar('Appointment booked successfully!');
      setPetName('');
      setDate('');
      setConcern('');
      fetchAppointments();
    } catch (err) {
      showSnackbar('Booking failed. Try again.', 'error');
      console.error(err);
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm('Cancel this appointment?')) {
      await axios.delete(`http://localhost:5000/api/appointments/${id}`);
      showSnackbar('Appointment cancelled.');
      fetchAppointments();
    }
  };

  const handleEdit = (app) => {
    setEditId(app._id);
    setEditData({
      petName: app.petName,
      date: app.date,
      concern: app.concern
    });
  };

  const handleEditChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  const handleUpdate = async () => {
    await axios.put(`http://localhost:5000/api/appointments/update/${editId}`, editData);
    showSnackbar('Appointment updated!');
    setEditId(null);
    setEditData({});
    fetchAppointments();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Book a Vet Appointment
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 5 }}
      >
        <TextField
          label="Pet Name"
          variant="outlined"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          required
        />
        <TextField
          label="Appointment Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <TextField
          label="Symptoms / Concern"
          variant="outlined"
          multiline
          rows={3}
          value={concern}
          onChange={(e) => setConcern(e.target.value)}
          required
        />
        <Button variant="contained" type="submit">
          Book Appointment
        </Button>
      </Box>

      <Typography variant="h5" gutterBottom>
        Your Appointments
      </Typography>

      {appointments.length === 0 ? (
        <Typography>No appointments yet.</Typography>
      ) : (
        <Box sx={{ overflowX: 'auto' }}>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="appointments table">
              <TableHead>
                <TableRow>
                  <TableCell>Pet Name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Concern</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map((app) => (
                  <TableRow key={app._id}>
                    <TableCell>
                      {editId === app._id ? (
                        <TextField
                          value={editData.petName}
                          onChange={(e) => handleEditChange('petName', e.target.value)}
                        />
                      ) : (
                        app.petName
                      )}
                    </TableCell>
                    <TableCell>
                      {editId === app._id ? (
                        <TextField
                          type="date"
                          value={editData.date}
                          onChange={(e) => handleEditChange('date', e.target.value)}
                        />
                      ) : (
                        app.date
                      )}
                    </TableCell>
                    <TableCell>
                      {editId === app._id ? (
                        <TextField
                          value={editData.concern}
                          onChange={(e) => handleEditChange('concern', e.target.value)}
                        />
                      ) : (
                        app.concern
                      )}
                    </TableCell>
                    <TableCell>{app.status}</TableCell>
                    <TableCell align="right">
                      {app.status === 'Pending' ? (
                        editId === app._id ? (
                          <>
                            <Button
                              size="small"
                              onClick={handleUpdate}
                              variant="contained"
                              color="success"
                              sx={{ mr: 1 }}
                            >
                              Save
                            </Button>
                            <Button
                              size="small"
                              onClick={() => setEditId(null)}
                              variant="outlined"
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              size="small"
                              onClick={() => handleEdit(app)}
                              variant="outlined"
                              sx={{ mr: 1 }}
                            >
                              Edit
                            </Button>
                            <Button
                              size="small"
                              onClick={() => handleCancel(app._id)}
                              color="error"
                              variant="outlined"
                            >
                              Cancel
                            </Button>
                          </>
                        )
                      ) : (
                        <Typography variant="body2" color="textSecondary">
                          Cannot edit
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

export default VetAppointmentDashboard;