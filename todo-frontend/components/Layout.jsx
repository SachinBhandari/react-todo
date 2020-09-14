import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

const Layout = ({ heading, children }) => {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Grid container style={{ marginTop: '24px' }}>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h3" align="center" color="textSecondary">
            {heading}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {children}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  heading: PropTypes.string.isRequired
};

export default Layout;
