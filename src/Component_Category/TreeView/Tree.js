import React, {useState} from 'react';
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import SortableTree from './react-sortable-tree/src/react-sortable-tree'
import {addNodeUnderParent} from "./react-sortable-tree/src/utils/tree-data-utils";
import {getNodeAtPath, removeNodeAtPath, getVisibleNodeCount} from "./react-sortable-tree/src/utils/tree-data-utils";
import theme from "../../MyTheme/Theme";
import TreeData_Context from "../../Context/Context_Info/TreeData_Context";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
    iconButton: {
        padding: '4px',
        outline: "none !important",
        color: theme.palette.secondary.main,
        background: theme.palette.grey["100"],
    },
    container: {
        height: 650,
        padding: '1rem',
        position: "relative"
    },
    container_loading: {
        height: 650,

    }
});


const Tree = (props) => {
    const {treeData, loadingTree, setLoadingTree, setTreeData} = props
    const nodeClicked = (rowInfo) => {
        console.log(rowInfo)
    }
    const classes = useStyles()
    const addNode = (path) => {
        let NEW_NODE = {title: 'Another Node',Manager:[]};
        // let {node, treeIndex, path} = rowInfo;

        // path.pop();
        let parentNode = getNodeAtPath({
            treeData: treeData,
            path: path,
            getNodeKey: ({treeIndex}) => treeIndex,
            ignoreCollapsed: true
        });
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
    }

    return (
        <Paper elevation={3}>
            {
                loadingTree ?
                    <Box className={classes.container_loading}>
                        <LinearProgress/>
                    </Box>
                    :
                    <Box className={classes.container}>
                        <TreeData_Context.Provider value={{treeData, setTreeData}}>
                            <SortableTree
                                treeData={function () {
                                    console.log(treeData)
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
                                                        onClick={() => {
                                                            console.log(rowInfo)
                                                            addNode(rowInfo.path)

                                                            // setTreeData(()=>{
                                                            //     return newTree
                                                            // })
                                                        }}
                                                    >
                                                        <AddCircleOutlineIcon/>
                                                    </IconButton>,
                                                    function () {
                                                        return (
                                                            <IconButton
                                                                className={classes.iconButton}
                                                                onClick={() => {
                                                                    console.log(rowInfo)
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
                                     top: '83%',
                                     left: '85%',
                                     outline: "none",
                                     width: '5rem',
                                     height: '5rem'
                                 }}
                                 onClick={() => {
                                     addNode([])
                                 }}
                            >
                                <AddIcon/>
                            </Fab>
                        </TreeData_Context.Provider>
                    </Box>
            }
        </Paper>
    );
};

export default Tree;
