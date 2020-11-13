import React from "react";
import Login_Register_Panel from '../Component_Category/Login_Component/Login_Register_Panel'
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Back_Ground from '../Image/BackGround/Cyber3.jpg'


const useStyles = makeStyles({
    root2: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width: '100%',
        height:"100vh",
        backgroundImage: "url(" + { Back_Ground } + ")",
        backgroundSize:"100% 100%",

        zIndex:'-2'
    },
});


const Login_Page = () => {
    const classes = useStyles();
    return (
        <Box className={classes.root2}>
            <Login_Register_Panel/>
        </Box>
    )
}

export default Login_Page;
