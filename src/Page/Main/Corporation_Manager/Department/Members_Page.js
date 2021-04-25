import React, {useContext} from 'react';
import {Box} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Members_Summary_Table from "../../../../Component_Category/Table/Members_Summary_Table";
import Show_Information_Component from "../../../../Component_Category/Information/Show_Information_Component";
import TreeData_Context from "../../../../Context/Context_Info/TreeData_Context";
import LinearProgress from "@material-ui/core/LinearProgress";


const Members_Page = () => {
    const {
        treeData,
        setTreeData,
        loadingDepartmentTree,
        setLoadingDepartmentTree,
        loadMembers,
        setLoadMembers,
        loadAuthorityList,
        setLoadAuthorityList,
        authorityCheckList,
        setAuthorityCheckList,
        removeTreeData,
        setRemoveTreeData,
        removeMemberList,
        setRemoveMemberList
    } = useContext(TreeData_Context)

    return (
        <Box>
            <Grid container spacing={2} direction={"column"}>
                <Grid item style={{
                    width: '100%'
                }}>
                    <Show_Information_Component
                        Title={'使用说明'}
                        Content={'设置公司所有人员部门所属详情'}
                    />
                </Grid>
                <Grid item style={{
                    width: '100%',
                }}>
                    <Members_Summary_Table/>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Members_Page;
