import React from 'react';
import Box from "@material-ui/core/Box";
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../MyTheme/Theme";
//Icons
import BackupIcon from '@material-ui/icons/Backup';
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles({
    Icon:{
        width:'3rem',
        height:'3rem',
    },

    Wrapper: {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
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
    },
    Progress_Bar: {
        position: 'absolute',
        color:theme.palette.success.main,
        top: props => props.Circle_Position,
        left: props => props.Circle_Position,
        zIndex: -1,
    },

})

const Button_Progress = (props) => {
    const classes = useStyles(props);
    return (
        <Box className={classes.Wrapper}>
            <Fab className={classes.Button} color={"primary"} >
                <Typography variant={"h5"}>请稍等</Typography>
            </Fab>
            <CircularProgress

                className={classes.Progress_Bar}
                size={props.Circle_Size}
            />
        </Box>
    );
};

export default Button_Progress;
