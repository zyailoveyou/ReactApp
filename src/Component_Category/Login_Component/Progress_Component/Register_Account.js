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
import Certification from "../Function_List/Certification_Function";
import theme from "../../../MyTheme/Theme";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Alert_Component from "../../Alert/Alert_Component";


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
        fontSize:'1.1rem',
        border:'4px'
    },
    Input:{
        '& fieldset': {
            borderWidth:2,
        },
    }
})

const Register_Account = (props) => {
    const classes = useStyles(props);
    const [emailState,setEmailState] = useState(-1);
    const [checkState,setCheckState] = useState({Checked:false});
    const setCheckData = (data_name, data) => {
        setCheckState((prevConfirm) => {
            return {...prevConfirm, [data_name]: data};
        })
    }

    const Email_Ref = useRef();
    const checkEmail = (value) =>{
        const a = Certification.Certify_Email(value)
        setEmailState(a)
    }

    const checkCondition = ()=>{
        if (emailState ===0 &&  checkState.Checked ===true){
            props.setCondition(true)
        }
        else props.setCondition(false)
    }

    useEffect(()=>{
        checkCondition()
    },[emailState,checkState])

    useEffect((e)=>{
        if (props.flashData === true){
            props.setInfoGroup((preInfo)=>{
                return {...preInfo,'email':Email_Ref.current.value}
            })
            props.setflashData(false);
        }
    },[props.flashData])

    return (

        <Grid container direction={"column"} spacing={3}>
            <Grid item id={'testup'}>
                <TextField
                    label={'请输入注册邮箱'}
                    size={"medium"}
                    fullWidth
                    InputLabelProps={{
                        classes: {
                            root: classes.label,
                            focused: classes.label_focused,
                        }
                    }}
                    InputProps={{
                        classes: {
                            underline: classes.input_underline,
                            root:classes.Input
                        },
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon color={"primary"} fontSize={"default"}/>
                            </InputAdornment>
                        ),
                        inputRef:Email_Ref
                    }}
                    inputProps={{
                        className: classes.Input_Text
                    }
                    }
                    onChange={e =>checkEmail(e.target.value)}
                    onBlur={e =>checkEmail(e.target.value)}
                    helperText={function () {
                        switch (emailState) {
                            case -1:
                                return null
                            case 0:
                                return null
                            case 1:
                                return '邮箱不能为空'
                            case 2:
                                return '邮箱格式不正确'
                        }
                    }()}
                    error={function () {
                        if (emailState === 0||emailState === -1){
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
                <Alert_Component content={'请注意填写真实邮箱，需要接受验证邮件'} severity={'warning'} switch={false}></Alert_Component>
            </Grid>
            <Grid item>
                <Check_Box_With_Text
                    Title="协议认可"
                    Helper_Text='协议认可'
                    Data_Set_Name={'Checked'}
                    Data_Set_Function = {setCheckData}
                    Has_Icon={false}/>
            </Grid>
        </Grid>
    );
};

export default Register_Account;
