import React, {useState, useCallback, useRef,useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Box} from "@material-ui/core";
import {useSpring, animated, useTransition} from 'react-spring'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {easeBounceIn} from "d3-ease";
import {easeQuadInOut} from "d3-ease";
import transitions from "@material-ui/core/styles/transitions";
import useResizeObserver from '@react-hook/resize-observer';

import cloudbase from "@cloudbase/js-sdk";



const useStyles = makeStyles((theme) => ({
    root: {
        cursor: "pointer",
        position: "absolute",
        width:"100%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        fontWeight:800,
        fontSize:'5rem',
        willChange:'transform, opacity',
        textShadow:'0px 2px 40px #00000020, 0px 2px 5px #00000030',
    },
}));


const app = cloudbase.init({
    env: "good-5gou5n09e975182b"
});


const email = "zyailoveyou123@163.com";
const password = "z456";
const test= () =>{



}


export default function Myco3() {

    app
        .auth()
        .signUpWithEmailAndPassword(email, password)
        .then(() => {
            console.log('23')
        }).catch(function (reason) {
            console.log(reason)
    })
    return (
        <div>123123123</div>
    )
}