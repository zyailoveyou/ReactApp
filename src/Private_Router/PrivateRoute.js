import React, {Component, useContext, useEffect, useState} from 'react';
import {Route, useHistory, withRouter} from 'react-router-dom';
import CloudBase_Context from "../Context/Context_Info/CloudBase_Context";
import Dialog_Component from "../Component_Category/Dialog/Dialog_Component";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles({
    root: {
        display: "flex",
        width: '100%',
        height: "100vh",
        background: "url('../Image/BackGround/Cyber3.jpg')",
        backgroundSize: "100% 100%",
        zIndex: '1'
    },
})


const PrivateRoute = (props) => {
    const history = useHistory()
    const CloudBase = useContext(CloudBase_Context)
    const isAuthenticated = CloudBase.auth.hasLoginState() || false

    return (
        function () {
            if (isAuthenticated) {
                return (<Route {...props} />)
            } else {
                console.log('没有登录')
                history.replace('/Error')
                return (
                    null
                )
            }
        }()
    )

}

export default withRouter(PrivateRoute);
