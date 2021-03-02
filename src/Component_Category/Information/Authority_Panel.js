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
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';


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

const Authority_Panel = () => {
    const classes = useStyles()
    return (
        <Paper style={{
            width: '100%',
            height: '100%',
        }} elevation={3}>
            <LinearProgress/>
            <Box className={classes.container}>
                <List className={classes.root}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <ImageIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <WorkIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Work" secondary="Jan 7, 2014" />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <BeachAccessIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Vacation" secondary="July 20, 2014" />
                    </ListItem>
                </List>


            </Box>
        </Paper>
    );
};

export default Authority_Panel;
