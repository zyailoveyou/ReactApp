import React, {useEffect, useRef, useState} from 'react';
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
//Icons
import LockIcon from '@material-ui/icons/Lock';
import theme from "../../../MyTheme/Theme";
//my_component
import Alert_Component from "../../Alert/Alert_Component";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Certification from "../Function_List/Certification_Function";


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
        height:'30px',
        fontSize: '1.1rem',
    },
    Caption: {
        color: theme.palette.secondary.main
    }
})

const ConfirmPassword = (props) => {
    const classes = useStyles(props);
    const [showPassword, setShowPassword] = React.useState([false,false]);
    const [passwordState,setPassWordState] = useState(-1);
    const [confirmPassWordState,setConfirmPassWordState] = useState(-1)
    const confirmRef = useRef();
    const passwordRef = useRef();

    const handleClickShowPasswordPass = () => {
        setShowPassword((prev)=>{
            console.log([!prev[0],prev[1]])
            return [!prev[0],prev[1]]
        });
    };

    const handleClickShowPasswordSecondConfirm = () => {
        setShowPassword((prev)=>{
            return[prev[0],!prev[1]]
        });
    };
    const checkPassword = (value) =>{
        const a = Certification['Certify_Password'](value,confirmRef.current.value)
        setPassWordState(a)
        if (a === 0||a===2){
            setConfirmPassWordState(a)
        }
    }

    const checkConfirmPassWord = (value)=>{
        const a = Certification['Certify_Confirm_Password'](value,passwordRef.current.value)
        setConfirmPassWordState(a)
    }

    const checkCondition = ()=>{
        if (passwordState ===0 || confirmPassWordState ===0){
            props.setCondition(true)
        }
        else {
            props.setCondition(false)
        }
    }

    useEffect(()=>{
        checkCondition()
    },[passwordState,confirmPassWordState])

    useEffect(()=>{
        if (props.flashData === true){
            props.setInfoGroup((preInfo)=>{
                return {...preInfo,'password':passwordRef.current.value}
            })
            props.setflashData(false);
        }
    },[props.flashData])

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
                                    style={{
                                        outline:"none"
                                    }}
                                >
                                    {showPassword[0] ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                        inputRef:passwordRef
                    }}
                    inputProps={{
                        className: classes.Input_Text
                    }
                    }
                    onChange={e =>checkPassword(e.target.value)}
                    onBlur={e =>checkPassword(e.target.value)}
                    helperText={function () {
                        switch (passwordState) {
                            case 0:
                                return null
                            case 1:
                                return '密码不能为空'
                            case 3:
                                return '密码至少包含两个英文，不少于8位，不超过16位'
                        }
                    }()}
                    error={function () {
                        if (passwordState === 0 ||passwordState === -1||passwordState===2){
                            return false
                        }
                        else{
                            return true
                        }
                    }()}
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
                                    onClick={handleClickShowPasswordSecondConfirm}
                                    style={{
                                        outline:"none"
                                    }}
                                >
                                    {showPassword[1] ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                        inputRef:confirmRef
                    }}
                    inputProps={{
                        className: classes.Input_Text
                    }
                    }

                    onChange={e =>checkConfirmPassWord(e.target.value)}
                    onBlur={e =>checkConfirmPassWord(e.target.value)}
                    helperText={function () {
                        switch (confirmPassWordState) {
                            case 0:
                                return null
                            case 1:
                                return '确认密码不能为空'
                            case 2:
                                return '两次输入密码不一致'
                        }
                    }()}
                    error={function () {
                        if (confirmPassWordState===0 || confirmPassWordState===-1){
                            return false
                        }
                        else{
                            return true
                        }
                    }()}
                >
                </TextField>
            </Grid>
            <Grid item>
                <Alert_Component content={'请注意认真保管您的密码'} severity={'info'} switch={false}></Alert_Component>
            </Grid>
        </Grid>
    );
};

export default ConfirmPassword;