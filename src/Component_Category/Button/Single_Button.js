import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {Corporation_Context} from "../../Context/Corporation_Context";
import theme from "../../MyTheme/Theme";
import Box from "@material-ui/core/Box";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";


const useStyles = makeStyles({
    root: {
        paddingLeft: props => {
            return props.Padding
        }
    },

});


const Single_Button_Component = (props) => {
    const classes = useStyles(props);
    const {Padding} = props
    return (
        <Box className={classes.root}>
            <Button color={"primary"}
                    variant={"contained"}
                    disabled={!props.disable}
                    classes={{
                        contained: classes.button,
                    }}>提交
            </Button>
        </Box>
    );
};

export default Single_Button_Component;
