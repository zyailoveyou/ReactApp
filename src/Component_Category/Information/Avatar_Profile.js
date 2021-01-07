import React, {memo, useContext, useEffect, useState} from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import User_Context from "../../Context/Context_Info/User_Context";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    Avatar: {

        width: '8rem',
        height: '8rem',
    },
    Center: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center"
    },
    Outline: {
        outline: "none !important",
    },
    container: {
        padding: "1rem",
    },
    Progress_Bar: {
        position: "absolute",
        zIndex: 10,
    },
})

const Avatar_Profile = (props) => {

    const classes = useStyles();
    const [File, setFile] = useState(null)
    const [Load, setLoad] = useState(true)
    const User = useContext(User_Context);

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
                    <Grid item className={classes.Center}>
                        {
                            Load ? <CircularProgress className={classes.Progress_Bar} size={'5rem'}/> : null
                        }
                        <Avatar src={File} className={classes.Avatar}/>
                    </Grid>
                    <Grid item>
                        <Grid container direction={"column"} className={classes.Center}>
                            <Grid item>
                                <Typography variant={'body1'}>This is the details</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant={'body1'}>This is the details2</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction={'row'} spacing={1} className={classes.Center}>
                            <Grid item>
                                <Button
                                    size={"small"}
                                    variant={"contained"}
                                    color={"primary"}
                                    className={classes.Outline}
                                >click</Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    size={"small"}
                                    color={"secondary"}
                                    variant={"contained"}
                                    className={classes.Outline}
                                >click2</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    )

};

export default memo(Avatar_Profile);
