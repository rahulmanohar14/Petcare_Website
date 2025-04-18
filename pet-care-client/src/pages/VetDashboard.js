import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack
} from '@mui/material';

function VetDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await axios.get('http://localhost:5000/api/appointments');
      setAppointments(res.data);
      setFilteredAppointments(res.data);
    };
    fetchAppointments();
  }, []);

  const handleApprove = async (id) => {
    await axios.put(`http://localhost:5000/api/appointments/${id}`, {
      status: 'Approved'
    });
    const updated = appointments.map(app =>
      app._id === id ? { ...app, status: 'Approved' } : app
    );
    setAppointments(updated);
    applyFilters(updated);
  };

  const applyFilters = (sourceData = appointments) => {
    let filtered = [...sourceData];

    if (statusFilter) {
      filtered = filtered.filter(app => app.status === statusFilter);
    }
    if (dateFilter) {
      filtered = filtered.filter(app => app.date === dateFilter);
    }
    if (emailFilter) {
      filtered = filtered.filter(app =>
        app.userEmail.toLowerCase().includes(emailFilter.toLowerCase())
      );
    }

    setFilteredAppointments(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [statusFilter, dateFilter, emailFilter]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Vet Dashboard – Appointments
      </Typography>

      {/* Filters */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Appointment Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          fullWidth
        />

        <TextField
          label="Search by Email"
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
          fullWidth
        />
      </Stack>

      {/* Table */}
      <Box sx={{ overflowX: 'auto' }}>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="appointments">
            <TableHead>
              <TableRow>
                <TableCell>Pet Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Concern</TableCell>
                <TableCell>User Email</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAppointments.map((app) => (
                <TableRow key={app._id}>
                  <TableCell>{app.petName}</TableCell>
                  <TableCell>{app.date}</TableCell>
                  <TableCell>{app.concern}</TableCell>
                  <TableCell>{app.userEmail}</TableCell>
                  <TableCell>{app.status}</TableCell>
                  <TableCell align="right">
                    {app.status === 'Pending' && (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleApprove(app._id)}
                        size="small"
                      >
                        Approve
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default VetDashboard;