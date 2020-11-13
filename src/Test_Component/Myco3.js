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

import useResizeObserver from '@react-hook/resize-observer'


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

const useSize = (target) => {
    const [size, setSize] = React.useState()

    React.useLayoutEffect(() => {
        setSize(target.current.getBoundingClientRect())
    }, [target])

    // Where the magic happens
    useResizeObserver(target, (entry) => setSize(entry.contentRect))
    return size
}

export default function Myco3() {
    const target = React.useRef(null)
    const size = useSize(target)
    console.log(size)
    return (
        <pre ref={target}>
            123123123</pre>
    )
}