import React from 'react';
import Typography from "@material-ui/core/Typography";
import {Grid} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../../MyTheme/Theme";
//Icons
import Button_Progress from "../../Progress_Bar/Button_Progress";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog_Component from "../../Dialog/Dialog_Component";


const useStyles = makeStyles({
    Wrapper: {
        display: "flex",
        justifyContent: "center",
    },
})

const Loading_Result = (props) => {
    const classes = useStyles(props);
    const {load, setLoad, success, setSuccess,error,setError} = props
    const handleClosed = () => {
        console.log('closed')
    }
    return (
        <Box>
            <Button_Progress
                load={load}
                setLoad={setLoad}
                success={success}
                setSuccess={setSuccess}
                Fab_Size={'8rem'}
                Circle_Size={'9rem'}
                Circle_Position={-8}/>

            <Dialog_Component
                open={success}
                setOpen={setSuccess}
                type = {'success'}
                title = {'注册成功'}
                content = {'注册账号成功，请到注册邮箱激活账号后登录'}
            />
            <Dialog_Component
                open={error}
                setOpen={setError}
                type = {'error'}
                title = {'注册失败'}
                content = {'注册账号失败,请稍后重试'}
            />
        </Box>
    );
};

export default Loading_Result;
