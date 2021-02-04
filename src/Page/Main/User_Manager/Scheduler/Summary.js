//customized Component
import React from "react";
import Show_Information_Component from "../../../../Component_Category/Information/Show_Information_Component";
//material ui
import Grid from '@material-ui/core/Grid';
//context
import {Box} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const Summary = () => {
    return (
        <Box>
            <Grid container spacing={2} direction={"column"}>
                <Grid item>
                    <Show_Information_Component
                        Title={'使用说明'}
                        Content={'查询以及设置个人出勤及安排个人计划'}
                    />
                </Grid>
                <Grid item>
                    <Paper elevation={3}>
                        123123123
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Summary;
