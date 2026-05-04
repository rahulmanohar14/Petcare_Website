import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

function Navbar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    setDrawerOpen(false);
  };

  const navLinksByRole = {
    admin: [{ text: 'Admin Dashboard', path: '/admin' }],
    user: [
      { text: 'Dashboard', path: '/dashboard' },
      { text: 'Vet Appointment', path: '/vet-appointment' },
      { text: 'Grooming', path: '/grooming' },
      { text: 'Adoption', path: '/adoption' }
    ],
    vet: [{ text: 'Vet Dashboard', path: '/vet' }],
    groomer: [{ text: 'Groomer Dashboard', path: '/groomer' }],
    adoption: [{ text: 'Adoption Manager', path: '/adoption-manager' }]
  };

  const navItems = navLinksByRole[role] || [];

  const handleNavigate = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#ff7f50' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            PetCare
          </Typography>

          {isMobile ? (
            <>
              <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 250, p: 2 }}>
                  <List>
                    {navItems.map((item, index) => (
                      <ListItem button key={index} onClick={() => handleNavigate(item.path)}>
                        <ListItemText primary={item.text} />
                      </ListItem>
                    ))}
                    <ListItem button onClick={handleLogout}>
                      <ListItemText primary="Logout" />
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {navItems.map((item, index) => (
                <Button key={index} color="inherit" onClick={() => navigate(item.path)}>
                  {item.text}
                </Button>
              ))}
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;