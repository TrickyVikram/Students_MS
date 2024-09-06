import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Box, Avatar } from '@mui/material';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation


const Navbar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h6" component="div">
                <Button component={Link} to="/" color="inherit">
                  Home
                </Button>
                <Button component={Link} to="/dashboard" color="inherit">
                  Dashboard
                </Button>
       
              </Typography>
            </Grid>
            <Grid item>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button component={Link} to="/login" color="inherit">
                  Login
                </Button>
                <Button component={Link} to="/register" color="inherit">
                  Registration
                </Button>
                <Avatar
                  sx={{ ml: 2 }}
                  alt="Profile"
                  src="/static/images/avatar/1.jpg" // You can replace this with a dynamic profile image path
                />
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
