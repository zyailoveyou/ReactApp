import React,{useMemo,memo} from 'react';
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import {useHistory, useLocation} from "react-router-dom";
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../MyTheme/Theme";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import WarningIcon from '@material-ui/icons/Warning';
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles({
    root: {},
    title: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: (props) => {
            switch (props.type) {
                case 'success':
                    return theme.palette.success.main
                case 'error':
                    return theme.palette.error.main
                case 'warning':
                    return theme.palette.warning.main
            }
        },
        height: '8rem',
        padding:'5rem',
    },
    content: {
        padding: '3rem'
    },
    Dialog: {
        borderRadius: '0.5rem !important',
        width:'400px'
    },
    center:{
        display:"flex",
        justifyContent:"center",
    },
    Button:{
        background:(props)=>{
            switch (props.type) {
                case 'success':
                    return theme.palette.success.main
                case 'error':
                    return theme.palette.error.main
                case 'warning':
                    return theme.palette.warning.main
            }
        },
        '&:hover': {
            background:(props)=>{
                switch (props.type) {
                    case 'success':
                        return theme.palette.success.main
                    case 'error':
                        return theme.palette.error.main
                    case 'warning':
                        return theme.palette.warning.main
                }
            }
        },
    }

})

const Dialog_Component = (props) => {
    console.log('render dialog component')
    const {open, setOpen, title, content, type} = props
    const classes = useStyles(props);
    const history = useHistory();
    const location = useLocation();
    const handleClose = () => {
        console.log(history)
        console.log(location)
        if (location.pathname ==='/'){
            window.location.reload(true)
        }
        else {
            history.push('/')
        }
    }
    return (
        <Dialog
            open={open}
            onClose={()=>{
                setOpen(false)
            }}
            classes={{
                paper: classes.Dialog
            }}
            disableBackdropClick = {false}
        >
            <Paper elevation={3}>
                <Box className={classes.title}>
                    {
                        function () {
                            switch (type) {
                                case 'success':
                                    return (
                                        <CheckCircleIcon
                                            style={{fontSize: '7rem', color:theme.palette.primary.contrastText}}
                                        />
                                    )
                                case 'error':
                                    return (
                                        <CancelIcon
                                            style={{fontSize: '7rem', color: "white"}}
                                        />
                                        )
                                case 'warning':
                                    return (
                                        <WarningIcon
                                            style={{fontSize: '7rem', color: "white"}}
                                        />
                                    )
                            }

                        }()
                    }
                </Box>
                <Box className={classes.content}>
                    <Grid container spacing={4} direction={"column"}>
                        <Grid item className={classes.center}>
                            <Typography variant={'h4'}>{title}</Typography>
                        </Grid>
                        <Grid item className={classes.center}>
                            <Typography variant={'body1'}>{content}</Typography>
                        </Grid>
                        <Grid item>
                            <Button variant={"contained"}
                                    fullWidth
                                    style={{outline: "none"}}
                                    onClick={handleClose}
                                    classes={{
                                        root: classes.Button
                                    }}
                                    >
                                <Typography variant={'body1'} style={{
                                    color:theme.palette.primary.contrastText
                                }}>确定</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Dialog>
    );
};

export default memo(Dialog_Component);
