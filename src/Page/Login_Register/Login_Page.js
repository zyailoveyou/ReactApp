import React, {useState} from "react";
import Login_Register_Panel from '../../Component_Category/Login_Component/Login_Register_Panel'
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import LinearProgress from '@material-ui/core/LinearProgress';
import useSignOut from "../../Hook/useSignOut";

const useStyles = makeStyles({
    root: {
        position: "relative",
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: "100vh",
        background: "url('../Image/BackGround/Cyber3.jpg')",
        backgroundSize: "100% 100%",
        zIndex: '1'
    },
    Liner_Progress: {
        position: "absolute",
        top: 0,
        left: 0,
        height: 5,
        width: 'inherit'
    }

});


const Login_Page = () => {
    const classes = useStyles();
    const [Login_Success,Set_Login_Success] = useState(false)
    const [Logging,Set_Logging] = useState(false)
    useSignOut()
    return (
        <Box className={classes.root}>
            {
                Logging&&<LinearProgress color="primary" className={classes.Liner_Progress}/>
            }
            <Login_Register_Panel
                Logging={Logging}
                Set_Logging={Set_Logging}
            />
        </Box>

    )
}

export default Login_Page;
