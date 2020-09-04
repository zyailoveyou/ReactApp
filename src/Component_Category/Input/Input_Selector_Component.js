import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from "@material-ui/core/Grid";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Typography from "@material-ui/core/Typography";
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
    helper_text: {
        color: theme.palette.grey["500"],
        fontSize: '0.75rem',
        marginLeft: theme.spacing(2)
    },
    MenuItem_size:{
      paddingLeft:'1rem',
      paddingRight:'1rem',
    }
});

const currencies = [
    {
        value: 'op1',

    },
    {
        value: 'op2',

    },
    {
        value: 'op3',

    },
    {
        value: 'op4',

    },
];

const Input_Selector_Component = (props) => {

    const [currency, setCurrency] = React.useState('op1');
    const classes = useStyles();
    //
    const handleChange = (e) => {
        setCurrency(e.target.value);
        props.Data_Set_Function(props.Data_Set_Name,e.target.value);
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={4} className={classes.align_right}>
                {
                    props.Has_Icon ?
                        <ErrorOutlineIcon color='primary' className='mr-1'/>
                        :
                        null
                }
                <Typography>{props.Title + ':'}</Typography>
            </Grid>
            <Grid item xs={1}>
                <TextField
                    id="standard-select-currency"
                    select
                    label="Select"
                    variant={"outlined"}
                    size={"small"}
                    value={currency}
                    onChange={(e)=>handleChange(e)}
                    fullWidth
                >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.value}
                        </MenuItem>
                    ))}
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

export default Input_Selector_Component;
