import React from 'react';
import {Grid} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
//Icons
import EmailIcon from '@material-ui/icons/Email';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import LockIcon from '@material-ui/icons/Lock';
import Typography from "@material-ui/core/Typography";
import theme from "../../../MyTheme/Theme";
import {Box} from "@material-ui/core";


import Check_Box_With_Text from "../../Check_Box/Check_Box_With_Text";

//my_component
import Alert_Component from "../../Alert/Alert_Component";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";


const useStyles = makeStyles({
    label_focused: {},
    label: {},
    Dialog: {
        borderRadius: '1rem !important',
    },
    Dialog_Content: {
        overflow: "hidden !important",
    },

    Button: {
        outline: "none !important",
        borderRadius: '2rem'
    },
    Input_Text: {
        fontSize: '1.4rem',
    },
    Caption: {
        color: theme.palette.secondary.main
    }
})

const ComfirmPassword = (props) => {
    const classes = useStyles(props);
    const [showPassword, setShowPassword] = React.useState([false,false]);
    const handleClickShowPasswordPass = () => {
        setShowPassword((prev)=>{
            console.log([!prev[0],prev[1]])
            return [!prev[0],prev[1]]
        });
    };
    const handleClickShowPasswordSecondComfirm = () => {
        setShowPassword((prev)=>{
            return[prev[0],!prev[1]]
        });
    };
    return (
        <Grid container direction={"column"} spacing={3}>
            <Grid item>
                <TextField
                    label={'请输入注册密码'}
                    fullWidth
                    InputLabelProps={{
                        classes: {
                            root: classes.label,
                            focused: classes.label_focused,
                        }
                    }}
                    InputProps={{
                        classes: {
                            underline: classes.input_underline
                        },
                        type: function () {
                            return showPassword[0] ? 'text' : 'password'
                        }(),
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon color={"primary"}/>
                            </InputAdornment>
                        ),
                        endAdornment:(
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPasswordPass}
                                >
                                    {showPassword[0] ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    inputProps={{
                        className: classes.Input_Text
                    }
                    }
                >
                </TextField>
            </Grid>
            <Grid item>
                <TextField
                    label={'请输入确认密码'}
                    fullWidth
                    InputProps={{
                        classes: {
                            underline: classes.input_underline
                        },
                        type: function () {
                            return showPassword[1] ? 'text' : 'password'
                        }(),
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon color={"primary"}/>
                            </InputAdornment>
                        ),
                        endAdornment:(
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPasswordSecondComfirm}
                                >
                                    {showPassword[1] ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    inputProps={{
                        className: classes.Input_Text
                    }
                    }
                >
                </TextField>
            </Grid>
            <Grid item>
                <Alert_Component content={'请注意认真保管您的密码'} severity={'info'} switch={false}></Alert_Component>
            </Grid>
        </Grid>
    );
};

export default ComfirmPassword;