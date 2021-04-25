//customized Component
import React from "react";
import Show_Information_Component from "../../../../Component_Category/Information/Show_Information_Component";
//material ui
import Grid from '@material-ui/core/Grid';
//context
import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Data_Panel from "../../../../Component_Category/Information/Data_Panel";
import BigDataVirtualTable from "../../../../Component_Category/Table/Scheduler_Summary_Table";




const useStyles = makeStyles(
    {
        container: {
            position:"relative"
        },
    }
);


const Summary = (props) => {

    const classes = useStyles()

    return (
        <Box>
            <Grid container spacing={2} direction={"column"}>
                <Grid item>
                    <Show_Information_Component
                        Title={'使用说明'}
                        Content={'查询个人考勤统计信息'}
                    />
                </Grid>
                <Grid item>
                    <Grid container spacing={2} direction={"column"} className={classes.container}>
                        <Grid item >
                            <Grid container spacing={2} direction={"row"}>
                                <Grid item xs={4}>
                                    <Data_Panel
                                        Title={'换休单剩余'}
                                        Display_Type={'总合计'}
                                        Increase={15}
                                        Percentage={10}
                                        Period={'总合计'}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Data_Panel
                                        Title={'加班合计'}
                                        Display_Type={'今年合计'}
                                        Increase={12}
                                        Percentage={15}
                                        Period={'今年合计'}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Data_Panel
                                        Title={'请假合计'}
                                        Display_Type={'今年合计'}
                                        Increase={19}
                                        Percentage={5}
                                        Period={'今年合计'}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <BigDataVirtualTable />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Summary;
