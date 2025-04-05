import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Container,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  InputAdornment,
  IconButton,
  Alert,
  Paper
} from "@mui/material";
import { motion } from "framer-motion";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");
  const [invalidUsername, setInvalidUsername] = useState("");
  const [invalidPassword, setInvalidPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://college-backend-4-cgya.onrender.com/login",
        { type, username, password }
      );

      localStorage.setItem("token", `bearer ${response.data.token}`);
      localStorage.setItem("username", response.data.userName);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("type", response.data.type);

      if (response.data.message === "login_success_user") {
        setSuccess("Login successful");
        setTimeout(() => {
          dispatch({ type: "USERNAME", payload: response.data.userName });
          dispatch({ type: "EMAIL", payload: response.data.email });
          navigate("/profile");
        }, 2000);
      } else if (response.data.message === "login_success_staff") {
        setSuccess("Login successful");
        setTimeout(() => {
          dispatch({ type: "USERNAME", payload: response.data.userName });
          dispatch({ type: "EMAIL", payload: response.data.email });
          navigate("/staff");
        }, 2000);
      } else if (response.data.message === "login_success_admin") {
        setSuccess("Login successful");
        setTimeout(() => {
          dispatch({ type: "USERNAME", payload: response.data.userName });
          dispatch({ type: "EMAIL", payload: response.data.email });
          navigate("/admin");
        }, 2000);
      } else if (response.data === "user not found") {
        setInvalidUsername("User not found");
      } else if (response.data === "incorrect password") {
        setInvalidPassword("Incorrect password");
      }

      setTimeout(() => {
        setInvalidUsername("");
        setInvalidPassword("");
        setSuccess("");
      }, 5000);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const type = localStorage.getItem("type");

    if (username && email) {
      if (type === "student") navigate("/profile");
      else if (type === "staff") navigate("/staff");
    }
  }, []);

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, cyan, white)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <motion.div initial={{ x: 500 }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
        <Container maxWidth="sm">
          <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
              Login
            </Typography>
            {success && <Alert severity="success">{success}</Alert>}
            {invalidUsername && <Alert severity="error">{invalidUsername}</Alert>}
            {invalidPassword && <Alert severity="error">{invalidPassword}</Alert>}

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
              <TextField
                select
                required
                fullWidth
                label="Login Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                margin="normal"
              >
                <MenuItem value="">---Select---</MenuItem>
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="staff">Staff</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </TextField>

              <TextField
                required
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
              />

              <TextField
                required
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 3, py: 1.5, fontWeight: 'bold' }}
              >
                Sign In
              </Button>
            </Box>
          </Paper>
        </Container>
      </motion.div>
    </Box>
  );
}

export default Login;

