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


const Show_Information_Component = () => {
    const classes = useStyles()
    return (
        <Paper className={classes.container} elevation={3}>
            <Grid container item spacing={3}>
                <Grid item xs={12}>
                    <Typography variant={'h5'}>使用说明</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider variant='middle'></Divider>
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        一般情况下在某种条件下使用这种表格，请需要填写你公司的基本信息的时候使用
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Show_Information_Component;
