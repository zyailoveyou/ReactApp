import React from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Avatar_Test from '../../Image/Logo/Avatar_Test.jpg'
import {makeStyles} from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import theme from "../../MyTheme/Theme";
import Button from '@material-ui/core/Button';
import BusinessIcon from "@material-ui/icons/Business";
import Link from "@material-ui/core/Link";
import FaceIcon from "@material-ui/icons/Face";
import ScheduleIcon from "@material-ui/icons/Schedule";
import PinDropIcon from "@material-ui/icons/PinDrop";


const useStyles = makeStyles({
    Avatar: {
        width: '8rem',
        height: '8rem',
    },
    Center: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap"
    },
    Outline: {
        outline: "none !important",
    },
    container: {
        padding: "1rem",
    },
})


const test = ['football', 'basketball', 'pingpong', 'tennis', 'travel', 'music', 'swimming']

const Chips_Profile = (props) => {
    const classes = useStyles();
    return (
        <Paper style={{
            width: '100%',
            height: '100%',
        }} elevation={3}>
            <Box className={classes.container}>
                <Grid container direction={"column"} spacing={1} style={{}}>
                    <Grid item>
                        <Typography variant={'h6'}>This is the details</Typography>
                    </Grid>
                    <Grid item>
                        <Grid container direction={'row'} spacing={1} className={classes.Center}>
                            {
                                test.map((item, index, array) => {
                                    if (index === 0) {
                                        return (
                                            <Grid item key={item}>
                                                <Chip label={item} size={"small"} color={'primary'}/>
                                            </Grid>
                                        )
                                    } else {
                                        return (
                                            <Grid item key={item}>
                                                <Chip label={item} size={"small"}/>
                                            </Grid>

                                        )
                                    }
                                })
                            }
                        </Grid>
                    </Grid>
                </Grid>

            </Box>
        </Paper>

    );
};

export default Chips_Profile;
