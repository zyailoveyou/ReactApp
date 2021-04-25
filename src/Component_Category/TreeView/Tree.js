import React, {useContext, useState} from 'react';
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import SortableTree from './react-sortable-tree/src/react-sortable-tree'
import {addNodeUnderParent} from "./react-sortable-tree/src/utils/tree-data-utils";
import {getNodeAtPath, removeNodeAtPath, getVisibleNodeCount} from "./react-sortable-tree/src/utils/tree-data-utils";
import theme from "../../MyTheme/Theme";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {v4 as uuidv4} from 'uuid';
import Members_Context from "../../Context/Context_Info/Members_Context";
import CloudBase_Context from "../../Context/Context_Info/CloudBase_Context";

const useStyles = makeStyles({
    iconButton: {
        padding: '4px',
        outline: "none !important",
        color: theme.palette.secondary.main,
        background: theme.palette.grey["100"],
    },
    container: {
        padding: '1rem',
        position: "relative",
        height: '100%'
    },
});


const Tree = (props) => {
    const {
        treeData,
        setTreeData,
        loadingDepartmentTree,
        setLoadingDepartmentTree,
        removeTreeData,
        setRemoveTreeData,
        removeMemberList,
        setRemoveMemberList,
    } = props
    const {
        nowDepartmentNode,
        setNowDepartmentNode,
        nowDepartmentNodePath,
        nowSelectedMember,
        setNowSelectedMember,
        setNowDepartmentNodePath,
        setMembers,
        members,
        authorityCheckList,
        setAuthorityCheckList,
        send,
        setSend,
    } = useContext(Members_Context)
    const CloudBase = useContext(CloudBase_Context)

    const classes = useStyles()


    const addNode = (path) => {
        const department_id = uuidv4()
        const NEW_NODE =
            {
                title: '新部门',
                Members: [],
                id: department_id,
            };

        // let {node, treeIndex, path} = rowInfo;
        // path.pop();
        let parentNode = getNodeAtPath({
            treeData: treeData,
            path: path,
            getNodeKey: ({treeIndex}) => treeIndex,
            ignoreCollapsed: true
        });

        console.log(parentNode)
        console.log(NEW_NODE)

        let getNodeKey = ({node: object, treeIndex: number}) => {
            return number;
        };
        let parentKey = getNodeKey(parentNode);
        if (parentKey == -1) {
            parentKey = null;
        }
        let newTree = addNodeUnderParent({
            treeData: treeData,
            newNode: NEW_NODE,
            expandParent: true,
            parentKey: parentKey,
            getNodeKey: ({treeIndex}) => treeIndex
        });

        console.log(newTree)
        setTreeData(newTree.treeData);
    }

    const removeNode = (rowInfo) => {
        let {node, treeIndex, path} = rowInfo;

        let newTree = removeNodeAtPath({
            treeData: treeData,
            path: path,
            getNodeKey: ({treeIndex}) => treeIndex,
            ignoreCollapsed: true
        })
        console.log(newTree)
        setTreeData(newTree)

        // console.log('has members to remove')
        // let newTree = removeNodeAtPath({
        //     treeData: treeData,
        //     path: path,
        //     getNodeKey: ({treeIndex}) => treeIndex,
        //     ignoreCollapsed: true
        // })
        // console.log(newTree)
        // setTreeData(newTree)

        setRemoveTreeData((preRemove) => {
            let newRemove = preRemove
            console.log(node.id)
            newRemove.push(node.id)
            console.log(newRemove)
            return newRemove
        })


        setRemoveMemberList((preRemove)=>{
            let newRemove = preRemove
            console.log(node)
            newRemove = newRemove.concat(node.Members)
            console.log(newRemove)
            return newRemove
        })

    }


    // const deleteMembersAuthority = (nodeMembers) => {
    //     const defaultAuthority = authorityCheckList.map((item) => {
    //         return {...item, Checked: false}
    //     })
    //     console.log(defaultAuthority)
    //     setSend(true)
    //     CloudBase.app
    //         .callFunction({
    //             name: "getUserList",
    //             data: {
    //                 usersGroup: nodeMembers,
    //             }
    //         })
    //         .then((res) => {
    //             const result = res.result; //云函数执行结果
    //             const saveMembers = result.map((item) => {
    //                 console.log(item)
    //                 return {...item, data: {...item.data, Authority: defaultAuthority}}
    //             })
    //             console.log(saveMembers)
    //             CloudBase.app
    //                 .callFunction({
    //                     name: "setUserList",
    //                     data: {
    //                         usersGroup: saveMembers
    //                     }
    //                 })
    //                 .then((res) => {
    //                     const result = res.result; //云函数执行结果
    //                     console.log(result)
    //                     setSend(false)
    //                     defaultData()
    //                 });
    //         });
    //
    // }


    const defaultData = () => {
        setNowDepartmentNode(undefined)
        setNowSelectedMember(undefined)
    }

    return (
        <Paper elevation={3} style={{
            width: '100%',
            height: '100%',
        }}>
            {
                loadingDepartmentTree ?
                    <LinearProgress/>
                    :
                    <Box className={classes.container}>

                        <SortableTree
                            treeData={function () {
                                return treeData
                            }()}
                            onChange={treeData => setTreeData(treeData)}
                            innerStyle={{
                                // fontSize:'2rem'
                            }}
                            generateNodeProps={
                                (rowInfo) => {
                                    return (
                                        {
                                            buttons: [
                                                <IconButton
                                                    className={classes.iconButton}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        console.log('add node clicked')
                                                        addNode(rowInfo.path)
                                                    }}
                                                >
                                                    <AddCircleOutlineIcon/>
                                                </IconButton>,
                                                function () {
                                                    return (
                                                        <IconButton
                                                            className={classes.iconButton}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                console.log('remove node clicked')
                                                                let {node, treeIndex, path} = rowInfo;
                                                                console.log(node)
                                                                defaultData()
                                                                removeNode(rowInfo)
                                                            }}
                                                        >
                                                            <RemoveCircleOutlineIcon/>
                                                        </IconButton>
                                                    )

                                                }()
                                            ],
                                        }
                                    )
                                }
                            }
                        />
                        <Fab color={'secondary'}
                             style={{
                                 position: "absolute",
                                 top: '88%',
                                 left: '90%',
                                 outline: "none",
                                 width: '3rem',
                                 height: '3rem'
                             }}
                             onClick={() => {
                                 addNode([])
                             }}
                        >
                            <AddIcon/>
                        </Fab>

                    </Box>
            }
        </Paper>
    );
};

export default Tree;
