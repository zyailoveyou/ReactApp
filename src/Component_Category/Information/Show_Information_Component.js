import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles({
    container: {
        padding:'1.5rem',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: '20vh',
        width:'100%'
    }
});


const Show_Information_Component = (props) => {
    const classes = useStyles()
    return (
        <Paper className={classes.container} elevation={3}>
            <Grid container item spacing={3}>
                <Grid item xs={12}>
                    <Typography variant={'h5'}>{props.Title}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider variant='middle'></Divider>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={"body1"}>
                        {props.Content}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Show_Information_Component;
