import React, {useContext, useEffect, useState} from "react";
import Button_Group from "../Button/Button_Group";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';
import Dialog_Component from "../Dialog/Dialog_Component";
import TextField from '@material-ui/core/TextField';
import Logo from '../../Image/Logo/Logo.png';
import Typography from "@material-ui/core/Typography";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import theme from "../../MyTheme/Theme";
import {fade} from '@material-ui/core/styles/colorManipulator';
import Register_Dialog from "./Register_Dialog";
import {Box} from "@material-ui/core";

import CloudBase_Context from "../../Context/Context_Info/CloudBase_Context";



const useStyles = makeStyles({

    label_text: {
        color: 'white',
        fontSize: '1rem',
    },
    label_focused: {
        color: 'white !important',
    },
    label: {
        color: theme.palette.grey["300"],
        fontSize: '1.2rem',
    },
    input_text: {
        color: 'white !important',
        height:'30px',
        fontSize: '1.1rem',

    },
    input_underline: {
        '&:after': {
            borderBottomColor: 'white !important',
        },
        // '&$focused:after': {
        //     borderBottomColor: 'red',
        //     transform: 'scaleX(100)',
        // },
        '&:before': {
            borderBottomColor: theme.palette.grey["100"]
        },

        '&:hover:not($disabled):before': {
            borderBottomColor: 'white !important',
            borderBottom: '2px solid !important',
        },

        '&$disabled:before': {
            borderBottomColor: 'white',
        },
    },
    image_Logo: {
        width: '8rem',
        height: '7.5rem',
        background: theme.palette.grey["200"],
        padding: '0.5rem',
        borderRadius: '1rem',
        marginBottom: '0.5rem',
    },
    main_Panel: {
        background: fade(theme.palette.grey.A700, 0.9),
        padding: '2rem',
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: '1rem',
        width: '40vh'
    }
});


const Login_Register_Panel = (props) => {
    const classes = useStyles();
    const CloudBase = useContext(CloudBase_Context)
    const Login_Data_Initial = {
        UserName: '',
        PassWord: '',
        Certification: '',
    }
    const {Logging,Set_Logging} = props
    const [Login_failed,Set_Login_failed] = useState(false);
    const [Login_Data, Set_Login_Data] = useState(Login_Data_Initial);
    const [Open_Dialog, Set_Open_Dialog] = useState(false);



    const history = useHistory();

    const SetUserName = (UserName_Input) => {
        console.log('执行了Set_Username')
        Set_Login_Data((PreData) => {
            return {...PreData, UserName: UserName_Input};
        })
    }

    const SetPassWord = (PassWord_Input) => {
        console.log('执行了Set_Password')
        Set_Login_Data((PreData) => {
            return {...PreData, PassWord: PassWord_Input};
        })
    }

    const Set_Certification = (Certification_Input) => {
        Set_Login_Data((PreData) => {
            return {...PreData, Certification: Certification_Input};
        })
    }

    const OnClickLogin = () => {
        //执行登录操作
        Set_Logging(true)
        CloudBase.auth.signInWithEmailAndPassword(Login_Data.UserName,Login_Data.PassWord).then((loginState)=>{
            console.log(loginState)
            console.log('登录成功')
            Set_Logging(false)
            history.push('/Main/Home');
        }).catch(function onReject(e) {
            Set_Logging(false)
            Set_Login_failed(true)
            console.error('some problem happened', e);
        })

        // history.push('/Main/Home');
    }

    const OnClickRegister = () => {
        console.log('执行了OnClickRegister')
        Set_Open_Dialog(true);
    }

    const handleClickOpen_Dialog = () => {
        Set_Open_Dialog(true);
    };

    const handleClose_Dialog = () => {
        Set_Open_Dialog(false);
        console.log('关闭了dialog')
    };

    return (
        <Box>
            <Grid container className={classes.main_Panel} spacing={3}>
                <Grid item>
                    <img src={Logo} alt="" className={classes.image_Logo}/>
                    <Typography className={classes.label_text}>眼球后台管理系统</Typography>
                </Grid>
                <Grid item>
                    <Grid container direction={"column"} spacing={3}>
                        <Grid item>
                            <TextField
                                label={'账号'}
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
                                            <AccountCircleIcon color={"primary"}/>
                                        </InputAdornment>
                                    )
                                }}
                                inputProps={{
                                    className: classes.input_text

                                }
                                }
                                onBlur={event => SetUserName(event.target.value)}
                            >
                            </TextField>
                        </Grid>
                        <Grid item>
                            <TextField
                                label={'密码'}
                                type={'password'}
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
                                            <LockIcon color={"primary"}/>
                                        </InputAdornment>
                                    )
                                }}
                                inputProps={{
                                    className: classes.input_text
                                }
                                }
                                onBlur={event => SetPassWord(event.target.value)}
                            >
                            </TextField>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Button_Group OnClickLogin={OnClickLogin} OnClickRegister={OnClickRegister}/>
                </Grid>
            </Grid>
            <Register_Dialog
                open={Open_Dialog}
                setOpen = {Set_Open_Dialog}
                onClose={handleClose_Dialog}
                onOpen={handleClickOpen_Dialog}
            />
            <Dialog_Component
                open={Login_failed}
                setOpen={Set_Login_failed}
                type = {'error'}
                title = {'登录失败'}
                content = {'登录失败，页面将在3秒后自动跳转。'}
            />
        </Box>

    );
}

export default Login_Register_Panel;
