import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Box, Paper, List, ListItem,
  ListItemIcon, ListItemText, Chip
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import ScissorsIcon from '@mui/icons-material/ContentCut';
import HealingIcon from '@mui/icons-material/MedicalServices';
import axios from 'axios';

function UserDashboard() {
  const [activity, setActivity] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchRecentActivity = async () => {
    try {
      const groomingRes = await axios.get('http://localhost:5000/api/grooming');
      const adoptionRes = await axios.get('http://localhost:5000/api/adoptions');
      const vetRes = await axios.get('http://localhost:5000/api/appointments');

      const groomingActivity = groomingRes.data
        .filter((g) => g.userEmail === user.email)
        .map((g) => ({
          type: 'Grooming',
          date: g.date,
          status: g.status,
          icon: <ScissorsIcon color="primary" />,
          label: `Grooming for ${g.petName}`
        }));

      const adoptionActivity = adoptionRes.data
        .filter((a) => a.userEmail === user.email)
        .map((a) => ({
          type: 'Adoption',
          date: new Date(a.createdAt || Date.now()).toISOString().split('T')[0],
          status: a.status,
          icon: <PetsIcon color="secondary" />,
          label: `Adoption request for ${a.petName}`
        }));

      const vetActivity = vetRes.data
        .filter((v) => v.userEmail === user.email)
        .map((v) => ({
          type: 'Vet',
          date: v.date,
          status: v.status || 'Scheduled',
          icon: <HealingIcon color="success" />,
          label: `Vet appointment for ${v.petName}`
        }));

      const combined = [...groomingActivity, ...adoptionActivity, ...vetActivity]
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      setActivity(combined.slice(0, 6));
    } catch (err) {
      console.error('Failed to fetch recent activity:', err);
    }
  };

  useEffect(() => {
    fetchRecentActivity();
  }, []);

  const statusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'approved':
      case 'scheduled':
        return 'success';
      case 'rejected':
      case 'cancelled':
        return 'error';
      default:
        return 'warning';
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Welcome to Your Dashboard
      </Typography>

      <Box
        component={Paper}
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          backgroundColor: '#f9f9f9'
        }}
      >
        <Typography variant="h6" gutterBottom>
          Your Services
        </Typography>
        <Typography variant="body1">
          Use the menu to book grooming or vet appointments, or explore pet adoption.
        </Typography>
      </Box>

      <Box component={Paper} elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Recent Activity
        </Typography>

        {activity.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No recent activity found.
          </Typography>
        ) : (
          <List>
            {activity.map((item, index) => (
              <ListItem key={index} divider>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} secondary={`Date: ${item.date}`} />
                <Chip label={item.status} color={statusColor(item.status)} size="small" />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
}

export default UserDashboard;