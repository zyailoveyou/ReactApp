import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../MyTheme/Theme";
import CheckIcon from '@material-ui/icons/Check';
import {animated, useSpring} from "react-spring";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from '@material-ui/core/Backdrop';
import {easeBounceOut} from "d3-ease";


const useStyles = makeStyles({
    Wrapper: {
        display: "flex",
        justifyContent: "center",
    },
    Dialog: {
        background: 'rgba(0, 0, 0, 0)',
        overflow: "hidden"

    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        background: 'rgba(0, 0, 0, 0)'
    },
})

const Dialog_Load = (props) => {
    const classes = useStyles(props);
    const {load} = props
    const animate = useSpring(
        {
            opacity: load ? 1 : 1,
            transform: load ? 'translate3d(0,0,0)':'translate3d(0,-50%,0)',
            config: {
                duration: 1000,
                easing:t=>easeBounceOut(t),
            }})

    return (
        <Backdrop className={classes.backdrop} open={load} transitionDuration={{appear: 100, enter: 100, exit: 1500}}
        >
            {
                load ? <CircularProgress size={'8rem'}/> :
                    <animated.div style={animate}>
                        <CheckIcon style={{
                            fontSize: '8rem',
                            color: 'green'
                        }}/>
                    </animated.div>
            }
        </Backdrop>
    );
};

export default Dialog_Load;
