import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Snackbar,
  Alert,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from '@mui/material';
import axios from 'axios';

function AdoptionManagerDashboard() {
  const [pets, setPets] = useState([]);
  const [requests, setRequests] = useState([]);
  const [open, setOpen] = useState(false);
  const [newPet, setNewPet] = useState({
    name: '',
    breed: '',
    age: '',
    image: null,
    description: ''
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchPets();
    fetchRequests();
  }, []);

  const fetchPets = async () => {
    const res = await axios.get('http://localhost:5000/api/pets');
    setPets(res.data);
  };

  const fetchRequests = async () => {
    const res = await axios.get('http://localhost:5000/api/adoptions');
    setRequests(res.data);
  };

  // ✅ Cloudinary Upload Widget
  const openUploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: 'dskkxrqrt', // Replace with your Cloudinary cloud name
        uploadPreset: 'petcare_unsigned', // Replace with your unsigned preset
        sources: ['local', 'camera'],
        multiple: false,
        folder: 'petcare',
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log('✅ Uploaded image URL:', result.info.secure_url);
          setNewPet((prev) => ({
            ...prev,
            image: result.info.secure_url
          }));
        } else if (error) {
          console.error('❌ Upload failed:', error);
          setSnackbar({
            open: true,
            message: 'Image upload failed.',
            severity: 'error'
          });
        }
      }
    );
  };

  const handleAddPet = async () => {
    if (!newPet.image) {
      setSnackbar({
        open: true,
        message: 'Please upload an image using the Upload button.',
        severity: 'warning'
      });
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/pets', newPet);
      setSnackbar({ open: true, message: 'Pet added successfully!', severity: 'success' });
      setOpen(false);
      setNewPet({ name: '', breed: '', age: '', image: null, description: '' });
      fetchPets();
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Unknown error';
      console.error('❌ Failed to add pet:', msg);
      setSnackbar({ open: true, message: `Failed: ${msg}`, severity: 'error' });
    }
  };

  const handleApprove = async (id) => {
    await axios.put(`http://localhost:5000/api/adoptions/${id}`, { status: 'Approved' });
    setSnackbar({ open: true, message: 'Request approved', severity: 'success' });
    fetchRequests();
  };

  const handleReject = async (id) => {
    await axios.put(`http://localhost:5000/api/adoptions/${id}`, { status: 'Rejected' });
    setSnackbar({ open: true, message: 'Request rejected', severity: 'info' });
    fetchRequests();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">Adoption Manager</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>Add Pet</Button>
      </Box>

      {/* Pet List */}
      <Typography variant="h6" gutterBottom>Available Pets</Typography>
      <Grid container spacing={3}>
        {pets.map((pet) => (
          <Grid item xs={12} sm={6} md={4} key={pet._id}>
            <Card>
              <CardMedia
                component="img"
                height="180"
                image={pet.image || '/placeholder.jpg'}
                alt={pet.name}
              />
              <CardContent>
                <Typography variant="h6">{pet.name}</Typography>
                <Typography variant="body2">Breed: {pet.breed}</Typography>
                <Typography variant="body2">Age: {pet.age}</Typography>
                <Typography variant="body2">{pet.description?.slice(0, 60)}...</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Requests Table */}
      <Box mt={6}>
        <Typography variant="h6" gutterBottom>Adoption Requests</Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Pet</TableCell>
                <TableCell>User Email</TableCell>
                <TableCell>Applicant Name</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((req) => (
                <TableRow key={req._id}>
                  <TableCell>{req.petName}</TableCell>
                  <TableCell>{req.userEmail}</TableCell>
                  <TableCell>{req.name}</TableCell>
                  <TableCell>{req.contact}</TableCell>
                  <TableCell>{req.message}</TableCell>
                  <TableCell>{req.status}</TableCell>
                  <TableCell align="right">
                    {req.status === 'Pending' && (
                      <>
                        <Button size="small" onClick={() => handleApprove(req._id)} color="success" variant="contained" sx={{ mr: 1 }}>
                          Approve
                        </Button>
                        <Button size="small" onClick={() => handleReject(req._id)} color="error" variant="outlined">
                          Reject
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Add Pet Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add New Pet</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Name" value={newPet.name} onChange={(e) => setNewPet({ ...newPet, name: e.target.value })} />
          <TextField label="Breed" value={newPet.breed} onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })} />
          <TextField label="Age" value={newPet.age} onChange={(e) => setNewPet({ ...newPet, age: e.target.value })} />

          <Button variant="outlined" onClick={openUploadWidget}>
            Upload Image
          </Button>
          {newPet.image && (
            <Typography variant="body2" color="green">
              ✅ Image uploaded!
            </Typography>
          )}

          <TextField
            label="Description"
            multiline
            rows={3}
            value={newPet.description}
            onChange={(e) => setNewPet({ ...newPet, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={handleAddPet}
            variant="contained"
            disabled={!newPet.image}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default AdoptionManagerDashboard;