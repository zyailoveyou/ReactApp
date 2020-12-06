import React, {useEffect, useRef} from 'react';
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import {Route, useHistory, useLocation} from "react-router-dom";
import Button from '@material-ui/core/Button';

const Dialog_Component = (props) => {
    const {open, setOpen} = props
    const history = useHistory();
    const timer = useRef();
    const handleClose = () => {
        console.log(history)
        window.location.reload(true)
        // history.push('/')
        // history.push('/Main/Corporation/Worker')
    }

    useEffect(() => {
        console.log('进入effect')
        timer.current = window.setInterval(() => {
            console.log('执行跳转')
            window.location.reload(true)
        }, 5000)
    })

    return (
        <Box>
            <Dialog
                open={open}
            >
                <DialogTitle id="alert-dialog-slide-title">{"账号注册成功"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        账号注册成功，请到注册邮箱点击激活邮件后返回登录，本页面将在5秒后自动刷新
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/*<Button onClick={handleClose} color="primary">*/}
                    {/*    Disagree*/}
                    {/*</Button>*/}
                    <Button style={{outline:"none"}} onClick={handleClose} color="primary">
                        刷新
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Dialog_Component;
