import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import theme from "../../MyTheme/Theme";

const useStyles = makeStyles({
    container: {
        display: "flex",
    },
    align_right: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",

    },
    align_left: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    helper_text:{
        color:theme.palette.grey["500"],
        fontSize:'0.75rem',
        marginLeft : theme.spacing(2)

    }

});





const Input_Information_Component = (props) => {
    const classes = useStyles();
    return (
        <Grid container spacing={1} className={classes.container}>
            <Grid item xs={4} className={classes.align_right}>
                {
                    props.Has_Icon ?
                        <ErrorOutlineIcon color='primary' className='mr-1'/>
                        :
                        null
                }
                <Typography>{props.Title + ':'}</Typography>
            </Grid>
            <Grid item xs={4} className={classes.align_left}>
                <TextField
                    variant='outlined'
                    label={null}
                    fullWidth
                    size='small'
                    error={false}
                    onChange={(e) =>props.Data_Set_Function(props.Data_Set_Name,e.target.value)}
                >
                </TextField>
            </Grid>
            <Grid item container xs={12} className={classes.align_left}>
                <Grid item xs={4} className={classes.align_right}>
                </Grid>
                <Grid item xs={4} className={classes.align_left}>
                    <Typography className={classes.helper_text}>{props.Helper_Text}</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Input_Information_Component;


