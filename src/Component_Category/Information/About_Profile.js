import React from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import PinDropIcon from '@material-ui/icons/PinDrop';
import BusinessIcon from '@material-ui/icons/Business';
import ScheduleIcon from '@material-ui/icons/Schedule';
import FaceIcon from '@material-ui/icons/Face';

const useStyles = makeStyles({

    Center: {
        display: "flex",
        justifyContent: 'center',
        alignItems: "start",
        flexWrap: "wrap"
    },
    container: {
        padding: "1rem",
    },

})

const About_Profile = (props) => {
    const classes = useStyles();
    return (
        <Paper style={{
            width: '100%',
            height: '100%',
        }} elevation={3}>
            <Box className={classes.container}>
                <Grid container direction={"column"} spacing={1}>
                    <Grid item>
                        <Typography variant={'h6'}>This is the details</Typography>
                    </Grid>
                    <Grid item>
                        <Grid container direction={'column'} spacing={1} className={classes.Center}>
                            <Grid item>
                                <Grid container direction={"row"} spacing={1}>
                                    <Grid item>
                                        <BusinessIcon fontSize={"small"}/>
                                    </Grid>
                                    <Grid item style={{
                                        position: "relative",
                                        paddingTop: '8px',
                                    }}>
                                        <Link href={'#'}>办公室</Link>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container direction={"row"} spacing={1}>
                                    <Grid item>
                                        <FaceIcon fontSize={"small"}/>
                                    </Grid>
                                    <Grid item style={{
                                        position: "relative",
                                        paddingTop: '8px',
                                    }}>
                                        <Link href={'#'}>行政助理</Link>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container direction={"row"} spacing={1}>
                                    <Grid item>
                                        <ScheduleIcon fontSize={"small"}/>
                                    </Grid>
                                    <Grid item style={{
                                        position: "relative",
                                        paddingTop: '8px',
                                    }}>
                                        <Link href={'#'}>6年</Link>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container direction={"row"} spacing={1}>
                                    <Grid item>
                                        <PinDropIcon fontSize={"small"}/>
                                    </Grid>
                                    <Grid item style={{
                                        position: "relative",
                                        paddingTop: '8px',
                                    }}>
                                        <Link href={'#'}>新都区汇景新城</Link>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </Box>
        </Paper>


    );
};

export default About_Profile;
