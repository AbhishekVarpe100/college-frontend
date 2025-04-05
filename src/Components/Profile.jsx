import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Material UI imports
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Container,
  Paper,
  Button,
  useTheme,
  useMediaQuery,
  Alert,
} from '@mui/material';

// Material UI icons
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import VideocamIcon from '@mui/icons-material/Videocam';
import ArticleIcon from '@mui/icons-material/Article';
import PhoneIcon from '@mui/icons-material/Phone';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NotificationsIcon from '@mui/icons-material/Notifications';

function Profile() {
  const [tokenValid, setTokenValid] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    sendToken();
  }, []);

  const username = useSelector((state) => state.username);
  const email = useSelector((state) => state.email);

  async function sendToken() {
    let token_header = localStorage.getItem('token');
    try {
      const response = await axios.post('https://college-backend-4-cgya.onrender.com/getprofile', {
        token_header,
      });

      if (response.data.message === 'profile_accessed') {
        if(localStorage.getItem('token') && localStorage.getItem('email') && localStorage.getItem('type') === 'student'){
          setTokenValid(true);
          localStorage.setItem(
            'token_expires_in',
            `${(response.data.authData.exp - response.data.authData.iat) / 60} minutes`
          );
        }
      } else if (response.data.result === 'invalid token') {
        setTokenValid(false);
        setTimeout(() => {
          localStorage.removeItem('username');
          localStorage.removeItem('email');
          localStorage.removeItem('token_expires_in');
          localStorage.removeItem('token');
        }, 3000);
      }
    } catch (error) {
      console.error('Error validating token:', error);
      setTokenValid(false);
    }
  }

  const menuItems = [
    { text: 'About', path: '/profile/', icon: <InfoIcon /> },
    { text: 'Examinations', path: '/profile/examinations', icon: <SchoolIcon /> },
    { text: 'Admissions', path: '/profile/admissions', icon: <PersonAddIcon /> },
    { text: 'Placements', path: '/profile/placements', icon: <BusinessCenterIcon /> },
    { text: 'Campus and events videos', path: '/profile/campus', icon: <VideocamIcon /> },
    { text: 'Blogs', path: '/profile/blogs', icon: <ArticleIcon /> },
    { text: 'Contact Us', path: '/profile/contact_us', icon: <PhoneIcon /> },
    { text: 'Results', path: '/profile/results', icon: <AssignmentIcon /> },
    { text: 'Notice', path: '/profile/notices', icon: <NotificationsIcon /> },
  ];

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        bgcolor: theme === 'dark' ? 'background.paper' : '#f5f5f5'
      }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          Content
        </Typography>
        {isMobile && (
          <IconButton onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              component={Link} 
              to={item.path}
              onClick={() => isMobile && setDrawerOpen(false)}
              sx={{ 
                my: 0.5, 
                mx: 1, 
                borderRadius: 1,
                bgcolor: 'primary.dark',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.main',
                }
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {tokenValid ? (
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          {/* Permanent drawer for desktop */}
          <Drawer
            variant="permanent"
            sx={{
              width: 250,
              flexShrink: 0,
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': {
                width: 250,
                boxSizing: 'border-box',
                bgcolor: theme === 'dark' ? '#121212' : 'background.paper',
                color: theme === 'dark' ? 'white' : 'text.primary',
              },
            }}
            open
          >
            {drawer}
          </Drawer>

          {/* Temporary drawer for mobile */}
          <Drawer
            variant="temporary"
            open={drawerOpen}
            onClose={toggleDrawer}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': {
                width: 250,
                boxSizing: 'border-box',
                bgcolor: theme === 'dark' ? '#121212' : 'background.paper',
                color: theme === 'dark' ? 'white' : 'text.primary',
              },
            }}
          >
            {drawer}
          </Drawer>

          {/* Main content */}
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1, 
              bgcolor: theme === 'dark' ? '#1e1e1e' : 'grey.100',
              color: theme === 'dark' ? 'white' : 'text.primary',
              p: 3 
            }}
          >
            {/* Mobile menu toggle */}
            <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 2 }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer}
                sx={{ 
                  mr: 2, 
                  bgcolor: 'primary.dark',
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.main' }
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Page content */}
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                bgcolor: theme === 'dark' ? '#2d2d2d' : 'white',
                color: theme === 'dark' ? 'white' : 'text.primary',
              }}
            >
              <Outlet />
            </Paper>
          </Box>
        </Box>
      ) : (
        <Container maxWidth="md" sx={{ mt: 8 }}>
          <Alert 
            severity="warning"
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between' 
            }}
          >
            <Typography variant="body1">
              Your token has expired. Please{' '}
              <Link
                to="/login"
                style={{ 
                  color: '#1976d2', 
                  fontWeight: 'bold', 
                  textDecoration: 'none',
                  '&:hover': { 
                    textDecoration: 'underline', 
                    color: '#1565c0' 
                  }
                }}
              >
                Login here
              </Link>{' '}
              again to continue.
            </Typography>
          </Alert>
        </Container>
      )}
    </Box>
  );
}

export default Profile;
