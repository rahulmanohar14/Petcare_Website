import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Card, CardMedia, CardContent,
  CardActions, Button, Dialog, DialogTitle, DialogContent,
  TextField, Snackbar, Alert, Box, Chip, Paper, MenuItem
} from '@mui/material';
import axios from 'axios';
import { getPetfinderToken } from '../api/petfinder';

function PetAdoptionDashboard() {
  const [pets, setPets] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedPet, setSelectedPet] = useState(null);
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [userRequests, setUserRequests] = useState([]);
  const [filters, setFilters] = useState({
    location: '02130',
    distance: '50',
    age: '',
    gender: ''
  });

  const user = JSON.parse(localStorage.getItem('user'));

  const fetchLocalPets = async () => {
    const res = await axios.get('http://localhost:5000/api/pets');
    setPets(res.data);
  };

  const fetchPetfinderPets = async () => {
    try {
      const token = await getPetfinderToken();
      const query = new URLSearchParams({
        type: 'dog',
        location: filters.location,
        distance: filters.distance,
        ...(filters.age && { age: filters.age }),
        ...(filters.gender && { gender: filters.gender }),
        limit: 12
      }).toString();

      const res = await axios.get(`https://api.petfinder.com/v2/animals?${query}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const externalPets = res.data.animals.map((animal) => ({
        _id: `petfinder-${animal.id}`,
        name: animal.name,
        breed: animal.breeds.primary,
        age: animal.age,
        description: '',
        image: animal.photos?.[0]?.medium || '/placeholder.jpg',
        external: true
      }));

      setPets(prev => [...prev.filter(p => !p.external), ...externalPets]);
    } catch (err) {
      console.error('Failed to fetch Petfinder pets:', err);
    }
  };

  const fetchUserRequests = async () => {
    const res = await axios.get('http://localhost:5000/api/adoptions');
    const myRequests = res.data.filter(req => req.userEmail === user.email);
    setUserRequests(myRequests);
  };

  useEffect(() => {
    fetchLocalPets();
    fetchPetfinderPets();
    fetchUserRequests();
  }, []);

  const handleOpenForm = (pet) => setSelectedPet(pet);
  const handleCloseForm = () => {
    setSelectedPet(null);
    setFormData({ name: '', contact: '', message: '' });
  };

  const handleApply = async () => {
    if (!user) return;

    try {
      await axios.post('http://localhost:5000/api/adoptions', {
        petName: selectedPet.name,
        userEmail: user.email,
        ...formData
      });
      setSnackbar({ open: true, message: 'Application sent!', severity: 'success' });
      handleCloseForm();
      fetchUserRequests();
    } catch {
      setSnackbar({ open: true, message: 'Failed to apply', severity: 'error' });
    }
  };

  const handleCancelRequest = async (id) => {
    if (window.confirm("Are you sure you want to cancel this request?")) {
      await axios.delete(`http://localhost:5000/api/adoptions/${id}`);
      setSnackbar({ open: true, message: 'Request cancelled.', severity: 'info' });
      fetchUserRequests();
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const statusColor = (status) => {
    switch (status) {
      case 'Approved': return 'success';
      case 'Rejected': return 'error';
      default: return 'warning';
    }
  };

  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" gutterBottom align="center">
       Available Pets for Adoption
      </Typography>

      {/* Filters */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3, justifyContent: 'center', textAlign: 'center' }}>
        <TextField name="location" label="ZIP Code" value={filters.location} onChange={handleFilterChange} size="small" />
        <TextField name="distance" label="Distance (mi)" value={filters.distance} onChange={handleFilterChange} size="small" />
        <TextField select name="age" label="Age" value={filters.age} onChange={handleFilterChange} size="small" sx={{ minWidth: 120 }}>
          <MenuItem value="">Any</MenuItem>
          <MenuItem value="baby">Baby</MenuItem>
          <MenuItem value="young">Young</MenuItem>
          <MenuItem value="adult">Adult</MenuItem>
          <MenuItem value="senior">Senior</MenuItem>
        </TextField>
        <TextField select name="gender" label="Gender" value={filters.gender} onChange={handleFilterChange} size="small" sx={{ minWidth: 120 }}>
          <MenuItem value="">Any</MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </TextField>
        <Button variant="contained" onClick={fetchPetfinderPets}>Search</Button>
      </Box>

      {/* Pet Cards */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
        {pets.slice(0, visibleCount).map((pet) => (
          <Card key={pet._id} sx={{ width: 300, display: 'flex', flexDirection: 'column', height: 400 }}>
            <CardMedia component="img" height="200" image={pet.image} alt={pet.name} />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6">{pet.name}</Typography>
              <Typography variant="body2">Breed: {pet.breed}</Typography>
              <Typography variant="body2">Age: {pet.age}</Typography>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0, mt: 'auto' }}>
              <Button fullWidth variant="contained" color="primary" onClick={() => handleOpenForm(pet)}>Adopt</Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      {/* Load More Button */}
      {visibleCount < pets.length && (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button variant="outlined" onClick={() => setVisibleCount(visibleCount + 6)}>Load More</Button>
        </Box>
      )}

      {/* Applications */}
      {userRequests.length > 0 && (
        <Box mt={6}>
          <Typography variant="h5" gutterBottom>Your Adoption Applications</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {userRequests.map((req) => (
              <Paper key={req._id} elevation={3} sx={{ p: 2, width: 300 }}>
                <Typography variant="subtitle1" fontWeight="bold">{req.petName}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>Message: {req.message}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Chip label={req.status} color={statusColor(req.status)} />
                  {req.status === 'Pending' && (
                    <Button variant="outlined" color="error" size="small" onClick={() => handleCancelRequest(req._id)}>Cancel</Button>
                  )}
                </Box>
              </Paper>
            ))}
          </Box>
        </Box>
      )}

      {/* Dialog */}
      <Dialog open={!!selectedPet} onClose={handleCloseForm} fullWidth maxWidth="sm">
        <DialogTitle>Apply to Adopt {selectedPet?.name}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Your Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <TextField label="Contact Info" value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} />
          <TextField label="Message" multiline rows={3} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
          <Button variant="contained" onClick={handleApply}>Submit Application</Button>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
}

export default PetAdoptionDashboard;