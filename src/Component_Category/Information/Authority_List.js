import React, {memo, useContext} from 'react';
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
import Manager_Context from "../../Context/Context_Info/Members_Context";
import TreeData_Context from "../../Context/Context_Info/TreeData_Context";


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
    const {loadingAuthority, setLoadingAuthority} = props
    const {
        nowDepartmentNode,
        setNowDepartmentNode,
        authorityCheckList,
        setAuthorityCheckList,
        nowSelectedMember,
        setNowSelectedManager,
        nowDepartmentNodePath,
        setNowDepartmentNodePath,
    } = useContext(Manager_Context)
    const{
        treeData,
        setTreeData
    }=useContext(TreeData_Context)



    const handleToggle = (itemClicked) => () => {
        console.log('clicked')
        console.log(authorityCheckList)
        setAuthorityCheckList((preChecked) => {
            let newChecked = preChecked.map((itemPrev) => {
                if (itemClicked.Name === itemPrev.Name) {
                    return {...itemPrev, Checked: !itemPrev.Checked}
                } else {
                    return {...itemPrev}
                }
            })
            console.log(newChecked)
            return newChecked
        });

    };


    return (
        <Paper style={{
            width: '100%',
            height: '100%',
        }} elevation={3}>
            {
                loadingAuthority ? <LinearProgress/>
                    :
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
                                                      if (Object.keys(nowSelectedMember).length>0)
                                                      {

                                                          return false
                                                      }
                                                      else {

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
