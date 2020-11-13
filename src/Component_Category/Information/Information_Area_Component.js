import React from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles({
    container: {
        height: '100%',
        width:'100%'
    }
});

const Information_Area_Component = (props) => {
    const classes = useStyles()
    return (
        <Paper className={classes.container} elevation={2}>
            {props.data}
        </Paper>
    );
};

export default Information_Area_Component;
