import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import DataService from "../../services/DataService";
import styles from './styles';

const Home = (props) => {
    const { classes } = props;

    console.log("================================== Home ======================================");

    // Component States

    // Setup Component

    // Handlers

    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Container maxWidth="lg" className={classes.container}>
                    Home page
                </Container>
            </main>
        </div>
    );
};

export default withStyles(styles)(Home);