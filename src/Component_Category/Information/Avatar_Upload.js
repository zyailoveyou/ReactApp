import React, {useContext, useMemo, useState, memo, useEffect} from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Avatar_Test from '../../Image/Logo/Avatar_Test.jpg'
import {makeStyles} from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import theme from "../../MyTheme/Theme";
import Button from '@material-ui/core/Button';
import CircularProgress from "@material-ui/core/CircularProgress";
import CloudBase_Context from "../../Context/Context_Info/CloudBase_Context";
import useGetAvatar from "../../Hook/useGetAvatar";
import User_Context from "../../Context/Context_Info/User_Context";

const useStyles = makeStyles({
    Avatar: {
        width: '8rem',
        height: '8rem',
    },
    Center: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    Outline: {
        outline: "none !important",
    },
    container: {
        padding: "1rem",
    },
    Input: {
        display: "none"
    },
    Progress_Bar: {
        position: "absolute",
        zIndex: 10,
    },
})

const Avatar_Upload = (props) => {

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
        {
            setLoad(false)
        }
    },[])



    const handleGetFile = (event) => {
        console.log(event.target.files[0])
        const file = event.target.files[0]
        props.Data_Set_Function(props.Data_Set_Name, file)
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            setFile(reader.result)
        }, false);
        reader.readAsDataURL(file);
    }

    return (
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
                            <Typography variant={'body1'}>请注意图片大小不要超过2MB</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={'body1'}>推荐128X128大小的图片</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container direction={'row'} spacing={1} className={classes.Center}>
                        <Grid item>
                            <input
                                accept="image/*"
                                className={classes.Input}
                                id="file_upload"
                                multiple
                                type="file"
                                onChange={(e) => handleGetFile(e)}
                            />
                            <label htmlFor="file_upload">
                                <Button
                                    size={"medium"}
                                    variant={"contained"}
                                    color={"primary"}
                                    component={"span"}
                                    className={classes.Outline}
                                >上传头像</Button>
                            </label>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
};

export default memo(Avatar_Upload);
