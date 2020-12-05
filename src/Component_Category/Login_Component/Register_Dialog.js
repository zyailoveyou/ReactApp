import React, {useEffect, useLayoutEffect, useState, useRef} from 'react';
import ReactDOM from 'react-dom'
import {Grid} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Banner from '../../Image/Logo/Banner.png'
import {makeStyles} from "@material-ui/core/styles";
import Horizontal_Stepper from "../Stepper/Horizontal_Stepper";
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import {animated, useSpring, useTransition} from 'react-spring';
//Icons
import theme from "../../MyTheme/Theme";
import Register_Account from "./Progress_Component/Register_Account";
import Confirm_Password from "./Progress_Component/Confirm_Password";
import Loading_Result from "./Progress_Component/Loading_Result";
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import Box from "@material-ui/core/Box";

//后台
import cloudbase from "@cloudbase/js-sdk";

const useStyles = makeStyles({
    Dialog: {
        borderRadius: '1rem !important',
        overflow: 'hidden !important',
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
    Step_Content: {
        overflow: "hidden",
        // position:"relative"
    },
})

const app = cloudbase.init({
    env: "good-5gou5n09e975182b"
});


const Register_Dialog = (props) => {
    const target = useRef(null);
    const classes = useStyles();
    const {open, setOpen, onClose, onOpen,} = props;
    //控制界面跳转及动画
    const [activeStep, setActiveStep] = useState(0);
    //控制判断下一步的条件
    const [checkCondition, setCheckCondition] = useState(false);
    //控制是否应当设置数据
    const [flashData, setFlashData] = useState(false);
    const [load, setLoad] = useState();
    const [success, setSuccess] = useState();
    //数据集
    const [infoGroup, setInfoGroup] = useState({
        email: "",
        password: "",
    })

    const Step_Pages = [
        <Register_Account
            Condition={checkCondition}
            setCondition={setCheckCondition}
            flashData={flashData}
            setflashData={setFlashData}
            infoGroup={infoGroup}
            setInfoGroup={setInfoGroup}
        />,
        <Confirm_Password
            Condition={checkCondition}
            setCondition={setCheckCondition}
            flashData={flashData}
            setflashData={setFlashData}
            infoGroup={infoGroup}
            setInfoGroup={setInfoGroup}
        />,
        <Loading_Result
            load={load}
            setLoad={setLoad}
            success={success}
            setSuccess={setSuccess}
        />,
    ]


    useEffect(() => {
        console.log(infoGroup)
        if (activeStep === 2) {
            // app
            //     .auth()
            //     .signUpWithEmailAndPassword(infoGroup.email, infoGroup.password)
            //     .then(() => {
            //
            //     }).catch(function (reason) {
            //     console.log(reason)
            // })
        }
    }, [infoGroup], [activeStep])

    const transitions = useTransition(activeStep, p => p, {
        from: {opacity: 0, transform: 'translate3d(100%,0,0)'},
        enter: {opacity: 1, transform: 'translate3d(0%,0,0)', position: "relative"},
        leave: {opacity: 0, transform: 'translate3d(-50%,0,0)', position: "absolute"},
    })

    const handleNext = () => {
        // setActiveStep((prevActiveStep) => (prevActiveStep + 1) % 3);
        // setShouldUpdate(true);
        console.log(activeStep)
        setFlashData(true)
        if (checkCondition) {
            setActiveStep((prevActiveStep) => (prevActiveStep + 1));
            setCheckCondition(false);
        }
    };

    const handleClosed = () => {
        setOpen(false)
        setActiveStep(0)
        // setShouldUpdate(false)
        setCheckCondition(false)
        onClose();
    }

    return (
        <Dialog
            open={open}
            onClose={handleClosed}
            disableBackdropClick={true}
            maxWidth={"lg"}
            classes={{
                paper: classes.Dialog
            }}
        >
            <animated.div ref={target}>
                <Grid container direction={"column"} className={classes.Dialog_Content}>
                    <Grid item>
                        <Box style={{
                            position: "relative"
                        }}>
                            <IconButton
                                style={{
                                    outline: "none",
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    color: theme.palette.primary.main,
                                }}
                                onClick={handleClosed}
                            >
                                <CancelIcon fontSize={'large'}/>
                            </IconButton>
                            <img src={Banner} alt="" style={{width: '450px', height: "60px"}}/>
                        </Box>
                    </Grid>
                    <Grid item style={{width: '450px', height: "100%", padding: '20px 10px 35px 10px'}}>
                        <Grid container direction={"column"} spacing={3}>
                            <Grid item>
                                <Typography variant={"h4"}
                                            style={{display: 'flex', justifyContent: 'center'}}>欢迎注册</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant={"body1"} style={{display: 'flex', justifyContent: 'center'}}>This
                                    is a
                                    detail information for describing register laws</Typography>
                            </Grid>
                            <Grid item>
                                <Link href='#' style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    color: theme.palette.primary.light
                                }}>
                                    点击获取详细信息
                                </Link>
                            </Grid>
                            <Grid item>
                                <Horizontal_Stepper activeStep={activeStep}/>
                            </Grid>
                            <Grid item>
                                <Grid container direction={"column"} spacing={3}
                                      style={{paddingLeft: '3rem', paddingRight: '3rem'}}>

                                        <Grid item style={{display: "flex", justifyContent: "center"}}>
                                            {
                                                transitions.map(({item, props, key}) => {
                                                    return (
                                                        <animated.div style={{
                                                            ...props,
                                                            width:'100%',
                                                            display:"flex",
                                                            justifyContent:"center",
                                                        }} key={key}>
                                                            {
                                                                Step_Pages[item]
                                                            }
                                                        </animated.div>
                                                    )
                                                })
                                            }
                                        </Grid>

                                    {
                                        function () {
                                            if (activeStep === Step_Pages.length - 1) {
                                                return null
                                            } else {
                                                return (
                                                    <Grid item>
                                                        <Button
                                                            className={classes.Button}
                                                            color="primary"
                                                            variant='contained'
                                                            size={"large"}
                                                            fullWidth
                                                            disabled={!checkCondition}
                                                            onClick={handleNext}
                                                        >下一步
                                                        </Button>
                                                    </Grid>
                                                )
                                            }
                                        }()

                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </animated.div>
        </Dialog>
);
};

export default Register_Dialog;
