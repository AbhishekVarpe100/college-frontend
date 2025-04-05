import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

// Material UI imports
import {
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Paper,
  Box,
  Alert,
  FormHelperText,
  Container,
} from "@mui/material";
import { Visibility, VisibilityOff, Login as LoginIcon } from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [alert, setAlert] = useState({ show: false, message: "", severity: "info" });
  const [formErrors, setFormErrors] = useState({ username: false, password: false });

  // Create a custom theme for classic Material UI look
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#f50057",
      },
    },
    typography: {
      fontFamily: ["Roboto", "Arial", "sans-serif"].join(","),
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 4,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset form errors
    setFormErrors({ username: false, password: false });
    
    try {
      const response = await axios.post("https://college-backend-4-cgya.onrender.com/login", {
        type,
        username,
        password,
      });
      
      localStorage.setItem("token", `bearer ${response.data.token}`);
      localStorage.setItem("username", `${response.data.userName}`);
      localStorage.setItem("email", `${response.data.email}`);
      localStorage.setItem("type", `${response.data.type}`);

      if (response.data.message === "login_success_user") {
        setAlert({ show: true, message: "Login successful! Redirecting...", severity: "success" });
        setTimeout(() => {
          navigate("/profile");
          dispatch({ type: "USERNAME", payload: response.data.userName });
          dispatch({ type: "EMAIL", payload: response.data.email });
        }, 2000);
      } else if (response.data.message === "login_success_staff") {
        setAlert({ show: true, message: "Login successful! Redirecting...", severity: "success" });
        setTimeout(() => {
          navigate("/staff");
          dispatch({ type: "USERNAME", payload: response.data.userName });
          dispatch({ type: "EMAIL", payload: response.data.email });
        }, 2000);
      } else if (response.data.message === "login_success_admin") {
        setAlert({ show: true, message: "Login successful! Redirecting...", severity: "success" });
        setTimeout(() => {
          navigate("/admin");
          dispatch({ type: "USERNAME", payload: response.data.userName });
          dispatch({ type: "EMAIL", payload: response.data.email });
        }, 2000);
      } else if (response.data === "user not found") {
        setFormErrors({ ...formErrors, username: true });
        setAlert({ show: true, message: "User not found", severity: "error" });
      } else if (response.data === "incorrect password") {
        setFormErrors({ ...formErrors, password: true });
        setAlert({ show: true, message: "Incorrect password", severity: "error" });
      }

    } catch (e) {
      console.log(e);
      setAlert({ show: true, message: "An error occurred. Please try again.", severity: "error" });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    if (localStorage.getItem("username") && localStorage.getItem("email")) {
      const userType = localStorage.getItem("type");
      if (userType === "student") {
        navigate("/profile");
      } else if (userType === "staff") {
        navigate("/staff");
      } else if (userType === "admin") {
        navigate("/admin");
      }
    }
  }, [navigate]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2196f3 0%, #64b5f6 100%)",
          padding: 2,
        }}
      >
        <Container maxWidth="sm">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Paper elevation={8} sx={{ p: 4 }}>
              <Typography variant="h4" component="h1" align="center" gutterBottom fontWeight="500">
                Login
              </Typography>

              {alert.show && (
                <Alert severity={alert.severity} sx={{ mb: 2 }}>
                  {alert.message}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <FormControl fullWidth margin="normal" required>
                  <InputLabel id="login-type-label">Login Type</InputLabel>
                  <Select
                    labelId="login-type-label"
                    id="login-type"
                    value={type}
                    label="Login Type"
                    onChange={(e) => setType(e.target.value)}
                  >
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value="student">Student</MenuItem>
                    <MenuItem value="staff">Staff</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                  {!type && (
                    <FormHelperText error>Please select your login type</FormHelperText>
                  )}
                </FormControl>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  error={formErrors.username}
                  helperText={formErrors.username ? "Invalid username" : ""}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={formErrors.password}
                  helperText={formErrors.password ? "Invalid password" : ""}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<LoginIcon />}
                  sx={{ mt: 3, mb: 2, py: 1.5 }}
                >
                  Sign In
                </Button>
              </Box>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Login;
