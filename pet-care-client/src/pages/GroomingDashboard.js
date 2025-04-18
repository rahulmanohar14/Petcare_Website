import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import axios from 'axios';

function GroomingDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [petName, setPetName] = useState('');
  const [date, setDate] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const serviceOptions = ['Bath', 'Haircut', 'Nail Trim', 'Full Groom'];

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/grooming?email=${user.email}`);
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!petName || !date || !serviceType) {
      showSnackbar('Please fill all fields.', 'warning');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/grooming', {
        userEmail: user.email,
        petName,
        date,
        serviceType
      });
      showSnackbar('Appointment booked!');
      setPetName('');
      setDate('');
      setServiceType('');
      fetchAppointments();
    } catch (err) {
      showSnackbar('Booking failed.', 'error');
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm('Cancel this appointment?')) {
      await axios.delete(`http://localhost:5000/api/grooming/${id}`);
      showSnackbar('Appointment cancelled.');
      fetchAppointments();
    }
  };

  const handleEdit = (app) => {
    setEditId(app._id);
    setEditData({
      petName: app.petName,
      date: app.date,
      serviceType: app.serviceType
    });
  };

  const handleEditChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  const handleUpdate = async () => {
    await axios.put(`http://localhost:5000/api/grooming/${editId}`, editData);
    showSnackbar('Appointment updated!');
    setEditId(null);
    setEditData({});
    fetchAppointments();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Book a Grooming Appointment
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 5 }}
      >
        <TextField
          label="Pet Name"
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
          label="Grooming Service"
          select
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          required
        >
          {serviceOptions.map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained">Book</Button>
      </Box>

      <Typography variant="h5" gutterBottom>
        Your Appointments
      </Typography>

      {appointments.length === 0 ? (
        <Typography>No appointments yet.</Typography>
      ) : (
        <Box sx={{ overflowX: 'auto' }}>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
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
                          select
                          value={editData.serviceType}
                          onChange={(e) => handleEditChange('serviceType', e.target.value)}
                        >
                          {serviceOptions.map((option) => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                          ))}
                        </TextField>
                      ) : (
                        app.serviceType
                      )}
                    </TableCell>
                    <TableCell>{app.status}</TableCell>
                    <TableCell align="right">
                      {app.status === 'Pending' && (
                        <>
                          {editId === app._id ? (
                            <>
                              <Button size="small" onClick={handleUpdate} variant="contained" color="success" sx={{ mr: 1 }}>
                                Save
                              </Button>
                              <Button size="small" onClick={() => setEditId(null)} variant="outlined">
                                Cancel
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button size="small" onClick={() => handleEdit(app)} variant="outlined" sx={{ mr: 1 }}>
                                Edit
                              </Button>
                              <Button size="small" onClick={() => handleCancel(app._id)} color="error" variant="outlined">
                                Cancel
                              </Button>
                            </>
                          )}
                        </>
                      )}
                      {app.status === 'Completed' && (
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

export default GroomingDashboard;