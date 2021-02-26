import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Box from "@material-ui/core/Box";
import LensIcon from '@material-ui/icons/Lens';
import Grid from '@material-ui/core/Grid';
import {v4 as uuidv4} from "uuid";
import theme from "../../../MyTheme/Theme";


const useStyles = makeStyles({

    Box_Container: {
        width: '100%',
    },
    HasIcon_Upper: {
        position: "relative"
    },
    HasIcon_Lower: {
        position: "relative",
        top: 2,
    }
});


const Type_Selector = (props) => {

    const {
        margin,
        variant,
        hiddenLabel,
        size,
        hasIcon,
        Data_Group,
        Value,
        Title,
        setValue,
        onValueChange,
    } = props
    const classes = useStyles(props);
    const handleChange = (e) => {
        console.log(e.target.value)
        setValue(e.target.value);
        if (onValueChange) {
            onValueChange(e.target.value)
        }
    };

    return (
        <Box className={classes.Box_Container}>
            <TextField
                fullWidth
                margin={margin}
                select
                label={Title}
                variant={variant ? variant : 'outlined'}
                hiddenLabel={hiddenLabel}
                size={size ? size : 'small'}
                value={Value}
                margin="normal"
                onChange={(e) => handleChange(e)}
            >
                {Data_Group.map((option, index) => {
                    return (
                        <MenuItem key={option.id + option.color} value={index}>
                            <Grid container direction={"row"} spacing={1} className={classes.HasIcon_Upper}>
                                <Grid item>
                                    <LensIcon style={{
                                        color: option.color
                                    }}/>
                                </Grid>
                                <Grid item className={classes.HasIcon_Lower}>
                                    {option.text}
                                </Grid>
                            </Grid>
                        </MenuItem>
                    )
                })}
            </TextField>
        </Box>
    );
};

export default Type_Selector;
