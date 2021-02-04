import React,{useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Box from "@material-ui/core/Box";


const useStyles = makeStyles({

    box_Container: {
        width:'100%',
        height:'100%',
    },

});


const Input_Selector_Component = (props) => {

    const classes = useStyles(props);
    const {Value,Title} = props
    const {Data_Group} = props
    const [currency, setCurrency] = useState(Value);

    const handleChange = (e) => {
        setCurrency(e.target.value);
        props.Data_Set_Function(props.Data_Set_Name, e.target.value);
    };

    return (

        <Box className={classes.box_Container}>
            <TextField
                id="standard-select-currency"
                fullWidth
                select
                label={Title}
                variant={"outlined"}
                size={"small"}
                value={currency}
                onChange={(e) => handleChange(e)}
            >
                {Data_Group.map((option,index) => (
                    <MenuItem key={option+index} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    );
};

export default Input_Selector_Component;