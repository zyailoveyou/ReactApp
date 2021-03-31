import React, {useContext, useEffect, useState} from 'react';
import {Box} from "@material-ui/core";
import Show_Information_Component from "../../../../Component_Category/Information/Show_Information_Component";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
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
        }
    });


const page_map = [
    {
        value: 0,
        url: '/Main/Corporation/Department'
    },
    {
        value: 1,
        url: '/Main/Corporation/Department'
    },
]


const Department_Page = () => {
    const classes = useStyles()
    const {userData, setUserData} = useContext(User_Context)
    const CloudBase = useContext(CloudBase_Context)
    const {treeData, setTreeData} = useContext(TreeData_Context)
    const history = useHistory();
    const location = useLocation()
    const result = page_map.find((item) => {
        return item.url === location.pathname
    })

    const [value, setValue] = useState(result.value);
    const [loadingTree, setLoadingTree] = useState(false)
    const [loadingMembers, setLoadingMembers] = useState(false)
    const [loadingAuthority, setLoadingAuthority] = useState(false)
    const [send, setSend] = useState(false)
    const [nowDepartmentNode, setNowDepartmentNode] = useState([])
    const [nowDepartmentNodePath, setNowDepartmentNodePath] = useState([])
    const [authorityCheckList, setAuthorityCheckList] = useState([])
    const [nowSelectedMember, setNowSelectedMember] = useState({})
    const [sendUser, setSendUser] = useState(false)
    const [sendTree, setSendTree] = useState(false)
    const [members, setMembers] = useState(undefined)

    const handleChange = (event, newValue) => {
        const result = page_map.find((item) => {
            return item.value === newValue
        })
        history.push(result.url);
    };

    const initialAuthorityCheckList = () => {
        console.log('initial authority check list')
        setLoadingAuthority(true)
        CloudBase.db.collection("Authority").doc("Department_Authority").get(
        ).then((res) => {
            console.log(res)
            console.log(res.data[0].Authority)
            if (res.data[0].Authority) {
                console.log('set Authority Check List')
                setAuthorityCheckList(() => {
                    return res.data[0].Authority.map((item) => {
                        return {...item, Checked: false}
                    })
                })
                setLoadingAuthority(false)
            } else {
                console.log('failed on loading tree')
                setLoadingAuthority(false)
            }
        })
    }


    const sendTreeData = () => {
        setSendTree(true)
        CloudBase.db.collection("Department").doc("Department").set({
            treeData: treeData
        }).then((res) => {
            console.log(res)
            setSendTree(false)
        })
    }


    const sendUserData = () => {
        // setSendUser(true)
        // console.log(members)
        // CloudBase.app
        //     .callFunction({
        //         name: "setUserList",
        //         data: {
        //             usersGroup: members
        //         }
        //     })
        //     .then((res) => {
        //         const result = res.result; //云函数执行结果
        //         console.log(result)
        //         setSendUser(false)
        //     });
        setSendUser(false)
    }

    useEffect(() => {
        initialAuthorityCheckList()
    }, [])

    useEffect(() => {
        if (!sendUser && !sendTree) {
            setSend(false)
        }
    }, [sendUser, sendTree])

    useEffect(() => {
        const result = page_map.find((page_inf) => {
            return location.pathname === page_inf.url
        })
        setValue(result.value);
    }, [location])


    useEffect(() => {
        //当前选择成员改变
        console.log('now Selected Members Change')
        console.log(treeData)
        console.log(nowSelectedMember)
        console.log(authorityCheckList)
        if (Object.keys(nowSelectedMember).length > 0 && nowSelectedMember.Authority.length > 0) {
            setAuthorityCheckList((preCheckList) => {
                let temperCheckList = cloneDeep(preCheckList)
                console.log(temperCheckList)
                console.log(nowSelectedMember)
                for (let i = 0; i < temperCheckList.length; i++) {
                    nowSelectedMember.Authority.forEach((item) => {
                        if (temperCheckList[i].Name === item.Name) {
                            temperCheckList[i].Checked = item.Checked
                        }
                    })
                }
                console.log(temperCheckList)
                return temperCheckList
            })
        } else {
            console.log('default check list')
            setAuthorityCheckList((pre) => {
                return pre.map((item) => {
                    return {...item, Checked: false}
                })
            })
        }

    }, [nowSelectedMember])


    useEffect(() => {
        //修改node authority 当前权限改变
        console.log('authority CheckList Change')
        console.log(treeData)
        console.log(nowSelectedMember)
        console.log(authorityCheckList)
        console.log(nowDepartmentNode)
        if (Object.keys(nowSelectedMember).length > 0) {
            console.log('enter change tree')
            let changedNode = cloneDeep(nowDepartmentNode)
            console.log(changedNode)
            changedNode.Members = changedNode.Members.map((item, index) => {
                if (item.Uid === nowSelectedMember.Uid) {
                    return {...item, Authority: authorityCheckList}
                } else {
                    return {...item}
                }
            })
            console.log(changedNode)
            const newTree = changeNodeAtPath({
                treeData: treeData,
                path: nowDepartmentNodePath,
                getNodeKey: ({treeIndex}) => treeIndex,
                newNode: changedNode
            })

            setNowDepartmentNode(changedNode)
            setTreeData(newTree)
        }

    }, [authorityCheckList])


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
                loadingMembers: loadingMembers,
                setLoadingMembers: setLoadingMembers,
                send: send,
                setSend: setSend,
                members:members,
                setMembers:setMembers,
                loadingAuthority:loadingAuthority,
                setLoadingAuthority:setLoadingAuthority
            }
        }>
            <Box>
                <Tabs value={value} onChange={handleChange}
                      classes={{indicator: classes.indicator}}>
                    <Tab label="部门层级"
                         classes={{
                             root: classes.root,
                             selected: classes.selected,
                         }}/>
                    <Tab label="人员详情"
                         classes={{
                             root: classes.root,
                             selected: classes.selected,
                         }}/>
                </Tabs>
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
                                                height: 500,
                                            }}>
                                                <Members_List
                                                    loadingMembers={loadingMembers}
                                                    setLoadingMembers={setLoadingMembers}
                                                    members={members}
                                                    setMembers={setMembers}
                                                />
                                            </Grid>
                                            <Grid item xs={12} style={{
                                                height: 300
                                            }}>
                                                <Authority_List
                                                    loadingAuthority={loadingAuthority}
                                                    setLoadingAuthority={setLoadingAuthority}
                                                />
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                    <Grid item xs={7}>
                                        <Tree
                                            treeData={treeData}
                                            setTreeData={setTreeData}
                                            loadingTree={loadingTree}
                                            setLoadingTree={setLoadingTree}
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
                                                        <Alert_Component content={'进行部门数据修改后一定要保存，否则修改数据会自动失效'}
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
                                                                setSend(true)
                                                                sendTreeData()
                                                                sendUserData()
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
        ;
};

export default Department_Page;