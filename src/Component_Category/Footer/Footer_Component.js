import React from 'react';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    container: {
        display: "flex",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"transparent",
        height:'10vh'
    }
});

const Footer_Component = (props) => {
    const classes = useStyles();
    return (
        <Box className={classes.container}>
            <Typography variant={'body1'}>
                {props.Title}
            </Typography>
        </Box>

    );
};

export default Footer_Component;
