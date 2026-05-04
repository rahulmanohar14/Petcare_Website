import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

function PublicNavbar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setDrawerOpen(false); // close drawer on mobile
  };

  const handleLogin = () => {
    navigate('/login');
    setDrawerOpen(false);
  };

  const drawerItems = [
    { text: 'Services', action: () => handleScroll('services') },
    { text: 'Hours', action: () => handleScroll('hours') },
    { text: 'Contact', action: () => handleScroll('contact') },
    { text: 'Login', action: handleLogin }
  ];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#ff7f50' }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            PetCare
          </Typography>

          {isMobile ? (
            <>
              <IconButton color="inherit" edge="end" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 250, p: 2 }}>
                  <List>
                    {drawerItems.map((item, index) => (
                      <ListItem button key={index} onClick={item.action}>
                        <ListItemText primary={item.text} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button color="inherit" onClick={() => handleScroll('services')}>Services</Button>
              <Button color="inherit" onClick={() => handleScroll('hours')}>Hours</Button>
              <Button color="inherit" onClick={() => handleScroll('contact')}>Contact</Button>
              <Button
                color="inherit"
                variant="outlined"
                onClick={handleLogin}
                sx={{
                  borderColor: '#fff',
                  '&:hover': {
                    backgroundColor: '#ffffff20',
                    borderColor: '#fff'
                  }
                }}
              >
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default PublicNavbar;