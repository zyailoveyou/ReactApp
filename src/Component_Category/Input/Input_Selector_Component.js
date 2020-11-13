import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from "@material-ui/core/Grid";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Typography from "@material-ui/core/Typography";
import theme from "../../MyTheme/Theme";
import Box from "@material-ui/core/Box";


const useStyles = makeStyles({
    root: {
        paddingLeft: props => {
            return props.Padding
        }
    },
    helper_text: {
        color: theme.palette.grey["500"],
        fontSize: '0.75rem',
        marginLeft: (props => {
                let len = 0;
                for (let i = 0; i < props.Title.length; i++) {
                    let a = props.Title.charAt(i);
                    if (a.match(/[^\x00-\xff]/ig) != null) {
                        len += 1;
                    } else {
                        len += 0.5;
                    }
                }
                console.log(len)
                return len + 1 + 'rem'
            }
        )
    },
    box_Container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: '100%',
        flexWrap: "nowrap",
    },
    box_Title: {},
    box_Textfield: {
        flex: 1
    },
    MenuItem_size: {
        paddingLeft: '1rem',
        paddingRight: '1rem',
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
    const classes = useStyles(props);
    //
    const handleChange = (e) => {
        setCurrency(e.target.value);
        props.Data_Set_Function(props.Data_Set_Name, e.target.value);
    };

    return (
        <Grid container direction={"column"} className={classes.root} spacing={1}>
            <Grid item>
                <Grid container alignItems={"center"} spacing={1}>
                    <Grid item xs={12}>
                        <Box className={classes.box_Container}>
                            {
                                props.Has_Icon ?
                                    <ErrorOutlineIcon color='primary'/>
                                    :
                                    null
                            }
                            <Box className={classes.box_Title}>
                                <Typography>{props.Title + '：'}</Typography>
                            </Box>
                            <Box className={classes.box_Textfield}>
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    label="Select"
                                    variant={"outlined"}
                                    size={"small"}
                                    value={currency}
                                    onChange={(e) => handleChange(e)}

                                >
                                    {currencies.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.value}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Typography className={classes.helper_text}>{props.Helper_Text}</Typography>
            </Grid>
        </Grid>

    );
};

export default Input_Selector_Component;
