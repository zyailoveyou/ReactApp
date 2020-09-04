import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {Corporation_Context} from "../../Context/Corporation_Context";


const useStyles = makeStyles({
    container: {
        display: "flex",

    },
    align_right: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",

    },
    align_left: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    button: {
        outline: "none !important",
    }
});


const Single_Button_Component = (props) => {
    const classes = useStyles();
    const Corporation = useContext(Corporation_Context);
    return (
        <Grid container spacing={1} className={classes.container}>
            <Grid item xs={4} className={classes.align_right}>
            </Grid>
            <Grid item xs={4} className={classes.align_left}>
                <Button color={"primary"}
                        variant={"contained"}
                        disabled={!Corporation.Has_Read_Agreement}
                        classes={{
                            contained: classes.button,
                        }}>提交</Button>
            </Grid>
        </Grid>
    );
};

export default Single_Button_Component;
