import React from 'react';
import { Container, AppBar, Typography } from "@material-ui/core";
import useStyles from "../styles"; // Make sure to import useStyles if it's defined in another file

function Home() {
  const classes = useStyles(); // Call the hook here to get the classes

  return (
    <div>
      <Container>
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className={classes.heading} variant="h2" align="center">
            Welcome to Student Management System
          </Typography>
        </AppBar>
      </Container>
    </div>
  );
}

export default Home;
