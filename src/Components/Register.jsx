import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";
import { IoWarningSharp } from "react-icons/io5";

// Material UI imports
import { 
  Container,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Paper,
  Alert,
  AlertTitle
} from '@mui/material';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    type: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://college-backend-4-cgya.onrender.com/register', JSON.stringify(formData), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      localStorage.setItem('theme', 'light');

      setTimeout(() => {
        if (response.data === 'user_exist') {
          setError('user_exist');
        } else if (response.data === 'user_saved') {
          setSuccess('user_saved');
        }
        setFormData({ 'username': '', 'email': '', 'password': '', 'type': '' });
        setTimeout(() => {
          setSuccess("");
          setError("");
        }, 5000);
      }, 1000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url("https://marvel-b1-cdn.bc0a.com/f00000000234031/www.pacificu.edu/sites/default/files/styles/page_banner/public/Pacific%20University%20Banner%20Spring%202024.jpg?itok=Q8qRVKCX")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        py: 5
      }}
    >
      <Container maxWidth="sm">
        <Paper 
          elevation={8}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgba(255, 255, 255, 0.9)'
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            align="center" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              color: '#1976d2',
              mb: 2,
              height: '120px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            AcademiaHub University
          </Typography>
          
          <Typography variant="h5" component="h2" align="center" gutterBottom>
            Register
          </Typography>
          
          {error === 'user_exist' && (
            <Alert 
              severity="error" 
              icon={<IoWarningSharp />}
              sx={{ mb: 2 }}
            >
              <AlertTitle>Warning</AlertTitle>
              Username or email already exists
            </Alert>
          )}
          
          {success === 'user_saved' && (
            <Alert 
              severity="success" 
              icon={<FaCheckCircle />}
              sx={{ mb: 2 }}
            >
              <AlertTitle>Registered</AlertTitle>
              Registered successfully
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="type-label">Select register type</InputLabel>
              <Select
                labelId="type-label"
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                label="Select register type"
                required
              >
                <MenuItem value="">---Select---</MenuItem>
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="staff">Staff</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="body2">
                Already have an account? <Link to="/login" style={{ color: '#1976d2', textDecoration: 'underline' }}>Login here</Link>
              </Typography>
            </Box>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ 
                mt: 2, 
                mb: 2,
                py: 1,
                backgroundColor: '#2e7d32',
                '&:hover': {
                  backgroundColor: '#1b5e20'
                }
              }}
            >
              Register
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegistrationForm;
