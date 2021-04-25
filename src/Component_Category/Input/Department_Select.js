import React, {useContext, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Box from "@material-ui/core/Box";
import TreeData_Context from "../../Context/Context_Info/TreeData_Context";
import {getFlatDataFromTree} from "react-sortable-tree";
import {changeNodeAtPath} from "../TreeView/react-sortable-tree/src";
import User_Context from "../../Context/Context_Info/User_Context";
import getFlatDepartmentFromTree from "../../Function_List/getFlatDepartmentFromTree";


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
        flatTree,
        lastDepartment,
        treeData,
        setTreeData,
    } = props


    const {userData, setUserData} = useContext(User_Context)
    const [currency, setCurrency] = useState(0);
    const newArray = getFlatDepartmentFromTree(treeData)

    newArray.unshift({
        expanded: null,
        parentNode: null,
        id: null,
        title: '无',
        treeIndex: 0,
    })


    useEffect(() => {
        console.log(Value)
        const result = newArray.find((item, index) => {
            return Value === item.id
        })
        console.log(result)
        if (result)
        {
            setCurrency(result.treeIndex+1)
        }
    }, [])


    const handleChange = (e) => {
        console.log('into onchange')
        setCurrency(e.target.value);
        Data_Set_Function(Data_Set_Name, newArray[e.target.value].id);
    };


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
                {newArray.map((departmentInfo, index) => (
                    <MenuItem key={index + index} value={index}>
                        {departmentInfo.title}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    )
};

export default Department_Select;
