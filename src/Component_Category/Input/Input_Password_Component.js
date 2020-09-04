import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
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

const Input_Password_Component = (props) => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });


    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
        props.Data_Set_Function(props.Data_Set_Name,event.target.value);
    };

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Grid container className={classes.container} spacing={1}>
            <Grid item xs={4} className={classes.align_right}>
                {
                    props.Has_Icon?
                        <ErrorOutlineIcon color='primary' className='mr-1'/>
                        :
                        null
                }
                <Typography>{props.Title + ':'}</Typography>
            </Grid>
            <Grid item xs={4} className={classes.align_left}>
                <TextField
                    id="standard-adornment-password"
                    size={"small"}
                    variant='outlined'
                    value={values.password}
                    onChange={handleChange('password')}
                    type={(values.showPassword ? 'text' : 'password')}
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>,
                    }}
                />
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

export default Input_Password_Component;
