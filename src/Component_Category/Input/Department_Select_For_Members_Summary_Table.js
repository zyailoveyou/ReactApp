import React, {useContext, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Box from "@material-ui/core/Box";
import TreeData_Context from "../../Context/Context_Info/TreeData_Context";
import {getFlatDataFromTree} from "react-sortable-tree";
import {changeNodeAtPath} from "../TreeView/react-sortable-tree/src";
import User_Rows_Context from "../../Context/Context_Info/User_Rows_Context";
import getFlatDepartmentFromTree from "../../Function_List/getFlatDepartmentFromTree";


const useStyles = makeStyles({
    box_Container: {
        width: '100%',
        height: '100%',
    },

});


const Department_Select_For_Members_Summary_Table = (props) => {
    const classes = useStyles(props);
    const {
        Data_Group,
        lastDepartment,
        Title,
        Value,
        Data_Set_Name,
        flatTree,
        row
    } = props

    const {userRows, setUserRows} = useContext(User_Rows_Context)
    const {treeData, setTreeData} = useContext(TreeData_Context)
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
        setUserRows((preRows) => {
            let changeRows = preRows.map((item, index) => {
                if (item.Uid === row.Uid) {
                    console.log('into if')
                    console.log(newArray)
                    return {
                        ...item,
                        Department:newArray[e.target.value].id
                    }
                } else {
                    return (item)
                }
            })
            console.log(changeRows)
            return changeRows
        });
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

export default Department_Select_For_Members_Summary_Table;
