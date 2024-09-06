import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid, Box } from '@mui/material';
import axios from 'axios';
import GoogleIcon from '@mui/icons-material/Google';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/auth/login', { email, password });
      alert(response.data.message);
    } catch (err) {
      alert('Login failed: ' + err.response.data.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8,
          boxShadow: 3,
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Login
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Button
      type="button"
      fullWidth
      variant="outlined"
      sx={{ mt: 2 }}
      href="http://localhost:80/auth/google" // Correct Google OAuth URL
      startIcon={<GoogleIcon />}
    >
      Sign in with Google
    </Button>

        <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
          <Grid item>
            <Typography variant="body2">
              Don't have an account? <a href="/register">Sign up</a>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
