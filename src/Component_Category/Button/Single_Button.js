import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from "@material-ui/core/Box";


const useStyles = makeStyles({
    root: {
        paddingLeft: props => {
            return props.Padding
        }
    },
    button:{
        outline:'none !important'
    }

});


const Single_Button_Component = (props) => {
    const classes = useStyles(props);
    const {Padding} = props
    return (
        <Box className={classes.root}>
            <Button color={"primary"}
                    variant={"contained"}
                    disabled={!props.disable}
                    className={classes.button}>提交
            </Button>
        </Box>
    );
};

export default Single_Button_Component;
