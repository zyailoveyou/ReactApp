import React from 'react';
import Box from "@material-ui/core/Box";
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../MyTheme/Theme";
//Icons
import BackupIcon from '@material-ui/icons/Backup';
import Typography from "@material-ui/core/Typography";
import Loading_Result from "../Login_Component/Progress_Component/Loading_Result";
import CheckIcon from '@material-ui/icons/Check';
import clsx from "clsx";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles({
    Icon:{
        width:'3rem',
        height:'3rem',
    },

    Wrapper: {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent:'center',
        margin: theme.spacing(1),
    },

    Button: {
        outline: "none !important",
        cursor:"default !important",
        '&:hover':{
            background:theme.palette.primary.main
        },
        pointerEvents:"none",
        width: props => props.Fab_Size,
        height: props => props.Fab_Size,
        zIndex:2,
    },

    ButtonSuccess: {
        backgroundColor: theme.palette.success.main,
        '&:hover': {
            backgroundColor: theme.palette.success.main,
        },
    },


    Progress_Bar: {
        position: 'absolute',
        color:theme.palette.secondary.main,
        top: props => props.Circle_Position,
        left: props => props.Circle_Position,
        zIndex: 1,
    },

})

const Button_Progress = (props) => {
    const classes = useStyles(props);
    const {load, setLoad, success, setSuccess,} = props

    const handleClosed = ()=>{
        console.log('closed')
    }

    const ButtonClassCombine = clsx({
        [classes.Button]:true,
        [classes.ButtonSuccess]: success,
    });

    return (
        <Box className={classes.Wrapper}>
            <Fab className={ButtonClassCombine} color={"primary"} >
                {
                    //success? <CheckIcon fontSize={'50px'} /> :<Typography variant={"h5"}>请稍等</Typography>
                    success? <CheckIcon style={{ fontSize: 50 }} />:<Typography variant={"h5"}>请稍等</Typography>
                }
            </Fab>
            {
                load ? <CircularProgress
                    className={classes.Progress_Bar}
                    size={props.Circle_Size}
                />:null
            }
        </Box>
    );
};

export default Button_Progress;
