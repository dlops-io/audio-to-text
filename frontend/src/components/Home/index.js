import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import MicRecorder from 'mic-recorder-to-mp3';


import DataService from "../../services/DataService";
import styles from './styles';

const Home = (props) => {
    const { classes } = props;

    console.log("================================== Home ======================================");

    const recorder = new MicRecorder({ bitRate: 128 });

    // Component States
    const [isRecording, setIsRecording] = useState(false);
    const [blobURL, setBlobURL] = useState(null);
    const [isBlocked, setIsBlocked] = useState(false);

    // Setup Component
    useEffect(() => {
        // Get permission from user to use mic
        navigator.getUserMedia({ audio: true },
            () => {
                console.log('Permission Granted');
                setIsBlocked(false);
            },
            () => {
                console.log('Permission Denied');
                setIsBlocked(true);
            },
        );
    }, []);

    // Handlers
    const handleOnStartRecording = () => {
        if (isBlocked) {
            console.log('Permission Denied');
        } else {
            recorder
                .start()
                .then(() => {
                    setIsRecording(true);
                })
                .catch((e) => console.error(e));
        }
    }
    const handleOnStopRecording = () => {
        recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                setBlobURL(URL.createObjectURL(blob));
                setIsRecording(false);
            }).catch((e) => console.log(e));
    }

    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Container maxWidth={false} className={classes.container}>
                    <Grid container spacing={8}>
                        <Grid item md={4}>
                            <Card>
                                <CardContent>
                                    {blobURL &&
                                        <audio src={blobURL} controls="controls" />
                                    }
                                </CardContent>
                                <CardActions>
                                    {!isRecording &&
                                        <Button size="small" color="default" onClick={() => handleOnStartRecording()}>
                                            Start Recording
                                        </Button>
                                    }
                                    {isRecording &&
                                        <Button size="small" color="default" onClick={() => handleOnStopRecording()}>
                                            Stop Recording
                                        </Button>
                                    }
                                </CardActions>
                            </Card>
                        </Grid>

                    </Grid>
                </Container>
            </main>
        </div>
    );
};

export default withStyles(styles)(Home);