import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  AppBar, Toolbar, Typography, Box, IconButton,
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, CssBaseline
} from '@mui/material';
import { MdClose } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBloggerB, FaGraduationCap } from "react-icons/fa6";
import { MdPhoneInTalk } from "react-icons/md";
import { CgNotes } from "react-icons/cg";


const drawerWidth = 240;

function Profile() {
  const [tokenValid, setTokenValid] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const theme = localStorage.getItem('theme');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    sendToken();
  }, []);

  const username = useSelector((state) => state.username);
  const email = useSelector((state) => state.email);

  async function sendToken() {
    let token_header = localStorage.getItem('token');
    const response = await axios.post('https://college-backend-4-cgya.onrender.com/getprofile', {
      token_header,
    });

    if (response.data.message === 'profile_accessed') {
      if (localStorage.getItem('token') && localStorage.getItem('email') && localStorage.getItem('type') === 'student') {
        setTokenValid(true);
        localStorage.setItem(
          'token_expires_in',
          `${(response.data.authData.exp - response.data.authData.iat) / 60} minutes`
        );
      }
    } else if (response.data.result === 'invalid token') {
      setTokenValid(false);
      setTimeout(() => {
        localStorage.clear();
      }, 3000);
    }
  }

  const navItems = [
    { text: 'About', path: '/profile/', icon: <CgNotes /> },
    { text: 'Examinations', path: '/profile/examinations', icon: <FaGraduationCap /> },
    { text: 'Admissions', path: '/profile/admissions', icon: <CgNotes /> },
    { text: 'Placements', path: '/profile/placements', icon: <CgNotes /> },
    { text: 'Campus and events videos', path: '/profile/campus', icon: <CgNotes /> },
    { text: 'Blogs', path: '/profile/blogs', icon: <FaBloggerB /> },
    { text: 'Contact Us', path: '/profile/contact_us', icon: <MdPhoneInTalk /> },
    { text: 'Results', path: '/profile/results', icon: <CgNotes /> },
    { text: 'Notice', path: '/profile/notices', icon: <CgNotes /> },
  ];

  const drawer = (
    <Box sx={{ width: drawerWidth }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Content
        </Typography>
      </Toolbar>
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding onClick={() => setIsSidebarOpen(false)}>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {tokenValid ? (
        <>
          {/* AppBar for small screens */}
          <AppBar
            position="fixed"
            sx={{ display: { md: 'none' }, zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                edge="start"
                onClick={toggleSidebar}
              >
                {isSidebarOpen ? <MdClose /> : <GiHamburgerMenu />}
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Student Profile
              </Typography>
            </Toolbar>
          </AppBar>

          {/* Sidebar */}
          <Drawer
            variant="temporary"
            open={isSidebarOpen}
            onClose={toggleSidebar}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>

          {/* Permanent Sidebar for Desktop */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            open
          >
            {drawer}
          </Drawer>

          {/* Main Content */}
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}
          >
            <Toolbar />
            <Outlet />
          </Box>
        </>
      ) : (
        <Box sx={{ m: 10 }}>
          <Typography variant="h6" gutterBottom>
            Your token has expired
          </Typography>
          <Link
            to="/login"
            style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 'bold' }}
          >
            Login here
          </Link>{' '}
          again to continue.
        </Box>
      )}
    </Box>
  );
}

export default Profile;

