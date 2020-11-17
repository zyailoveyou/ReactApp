import React from 'react';
import Typography from "@material-ui/core/Typography";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../../MyTheme/Theme";
//Icons
import Button_Progress from "../../Progress_Bar/Button_Progress";


const useStyles = makeStyles({
    Wrapper: {
        display: "flex",
        justifyContent: "center",
    },
})

const Loading_Result = () => {
    const classes = useStyles();
    return (
        <Grid container direction={"column"} spacing={3}>
            <Grid item className={classes.Wrapper}>
                <Button_Progress Fab_Size={'8rem'} Circle_Size={'9rem'} Circle_Position={-8}/>
            </Grid>
        </Grid>
    );
};

export default Loading_Result;
