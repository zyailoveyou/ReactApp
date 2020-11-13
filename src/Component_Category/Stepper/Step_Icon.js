import React from 'react';
import FavoriteIcon from "@material-ui/icons/Favorite";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import StarsIcon from "@material-ui/icons/Stars";
import Box from "@material-ui/core/Box";
import StepLabel from '@material-ui/core/StepLabel';
import {makeStyles} from "@material-ui/core/styles";
import clsx from 'clsx';


const useStyles = makeStyles({
    root: {
        backgroundColor: 'green',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundColor: 'red',
        fontSize:'1rem'
    },
    completed: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    },
});


const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    },
});



const Step_Icon = (props) => {
    const classes = useStyles();
    const Icons = [<FavoriteIcon/>, <ThumbUpIcon/>, <StarsIcon/>]
    const {active, completed} = props;
    console.log(active)
    console.log(completed)

    return (
        <StepLabel icon={Icons[props.index]}
                   className={clsx(classes.root,{
                       [classes.active]:active,
                   })}
                   >
            {props.label}
        </StepLabel>
    );
};

export default Step_Icon;
