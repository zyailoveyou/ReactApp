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
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
    root:{
        paddingLeft:props => {
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
});

const Input_Password_Component = (props) => {
    const classes = useStyles(props);
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });


    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Grid container direction={"column"} className={classes.root} spacing={1}>
            <Grid item>
                <Grid container alignItems={"center"}>
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
                                    size={"small"}
                                    variant='outlined'
                                    fullWidth
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    onBlur={(e) => props.Data_Set_Function(props.Data_Set_Name, e.target.value)}
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
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Typography className={classes.helper_text} noWrap>{props.Helper_Text}</Typography>
            </Grid>
        </Grid>
    );
};

export default Input_Password_Component;
