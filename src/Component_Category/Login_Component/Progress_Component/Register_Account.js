import React, {useState, useRef, useEffect} from 'react';
import {Grid} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
//Icons
import EmailIcon from '@material-ui/icons/Email';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import LockIcon from '@material-ui/icons/Lock';

import Check_Box_With_Text from "../../Check_Box/Check_Box_With_Text";


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
})


const Register_Account = (props) => {
    const classes = useStyles(props);
    const [emailState,setEmailState] = useState(-1);
    const [confirmState,setConfirmState] = useState(-1)

    const checkEmail = (e) =>{
        if (e.target.value ===''){
            setEmailState(0)
        }
        else {
            setEmailState(1)
        }
    }

    const checkConfirm = (e)=>{
        if (e.target.value ===''){
            setConfirmState(0)
        }
        else {
            setConfirmState(1)
        }
    }

    const checkCondition = ()=>{
        if (emailState ===1 && confirmState ===1){
            props.setCondition(true)
        }
    }

    useEffect(()=>{
        checkCondition()
    },[emailState,confirmState])



    return (
        <Grid container direction={"column"} spacing={3}>
            <Grid item>
                <TextField
                    label={'请输入注册邮箱'}
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
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon color={"primary"}/>
                            </InputAdornment>
                        ),
                    }}
                    inputProps={{
                        className: classes.Input_Text
                    }
                    }
                    onBlur={e =>checkEmail(e)}
                    helperText={function () {
                        switch (emailState) {
                            case 0:
                                return '邮箱不能为空'
                            case 1:
                                return null
                        }
                    }()}
                    error={function () {
                        if (emailState === 1||emailState===-1){
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
                    label={'请输入验证码'}
                    fullWidth
                    InputProps={{
                        classes: {
                            underline: classes.input_underline
                        },
                        startAdornment: (
                            <InputAdornment position="start">
                                <VpnKeyIcon color={"primary"}/>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position={'end'}>
                                <Button
                                    variant={"outlined"}
                                    size={"small"}
                                    color={"secondary"}
                                    className={classes.Button}
                                >
                                    获取验证码
                                </Button>
                            </InputAdornment>
                        )
                    }}
                    inputProps={{
                        className: classes.Input_Text
                    }
                    }
                    onBlur={e =>checkConfirm(e)}
                    helperText={function () {
                        switch (confirmState) {
                            case 0:
                                return '验证码不能为空'
                            case 1:
                                return null
                        }
                    }()}
                    error={function () {
                        if (confirmState === 1||confirmState===-1){
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
                <Check_Box_With_Text
                    Title="协议认可"
                    Helper_Text='协议认可'
                    Data_Set_Name={'Has_Read_Agreement'}
                    Has_Icon={false}/>
            </Grid>
        </Grid>
    );
};

export default Register_Account;
