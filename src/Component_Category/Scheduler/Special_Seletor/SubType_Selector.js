import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Box from "@material-ui/core/Box";
import LensIcon from '@material-ui/icons/Lens';
import Grid from '@material-ui/core/Grid';
import InputAdornment from "@material-ui/core/InputAdornment";
import LockIcon from "@material-ui/icons/Lock";
import theme from "../../../MyTheme/Theme";
import {v4 as uuidv4} from "uuid";


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


const SubType_Selector = (props) => {

    const {
        margin,
        variant,
        hiddenLabel,
        size,
        hasIcon,
        Data_Group,
        Value,
        Title,
        onValueChange,
    } = props
    const classes = useStyles(props);
    const [currency, setCurrency] = useState(Value);


    const handleChange = (e) => {
        console.log(e.target.value)
        setCurrency(e.target.value);
        if (onValueChange) {
            onValueChange(e.target.value)
        }

    };

    const creatMenu = () => {
        if (Data_Group) {
            return (
                Data_Group.map((option, index) => {
                        return (
                            <MenuItem key={uuidv4()} value={option.text}>

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
                    }
                )
            )
        } else {
            return null
        }

    }

    return (

        <Box className={classes.Box_Container}>
            <TextField
                id="standard-select-currency"
                fullWidth
                margin={margin}
                select
                label={Title}
                variant={variant ? variant : 'outlined'}
                hiddenLabel={hiddenLabel}
                size={size ? size : 'small'}
                value={currency}
                margin="normal"
                onChange={(e) => handleChange(e)}
            >
                {
                    Data_Group.map((option, index) => {
                        return (
                            <MenuItem key={index+index} value={index}>
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
                    })
                }
            </TextField>
        </Box>
    );
};

export default SubType_Selector;
