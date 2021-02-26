//customized Component
import React from "react";
import Show_Information_Component from "../../../../Component_Category/Information/Show_Information_Component";
//material ui
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar_Profile from "../../../../Component_Category/Information/Avatar_Profile";
import Chips_Profile from "../../../../Component_Category/Information/Chips_Profile";
import About_Profile from "../../../../Component_Category/Information/About_Profile";
import Table_Component from "../../../../Component_Category/Table/Table_Component";
import Bar_Chart from "../../../../Component_Category/Chart/Bar_Chart";
//context
import Data_Panel from "../../../../Component_Category/Information/Data_Panel";
import {Box} from "@material-ui/core";
import theme from "../../../../MyTheme/Theme";
import Paper from "@material-ui/core/Paper";
import Scheduler_Component from "../../../../Component_Category/Scheduler/Scheduler_Component";


const useStyles = makeStyles(
    {
        container: {
            position:"relative"
        },
    }
);


const SetDate = (props) => {
    const classes = useStyles()
    return (
        <Grid container spacing={2} direction={"column"}>
            <Grid item>
                <Show_Information_Component
                    Title={'使用说明'}
                    Content={'查询以及设置个人出勤及安排个人计划'}
                />
            </Grid>
            <Grid item>
                <Paper elevation={3}>
                    <Scheduler_Component/>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default SetDate;
