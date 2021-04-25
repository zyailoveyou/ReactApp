import React, {memo, useContext, useEffect} from 'react';
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import LinearProgress from "@material-ui/core/LinearProgress";
import IconButton from "@material-ui/core/IconButton";
import theme from "../../MyTheme/Theme";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Members_Context from "../../Context/Context_Info/Members_Context";
import TreeData_Context from "../../Context/Context_Info/TreeData_Context";
import {getFlatDataFromTree, getTreeFromFlatData} from "react-sortable-tree";
import cloneDeep from 'lodash/cloneDeep';


const useStyles = makeStyles({
    Center: {
        display: "flex",
        justifyContent: 'center',
        alignItems: "start",
        flexWrap: "wrap"
    },
    container: {
        padding: "1rem",
        position: "relative",
        height: '100%'
    },
    list: {
        cursor: "pointer",

    },
    iconButton: {

        outline: "none !important",
        color: theme.palette.secondary.main,

    },
})

const Authority_List = (props) => {

    const classes = useStyles()
    const {
        authorityCheckList,
        setAuthorityCheckList
    } = props
    const {
        nowDepartmentNode,
        setNowDepartmentNode,
        nowSelectedMember,
        setNowSelectedMember,
        nowDepartmentNodePath,
        setNowDepartmentNodePath,
    } = useContext(Members_Context)
    const {
        treeData,
        setTreeData
    } = useContext(TreeData_Context)

    const handleToggle = (itemClicked) => () => {
        console.log('clicked')
        console.log(authorityCheckList)
        let newChecked
        setAuthorityCheckList((preChecked) => {
            return preChecked.map((itemPrev) => {
                if (itemClicked.Name === itemPrev.Name) {
                    return {...itemPrev, Checked: !itemPrev.Checked}
                } else {
                    return {...itemPrev}
                }
            })
        });
    };


    useEffect(() => {
        //选择人员变化，更新权限数据
        console.log('选择人员变化，更新权限数据')
        console.log(nowSelectedMember)
        console.log(authorityCheckList)
        console.log(treeData)
        if (nowSelectedMember) {
            if (nowSelectedMember.Authority.length > 0) {
                console.log('into if')
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
            }
            else {
                console.log('into else')
                setAuthorityCheckList((preAuthorityCheckList) => {
                    return preAuthorityCheckList.map((item)=>{
                        return {...item, Checked: false}
                    })
                })
            }
        }
        else {
            setAuthorityCheckList((preAuthorityCheckList) => {
                return preAuthorityCheckList.map((item)=>{
                    return {...item, Checked: false}
                })
            })
        }
    }, [nowSelectedMember])


    useEffect(() => {
        console.log('权限选择变化，更新选择选择部门数据')
        console.log(nowSelectedMember)
        console.log(authorityCheckList)
        console.log(treeData)
        if (nowDepartmentNode) {
            setNowDepartmentNode((preNowDepartmentNode) => {
                let newMembers = preNowDepartmentNode.Members.map((item, index) => {
                    console.log(item)
                    console.log(item.Uid)
                    if (item.Uid === nowSelectedMember.Uid) {
                        return {
                            ...nowSelectedMember,
                            Authority:authorityCheckList
                        }
                    } else {
                        return item
                    }
                })
                const newNowDepartmentNode = {
                    ...preNowDepartmentNode, Members: newMembers
                }
                console.log(newNowDepartmentNode)
                return newNowDepartmentNode
            })
        }

    }, [authorityCheckList])


    useEffect(() => {
        //部门节点数据变化，更新treeData
        console.log('部门节点数据变化，更新treeData')
        console.log(treeData)
        console.log(nowDepartmentNode)
        const flatDepartment = getFlatDataFromTree({
            treeData: treeData,
            getNodeKey: ({treeIndex}) => treeIndex,
            ignoreCollapsed: false,
        })

        console.log(flatDepartment)

        let newFlatTree = flatDepartment.map((itemDepartment) => {
            if (itemDepartment.node.Members.length > 0 && nowDepartmentNode) {
                if (itemDepartment.node.id === nowDepartmentNode.id) {
                    return {
                        ...nowDepartmentNode
                    }
                } else {
                    return {
                        ...itemDepartment.node
                    }
                }
            } else {
                return {
                    ...itemDepartment.node
                }
            }
        })
        console.log(newFlatTree)

        const nestTree = getTreeFromFlatData({
            flatData: newFlatTree,
            getKey: (node) => node.id,
            getParentKey: (node) => node.parentNode,
            rootKey: 0
        })
        console.log(nestTree)
        setTreeData(nestTree)
    }, [nowDepartmentNode])


    return (
        <Paper style={{
            width: '100%',
            height: '100%',
        }} elevation={3}>
            {
                // loadAuthorityList ? <LinearProgress/>
                //     :
                    <Box className={classes.container}>
                        <List>
                            {
                                authorityCheckList.map((item, index) => {
                                    return (
                                        <ListItem key={index * index}
                                                  dense
                                                  button
                                                  onClick={handleToggle(item)}
                                                  disabled={function () {
                                                      if (nowSelectedMember) {
                                                          return false
                                                      } else {

                                                          return true
                                                      }
                                                  }()}
                                        >
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    color={"primary"}
                                                    checked={item.Checked}
                                                    disableRipple
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary={item.Title}/>
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end">
                                                    <FiberManualRecordIcon/>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                    </Box>
            }
        </Paper>
    );
};

export default memo(Authority_List);
