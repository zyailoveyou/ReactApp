import React, {useState, useEffect,useRef,useLayoutEffect} from 'react';

import {Grid} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Banner from '../../Image/Logo/Banner.png'
import {makeStyles} from "@material-ui/core/styles";
import Horizontal_Stepper from "../Stepper/Horizontal_Stepper";
import Typography from "@material-ui/core/Typography";
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import Link from '@material-ui/core/Link';
import {useSpring, animated, useTransition} from 'react-spring';
import Paper from '@material-ui/core/Paper';
import useResizeObserver from '@react-hook/resize-observer'
//Icons
import theme from "../../MyTheme/Theme";
import Register_Account from "./Progress_Component/Register_Account";
import useMeasure from 'react-use-measure'
import Box from "@material-ui/core/Box";



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


const Step_Pages = [
    <Register_Account/>,
    <div>good</div>,
    <div>hello</div>,
]


const Register_Dialog = (props) => {
    const target = React.useRef(null)

    const {open, onClose, onOpen,} = props
    const [activeStep, setActiveStep] = useState(0);
    const defaultHeight = 400;
    const [dimensions, setDimensions] = useState({ width:0, height: 0 });

    //展开动画测试
    const Expand_Height = useSpring({
        height: open ? 625 : 0
    })

    const transitions = useTransition(activeStep, p => p, {
        from: {opacity: 0, transform: 'translate3d(100%,0,0)'},
        enter: {opacity: 1, transform: 'translate3d(0%,0,0)', position: "relative"},
        leave: {opacity: 0, transform: 'translate3d(-50%,0,0)', position: "absolute"},
    })


    const classes = useStyles();
    const handleNext = () => {
        setActiveStep((prevActiveStep) => (prevActiveStep + 1) % 3);
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
            <animated.div ref={target} style={Expand_Height}>
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
                                <Grid container direction={"column"} spacing={2}
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
                                        <Button
                                            className={classes.Button}
                                            color="primary"
                                            variant='contained'
                                            size={"large"}
                                            fullWidth
                                            onClick={handleNext}
                                        >下一步
                                        </Button>
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
