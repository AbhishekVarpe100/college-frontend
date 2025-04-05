import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Material UI imports
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Container,
  Paper,
  Alert,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@mui/material';

// Material UI icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    type: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
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
          setError(true);
        } else if (response.data === 'user_saved') {
          setSuccess(true);
        }
        setFormData({ 'username': '', 'email': '', 'password': '', 'type': '' });
        setTimeout(() => {
          setSuccess(false);
          setError(false);
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 5,
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url("https://marvel-b1-cdn.bc0a.com/f00000000234031/www.pacificu.edu/sites/default/files/styles/page_banner/public/Pacific%20University%20Banner%20Spring%202024.jpg?itok=Q8qRVKCX")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ x: -500 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={8}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: 'rgba(236, 246, 253, 0.95)',
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 'bold',
                color: '#0d47a1',
                textAlign: 'center',
                mb: 2,
                height: '80px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              AcademiaHub University
            </Typography>
            
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#424242' }}>
              Register
            </Typography>

            {error && (
              <Alert 
                severity="error" 
                icon={<WarningIcon />}
                sx={{ width: '100%', mb: 2 }}
              >
                <Typography variant="subtitle2">Warning</Typography>
                <Typography variant="body2">Username or email already exists</Typography>
              </Alert>
            )}

            {success && (
              <Alert 
                severity="success" 
                icon={<CheckCircleIcon />}
                sx={{ width: '100%', mb: 2 }}
              >
                <Typography variant="subtitle2">Registered</Typography>
                <Typography variant="body2">Registered successfully</Typography>
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 1 }}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="type-label">Select register type</InputLabel>
                <Select
                  labelId="type-label"
                  id="type"
                  name="type"
                  value={formData.type}
                  label="Select register type"
                  onChange={handleChange}
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
                variant="outlined"
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
                variant="outlined"
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
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <FormHelperText sx={{ mt: 2 }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: '#1976d2', textDecoration: 'underline' }}>
                  Login here
                </Link>
              </FormHelperText>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                sx={{ mt: 3, mb: 2, py: 1.5 }}
              >
                Register
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default RegistrationForm;
