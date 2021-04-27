import React, {useContext, useEffect, useState} from 'react';
import {Box} from "@material-ui/core";
import Show_Information_Component from "../../../../Component_Category/Information/Show_Information_Component";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../../../MyTheme/Theme";
import {useHistory, useLocation} from "react-router-dom";
import Tree from "../../../../Component_Category/TreeView/Tree";
import Button from '@material-ui/core/Button';
import Members_List from "../../../../Component_Category/Information/Members_List";
import Alert_Component from "../../../../Component_Category/Alert/Alert_Component";
import User_Context from "../../../../Context/Context_Info/User_Context";
import CloudBase_Context from "../../../../Context/Context_Info/CloudBase_Context";
import Dialog_Load from "../../../../Component_Category/Dialog/Dialog_Load";
import Members_Context from "../../../../Context/Context_Info/Members_Context";
import TreeData_Context from "../../../../Context/Context_Info/TreeData_Context";
import cloneDeep from 'lodash/cloneDeep';
import Authority_List from "../../../../Component_Category/Information/Authority_List";
import {changeNodeAtPath} from "../../../../Component_Category/TreeView/react-sortable-tree/src";
import {getFlatDataFromTree, getTreeFromFlatData} from "react-sortable-tree";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(
    {
        root: {
            background: (theme.palette.grey["400"]),
            color: (theme.palette.primary.contrastText),
            borderTopRightRadius: '0.5rem',
            borderTopLeftRadius: '0.5rem',
            '&$selected': {
                background: (theme.palette.primary.main),
                color: (theme.palette.primary.contrastText),
                boxShadow: 'none',
                outline: "none",
            },
        },
        selected: {},
        indicator: {
            background: (theme.palette.secondary.main),
        },
        container: {
            padding: '1rem',
        },
        Load: {
            width: '100%',
            height: 800,
            overflowX: "hidden",
            overflowY: "hidden",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }
    });


const Hierarchy_Page = () => {
    const classes = useStyles()
    const {userData, setUserData} = useContext(User_Context)
    const CloudBase = useContext(CloudBase_Context)
    // const history = useHistory();
    // const location = useLocation()

    const [send, setSend] = useState(false)
    const [nowDepartmentNode, setNowDepartmentNode] = useState(undefined)
    const [nowDepartmentNodePath, setNowDepartmentNodePath] = useState(undefined)
    const [nowSelectedMember, setNowSelectedMember] = useState(undefined)
    const [sendUser, setSendUser] = useState(false)
    // const [members, setMembers] = useState(undefined)

    const {
        treeData,
        setTreeData,
        loadingDepartmentTree,
        setLoadingDepartmentTree,
        loadAuthorityList,
        setLoadAuthorityList,
        authorityCheckList,
        setAuthorityCheckList,
        removeTreeData,
        setRemoveTreeData,
        removeMemberList,
        setRemoveMemberList
    } = useContext(TreeData_Context)


    const sendTreeData = () => {
        setSend(true)
        console.log(treeData)
        const flatDepartment = getFlatDataFromTree({
            treeData: treeData,
            getNodeKey: ({treeIndex}) => treeIndex,
            ignoreCollapsed: false,
        })

        console.log(flatDepartment)

        let newArray = []

        flatDepartment.forEach((item) => {
            if (item.parentNode != null) {
                newArray.push(
                    {
                        expanded: item.node.expanded,
                        parentNode: item.parentNode.id,
                        id: item.node.id,
                        title: item.node.title,
                        treeIndex: item.treeIndex,
                        Members: item.node.Members,
                    }
                )
            } else {
                newArray.push({
                    expanded: item.node.expanded,
                    parentNode: 0,
                    id: item.node.id,
                    title: item.node.title,
                    treeIndex: item.treeIndex,
                    Members: item.node.Members,
                })
            }

        })

        console.log(newArray)
        console.log(removeTreeData)

        let userList = []
        newArray.forEach((item) => {
            console.log(item)
            console.log(item.Members)
            userList = userList.concat(item.Members)
        })

        console.log(userList)



        CloudBase.app
            .callFunction({
                name: "setDepartmentFlatData",
                data: {
                    departmentGroup: newArray,
                    deleteDepartmentGroup: removeTreeData,
                    userList: userList,
                    removeUserList: removeMemberList,
                }
            })
            .then((res) => {
                const result = res.result; //云函数执行结果
                console.log(result)
                setSend(false)
            });

    }



    return (
        <Members_Context.Provider value={
            {
                nowSelectedMember: nowSelectedMember,
                setNowSelectedMember: setNowSelectedMember,
                authorityCheckList: authorityCheckList,
                setAuthorityCheckList: setAuthorityCheckList,
                nowDepartmentNode: nowDepartmentNode,
                setNowDepartmentNode: setNowDepartmentNode,
                nowDepartmentNodePath: nowDepartmentNodePath,
                setNowDepartmentNodePath: setNowDepartmentNodePath,
                loadAuthorityList: loadAuthorityList,
                setLoadAuthorityList: setLoadAuthorityList,
            }
        }>
            <Box>
                <Grid container direction={"column"} spacing={2}>
                    <Grid item>
                        <Show_Information_Component
                            Title={'使用说明'}
                            Content={'设置公司部门'}
                        />
                    </Grid>
                    <Grid item>
                        <Grid container direction={"column"} spacing={2}>
                            <Grid item>
                                <Grid container direction={'row'} spacing={2}>
                                    <Grid item xs={5}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} style={{
                                                height: '60vh',
                                            }}>
                                                <Members_List/>
                                            </Grid>
                                            <Grid item xs={12} style={{
                                                height: '40vh'
                                            }}>
                                                <Authority_List
                                                    loadAuthorityList={loadAuthorityList}
                                                    setLoadAuthorityList={setLoadAuthorityList}
                                                    authorityCheckList={authorityCheckList}
                                                    setAuthorityCheckList={setAuthorityCheckList}
                                                />
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                    <Grid item xs={7}>
                                        <Tree
                                            treeData={treeData}
                                            setTreeData={setTreeData}
                                            loadingDepartmentTree={loadingDepartmentTree}
                                            setLoadingDepartmentTree={setLoadingDepartmentTree}
                                            removeTreeData={removeTreeData}
                                            setRemoveTreeData={setRemoveTreeData}
                                            removeMemberList={removeMemberList}
                                            setRemoveMemberList={setRemoveMemberList}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Paper elevation={3}>
                                            <Box className={classes.container}>
                                                <Grid container direction={'row'} spacing={2}>
                                                    <Grid item xs={12}>
                                                        <Alert_Component
                                                            content={'进行部门数据修改后一定要保存，否则修改数据会自动失效'}
                                                            severity={'warning'}
                                                            switch={false}/>
                                                    </Grid>
                                                    <Grid item xs={12} style={{
                                                        display: 'flex',
                                                        justifyContent: 'flex-end'
                                                    }}>
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            size={"medium"}
                                                            style={{
                                                                outline: 'none'
                                                            }}
                                                            onClick={() => {
                                                                console.log('on save')
                                                                sendTreeData()

                                                            }}
                                                        >
                                                            保存信息
                                                        </Button>
                                                        <Dialog_Load load={send}></Dialog_Load>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Members_Context.Provider>

    )
};

export default Hierarchy_Page;