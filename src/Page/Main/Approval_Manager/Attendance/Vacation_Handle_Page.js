import React from 'react';
import {Box} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Show_Information_Component from "../../../../Component_Category/Information/Show_Information_Component";
import Members_Summary_Table from "../../../../Component_Category/Table/Members_Summary_Table";
import Vacation_Approval_Table from "../../../../Component_Category/Table/Vacation_Approval_Table";
const Vacation_Handle_Page = () => {
    return (
        <Box>
            <Grid container spacing={2} direction={"column"}>
                <Grid item style={{
                    width:'100%'
                }}>
                    <Show_Information_Component
                        Title={'使用说明'}
                        Content={'用于管理部门成员考勤的审批'}
                    />
                </Grid>
                <Grid item style={{
                    width:'100%'
                }}>
                    <Vacation_Approval_Table />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Vacation_Handle_Page;
