import React from "react";
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        borderRadius: '0.5rem',
        outline:"none !important",
    }
})

const Button_Component = (props) => {

    const classes = useStyles();
    return (
        <Button
            className={classes.root}
            color="primary"
            variant="contained"
            size={"large"}
            onClick={props.OnClick}>{props.Name}</Button>
    );
}

export default Button_Component;