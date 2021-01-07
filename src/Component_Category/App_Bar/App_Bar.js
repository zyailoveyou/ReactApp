import React, {useContext, useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from "@material-ui/core/IconButton";
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Badge from '@material-ui/core/Badge';
import theme from "../../MyTheme/Theme";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import {fade} from "./styles/colorManipulator";
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import User_Context from "../../Context/Context_Info/User_Context";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog_Component from "../Dialog/Dialog_Component";


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
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        outline: "none !important",
        '&:hover': {
            backgroundColor: fade('#FFFFFF', 0.15),
        },
    },
    Progress_Bar: {
        position: "absolute",
        zIndex: 10,
    },
});

const App_Bar = (props) => {
    const classes = useStyles();
    const [File, setFile] = useState(null)
    const [Load, setLoad] = useState(true)
    const [Open,setOpen] = useState(false)
    const User = useContext(User_Context)

    useEffect(()=>{
        if (User !=null){
            console.log(User)
            setFile(User.AvatarUrl)
            setLoad(false)
        }
        else {
            setLoad(false)
        }
    },[])

    const handleClick =()=>{
        setOpen(true)
    }

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
                                {
                                    Load ? <CircularProgress className={classes.Progress_Bar} size={'1rem'}/> : null
                                }
                                <Avatar src={File} className={classes.Avatar}/>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton
                                edge="start"
                                color="inherit"
                                className={classes.IconButton}
                                onClick={handleClick}
                            >
                                <PowerSettingsNewIcon/>
                            </IconButton>
                            <Dialog_Component
                                open={Open}
                                setOpen={setOpen}
                                type={'warning'}
                                title={'退出登录?'}
                                content={'点击确定退出登录，点击空白处取消'}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default App_Bar;
