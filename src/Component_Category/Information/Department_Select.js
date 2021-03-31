import React, {useContext, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Box from "@material-ui/core/Box";
import TreeData_Context from "../../Context/Context_Info/TreeData_Context";
import {getFlatDataFromTree} from "react-sortable-tree";
import {changeNodeAtPath} from "../TreeView/react-sortable-tree/src";
import User_Context from "../../Context/Context_Info/User_Context";


const useStyles = makeStyles({

    box_Container: {
        width: '100%',
        height: '100%',
    },

});


const Department_Select = (props) => {
    const classes = useStyles(props);
    const {
        Data_Group,
        Data_Set_Function,
        Title,
        Value,
        Data_Set_Name,
        flatTree
    } = props

    const {treeData, setTreeData} = useContext(TreeData_Context)
    const {userData, setUserData} = useContext(User_Context)
    const [currency, setCurrency] = useState(0);
    const flatData = getFlatDataFromTree({
        treeData: treeData,
        getNodeKey: ({treeIndex}) => treeIndex,
        ignoreCollapsed: true,
    })

    useEffect(() => {
        const result = flatData.find((item, index) => {
            return userData.Department === item.node.department_id
        })
        if (result) {
            setCurrency(result.treeIndex)
        } else {
            setCurrency(undefined)
        }
    }, [])


    const handleChange = (e) => {
        console.log('into onchange')
        setCurrency(e.target.value);
        Data_Set_Function(Data_Set_Name, flatData[e.target.value].node.department_id);

        const lastDepartment = userData.Department
        const nowSelectedDepartment = flatData[e.target.value].node.department_id
        console.log(lastDepartment)
        console.log(nowSelectedDepartment)

        let newTree;
        if (lastDepartment != "") {
            //deleted last department
            let beforeNode = flatData.find((item, index) => {
                return lastDepartment === item.node.department_id
            })
            console.log(beforeNode)
            if (beforeNode) {
                let temperNode = beforeNode.node
                console.log(temperNode)
                temperNode.Members = temperNode.Members.filter((item, index) => {
                    return item.Uid != userData.Uid
                })
                console.log(temperNode)
                newTree = changeNodeAtPath({
                    treeData: treeData,
                    path: beforeNode.path,
                    getNodeKey: ({treeIndex}) => treeIndex,
                    newNode: temperNode
                })
                console.log(newTree)


                let changedNode = flatData[e.target.value].node
                console.log(changedNode)
                changedNode.Members.push({Uid:userData.Uid,Authority:[]})
                newTree = changeNodeAtPath({
                    treeData: newTree,
                    path: flatData[e.target.value].path,
                    getNodeKey: ({treeIndex}) => treeIndex,
                    newNode: changedNode
                })
                console.log(newTree)
                setTreeData(newTree)
            }
            else {
                let changedNode = flatData[e.target.value].node
                console.log(changedNode)
                changedNode.Members.push({Uid:userData.Uid,Authority:[]})
                newTree = changeNodeAtPath({
                    treeData: treeData,
                    path: flatData[e.target.value].path,
                    getNodeKey: ({treeIndex}) => treeIndex,
                    newNode: changedNode
                })
                console.log(newTree)
                setTreeData(newTree)

            }

        }
        else {
            let changedNode = flatData[e.target.value].node
            console.log(changedNode)
            changedNode.Members.push({Uid:userData.Uid,Authority:[]})
            newTree = changeNodeAtPath({
                treeData: treeData,
                path: flatData[e.target.value].path,
                getNodeKey: ({treeIndex}) => treeIndex,
                newNode: changedNode
            })
            console.log(newTree)
            setTreeData(newTree)
        }
    };


    useEffect(() => {

    }, [currency])

    return (

        <Box className={classes.box_Container}>
            <TextField
                id="standard-select-currency"
                fullWidth
                select
                label={Title}
                variant={"outlined"}
                size={"small"}
                value={currency}
                // disabled={userData.Department.treeIndex!=undefined}
                onChange={(e) => handleChange(e)}

            >
                {flatData.map((departmentNodeInfo, index) => (
                    <MenuItem key={index + index} value={index}>
                        {departmentNodeInfo.node.title}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    )
};

export default Department_Select;
