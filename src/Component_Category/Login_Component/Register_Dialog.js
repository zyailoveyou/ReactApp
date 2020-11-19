import React, {useEffect, useLayoutEffect, useState,useRef} from 'react';
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


const Register_Dialog = (props) => {
    const target = useRef(null);
    const classes = useStyles();
    const {open, onClose, onOpen,} = props;
    const [activeStep, setActiveStep] = useState(0);
    const [shouldUpdate,setShouldUpdate] = useState(false);
    const [checkCondition,setCheckCondition] = useState(false);
    const [dimensions, setDimensions] = useState({});
    const ref = useRef()

    const Step_Pages = [
        <Register_Account
            Condition ={checkCondition}
            setCondition = {setCheckCondition}
            shouldUpdate={shouldUpdate}
            setShouldUpdate={setShouldUpdate}
        />,
        <Confirm_Password
            Condition ={checkCondition}
            setCondition = {setCheckCondition}
            shouldUpdate={shouldUpdate}
            setShouldUpdate={setShouldUpdate}
        />,
        <Loading_Result
            Condition ={checkCondition}
            setCondition = {setCheckCondition}
            shouldUpdate={shouldUpdate}
            setShouldUpdate={setShouldUpdate}
        />,
    ]

    //展开动画测试
    let Expand_Height = useSpring({
        height: open ? 657 : 0
    })

    useLayoutEffect(() => {
        console.log('组件挂在')
        if (target.current) {
            console.log(target.current.offsetWidth)
            console.log(target.current.offsetHeight)
        } else {
            console.log(0)
        }
    })

    const transitions = useTransition(activeStep, p => p, {
        from: {opacity: 0, transform: 'translate3d(100%,0,0)'},
        enter: {opacity: 1, transform: 'translate3d(0%,0,0)', position: "relative"},
        leave: {opacity: 0, transform: 'translate3d(-50%,0,0)', position: "absolute"},
    })

    const handleNext = () => {
        // setActiveStep((prevActiveStep) => (prevActiveStep + 1) % 3);
        setShouldUpdate(true);
        if(checkCondition)
        {
            setActiveStep((prevActiveStep) => (prevActiveStep + 1));
            setCheckCondition(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={"lg"}
            classes={{
                paper: classes.Dialog
            }}
        >
            <animated.div ref={target}>
                <Grid container direction={"column"} className={classes.Dialog_Content}>
                    <Grid item>
                        <img src={Banner} alt="" style={{width: '450px', height: "100px"}}/>
                    </Grid>
                    <Grid item style={{width: '450px', height: "100%", padding: '20px 10px 35px 10px'}}>
                        <Grid container direction={"column"} spacing={2}>
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
                                    <Grid item>
                                        {
                                            transitions.map(({item, props, key}) => {
                                                return (
                                                    <animated.div style={props} key={key}
                                                                  className={classes.Step_Content}>
                                                        {
                                                            Step_Pages[item]
                                                        }
                                                    </animated.div>
                                                )
                                            })
                                        }
                                    </Grid>
                                    <Grid item>
                                        {
                                            function () {
                                                if (activeStep === Step_Pages.length - 1) {
                                                    return null
                                                } else {
                                                    return (
                                                        <Button
                                                            className={classes.Button}
                                                            color="primary"
                                                            variant='contained'
                                                            size={"large"}
                                                            fullWidth
                                                            onClick={handleNext}
                                                        >下一步
                                                        </Button>)
                                                }
                                            }()
                                        }
                                    </Grid>
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
