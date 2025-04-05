import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon,
  ListItemText, CssBaseline, Box
} from '@mui/material';
import { MdClose, MdPhoneInTalk } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaBloggerB, FaGraduationCap } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";

const drawerWidth = 240;

const navItems = [
  { label: 'About', path: '/profile/' },
  { label: 'Examinations', path: '/profile/examinations', icon: <FaGraduationCap /> },
  { label: 'Admissions', path: '/profile/admissions' },
  { label: 'Placements', path: '/profile/placements' },
  { label: 'Campus and Events Videos', path: '/profile/campus' },
  { label: 'Blogs', path: '/profile/blogs', icon: <FaBloggerB /> },
  { label: 'Contact Us', path: '/profile/contact_us', icon: <MdPhoneInTalk /> },
  { label: 'Results', path: '/profile/results', icon: <CgNotes /> },
  { label: 'Notice', path: '/profile/notices' },
];

function Profile() {
  const [tokenValid, setTokenValid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const username = useSelector((state) => state.username);
  const email = useSelector((state) => state.email);

  useEffect(() => {
    sendToken();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  async function sendToken() {
    let token_header = localStorage.getItem('token');
    try {
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
    } catch (error) {
      console.error("Error validating token:", error);
    }
  }

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Student Panel
        </Typography>
      </Toolbar>
      <List>
        {navItems.map((item, index) => (
          <ListItem button key={index} component={Link} to={item.path} onClick={() => setMobileOpen(false)}>
            {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <CssBaseline />
      {tokenValid ? (
        <Box sx={{ display: 'flex' }}>
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: 'none' } }}
              >
                {mobileOpen ? <MdClose /> : <GiHamburgerMenu />}
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Welcome, {username || 'Student'}
              </Typography>
            </Toolbar>
          </AppBar>

          <Box
            component="nav"
            sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
            aria-label="sidebar navigation"
          >
            {/* Mobile Drawer */}
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiDrawer-paper': { width: drawerWidth },
              }}
            >
              {drawer}
            </Drawer>

            {/* Desktop Drawer */}
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', md: 'block' },
                '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>

          {/* Main Content */}
          <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f4f6f8', minHeight: '100vh' }}>
            <Toolbar />
            <Outlet />
          </Box>
        </Box>
      ) : (
        <Box sx={{ p: 5 }}>
          <Typography variant="h6" gutterBottom>
            Your token has expired.
          </Typography>
          <Link to="/login" style={{ color: '#1976d2', fontWeight: 'bold', textDecoration: 'underline' }}>
            Login here
          </Link>{' '}
          again to continue.
        </Box>
      )}
    </>
  );
}

export default Profile;

