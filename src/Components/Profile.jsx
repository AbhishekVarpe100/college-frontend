import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { FaBloggerB, FaGraduationCap } from "react-icons/fa6";
import { MdPhoneInTalk, MdClose } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgNotes } from "react-icons/cg";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Box
} from '@mui/material';

function Profile() {
  const [tokenValid, setTokenValid] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme'));

  const username = useSelector((state) => state.username);
  const email = useSelector((state) => state.email);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    sendToken();
  }, []);

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

  const navLinks = [
    { text: 'About', to: '/profile/' },
    { text: 'Examinations', to: '/profile/examinations', icon: <FaGraduationCap className="ml-2" /> },
    { text: 'Admissions', to: '/profile/admissions' },
    { text: 'Placements', to: '/profile/placements' },
    { text: 'Campus and events videos', to: '/profile/campus' },
    { text: 'Blogs', to: '/profile/blogs', icon: <FaBloggerB className="ml-2" /> },
    { text: 'Contact Us', to: '/profile/contact_us', icon: <MdPhoneInTalk className="ml-2" /> },
    { text: 'Results', to: '/profile/results', icon: <CgNotes className="ml-2" /> },
    { text: 'Notice', to: '/profile/notices' }
  ];

  return (
    <div>
      {tokenValid ? (
        <>
          <AppBar position="static" sx={{ backgroundColor: theme === 'dark' ? 'black' : 'white', color: theme === 'dark' ? 'white' : 'black' }}>
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar} sx={{ display: { md: 'none' } }}>
                {isSidebarOpen ? <MdClose /> : <GiHamburgerMenu />}
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Welcome, {username}
              </Typography>
            </Toolbar>
          </AppBar>

          {/* Sidebar Drawer */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': {
                width: 250,
                backgroundColor: theme === 'dark' ? '#111' : '#f9f9f9',
                color: theme === 'dark' ? '#fff' : '#000'
              }
            }}
            open
          >
            <List>
              <Typography variant="h6" sx={{ m: 2, fontWeight: 'bold' }}>Content</Typography>
              {navLinks.map((item, index) => (
                <ListItem
                  button
                  key={index}
                  component={Link}
                  to={item.to}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <ListItemText primary={item.text} />
                  {item.icon && <span>{item.icon}</span>}
                </ListItem>
              ))}
            </List>
          </Drawer>

          {/* Sidebar for small screens */}
          <Drawer
            variant="temporary"
            open={isSidebarOpen}
            onClose={toggleSidebar}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': {
                width: 250,
                backgroundColor: theme === 'dark' ? '#111' : '#f9f9f9',
                color: theme === 'dark' ? '#fff' : '#000'
              }
            }}
          >
            <List>
              <Typography variant="h6" sx={{ m: 2, fontWeight: 'bold' }}>Content</Typography>
              {navLinks.map((item, index) => (
                <ListItem
                  button
                  key={index}
                  component={Link}
                  to={item.to}
                  onClick={toggleSidebar}
                >
                  <ListItemText primary={item.text} />
                  {item.icon && <span>{item.icon}</span>}
                </ListItem>
              ))}
            </List>
          </Drawer>

          {/* Main Content */}
          <Box component="main" sx={{ marginLeft: { md: 30 }, padding: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <Outlet />
          </Box>
        </>
      ) : (
        <div className="m-10">
          Your token has expired{' '}
          <Link
            className="text-blue-700 font-bold hover:underline hover:text-blue-400"
            to="/login"
          >
            Login here
          </Link>{' '}
          again to continue
        </div>
      )}
    </div>
  );
}

export default Profile;

