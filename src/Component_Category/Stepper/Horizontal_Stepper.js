import React from 'react';
import {makeStyles, withStyles} from "@material-ui/core/styles";
import StepConnector from '@material-ui/core/StepConnector';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import SettingsIcon from "@material-ui/icons/Settings";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import clsx from "clsx";
import theme from "../../MyTheme/Theme";


const useStyles = makeStyles({
        Icon: {
            width: '40px',
            height: '40px',
        },
        Icon_Active: {

        },
        Icon_Completed: {
            color:theme.palette.success.main+'!important'
        },
        Stepper: {
            padding: 0,
        },
        Step: {
            padding: 0,
        },
    }
);

const useCustomStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    },
});


const QontoConnector = withStyles({
    alternativeLabel: {
        top: 25,
        left: 'calc(-45% + 20px)',
        right: 'calc(55% + 20px)',
    },
    active: {
        '& $line': {},
    },
    completed: {
        '& $line': {},

    },
    line: {
        borderColor: '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
})(StepConnector);


const CustomStepIcon = (props) => {
    const classes = useCustomStepIconStyles();
    const {active, completed} = props;

    const icons = {
        1: <SettingsIcon/>,
        2: <GroupAddIcon/>,
        3: <VideoLabelIcon/>,
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}


const steps = ['注册', '填写', '完成'];
const Horizontal_Stepper = (props) => {

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    return (

        <Stepper
            activeStep={props.activeStep}
            className={classes.Stepper}
            alternativeLabel
            connector={<QontoConnector/>}
        >
            {steps.map((label, index) => {
                return (
                    <Step key={label} className={classes.Step}>
                        {/*<Step_Icon label ={label} index={index}/>*/}
                        {/*<StepLabel icon={Icons[index]}>{label}</StepLabel>*/}
                        {/*<StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>*/}
                        <StepLabel StepIconProps={{
                            classes: {
                                root: classes.Icon,
                                active: classes.Icon_Active,
                                completed:classes.Icon_Completed,
                            }
                        }}>{label}</StepLabel>
                    </Step>
                );
            })}
        </Stepper>

    );
};

export default Horizontal_Stepper;
