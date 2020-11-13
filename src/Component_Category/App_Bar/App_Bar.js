import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Badge from '@material-ui/core/Badge';
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import theme from "../../MyTheme/Theme";
import Avatar from "@material-ui/core/Avatar";
import Avatar_Test from '../../Image/Logo/Avatar_Test.jpg'
import {makeStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import {fade} from "./styles/colorManipulator";
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import TouchRipple from "@material-ui/core/ButtonBase/TouchRipple";


const useStyles = makeStyles({
    Tool_Bar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",

    },
    Avatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    IconButton: {
        outline: "none !important",
        '&:hover': {
            backgroundColor: fade('#FFFFFF', 0.15),
        },
    }
});

const App_Bar = (props) => {
    const classes = useStyles();
    return (
        <AppBar position={"sticky"}>
            <Toolbar classes={{root: classes.root}}>
                <Grid container justify={"space-between"}>
                    <Grid item xs={2}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            className={classes.IconButton}
                        >
                            <MenuOpenIcon/>
                        </IconButton>
                    </Grid>
                    <Grid xs={10} container={true} item direction={"row"} spacing={1} justify={"flex-end"}>
                        <Grid item>
                            <IconButton
                                edge="start"
                                color="inherit"
                                className={classes.IconButton}
                            >
                                <Badge badgeContent={4} color="secondary">
                                    <NotificationsIcon/>
                                </Badge>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton
                                edge="start"
                                color="inherit"
                                className={classes.IconButton}
                            >
                                <Badge badgeContent={4} color="secondary">
                                    <ChatBubbleIcon/>
                                </Badge>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton
                                edge="start"
                                color="inherit"
                                className={classes.IconButton}
                            >
                                <Avatar src={Avatar_Test} className={classes.Avatar}/>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton
                                edge="start"
                                color="inherit"
                                className={classes.IconButton}
                            >
                                <PowerSettingsNewIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default App_Bar;
