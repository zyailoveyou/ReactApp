import React, {useEffect} from 'react';
import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Dialog_Component from "../../Component_Category/Dialog/Dialog_Component";
import {useHistory} from "react-router";

const useStyle = makeStyles({
    root: {
        display: "flex",
        width: '100%',
        height: "100vh",
        background: "url('../../Image/BackGround/Cyber3.jpg')",
        backgroundSize: "100% 100%",
        zIndex: '1'
    },
})

const Error_Page = (props) => {
    console.log('render error page')
    const classes = useStyle()
    const history = useHistory()
    const {type, title, content, open, setOpen} = props
    // useEffect(() => {
    //     window.setTimeout(() => {
    //         history.replace("/");
    //     }, 5000)
    // }, [])

    return (
        <Box className={classes.root}>
            <Dialog_Component
                open={open}
                setOpen={setOpen}
                type={type}
                title={title}
                content={content}
            />
        </Box>

    );
};

export default Error_Page;
