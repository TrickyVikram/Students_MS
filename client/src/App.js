import React from "react";
import {
  Container,
  Grow,
  AppBar,
  Typography,
  Grid
} from "@material-ui/core";
import Student from "./components/showStudent/showStudent";
import CreateStudent from "./components/createStudent/createStudent";
import useStyles from "./styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Container maxWidth="lg">
          {/* <AppBar className={classes.appBar} position="static" color="inherit">
            <Typography className={classes.heading} variant="h2" align="center">
              Student Management System
            </Typography>
          </AppBar>
          <Grow in>
            <Container>
              <Grid container justifyContent="space-between" alignItems="stretch">
                <Grid item xs={12} sm={7}>
                  <AppBar
                    className={classes.appBar}
                    position="static"
                    color="inherit"
                  >
                    <Student />
                  </AppBar>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <AppBar
                    className={classes.appBar}
                    position="static"
                    color="inherit"
                  >
                    <CreateStudent />
                  </AppBar>
                </Grid>
              </Grid>
            </Container>
          </Grow> */}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default App;
