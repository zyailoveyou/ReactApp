import React, {memo, useContext, useEffect, useRef, useState} from 'react';
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Avatar from "@material-ui/core/Avatar";
import LinearProgress from "@material-ui/core/LinearProgress";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Members_Context from "../../Context/Context_Info/Members_Context";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import theme from "../../MyTheme/Theme";
import ListSubheader from '@material-ui/core/ListSubheader';
import {animated, useSpring} from "react-spring";
import {easePolyIn} from "d3-ease";
import CloudBase_Context from "../../Context/Context_Info/CloudBase_Context";
import AddCircleIcon from '@material-ui/icons/AddCircle';


const useStyles = makeStyles({
    Center: {
        display: "flex",
        justifyContent: 'center',
        alignItems: "start",
        flexWrap: "wrap"
    },
    container: {
        padding: "1rem",
        height: '100%'
    },
    list: {
        cursor: "pointer",

    },
    iconButton: {
        outline: "none !important",
        color: theme.palette.secondary.main,
    },
    addNewMember: {
        fontSize: '1rem',
        color: theme.palette.grey["500"]
    }
})

const Members_List = (props) => {
    console.log('rerender ManagerList')
    const classes = useStyles()
    const subHeaderRef = useRef()
    const [Opacity, setOpacity] = useState(true)
    const [selectedIndex, setSelectedIndex] = useState(0);
    const CloudBase = useContext(CloudBase_Context)
    const {
        nowDepartmentNode,
        setDepartmentAllManager,
        nowSelectedMember,
        setNowSelectedMember,
    } = useContext(Members_Context)


    console.log(nowDepartmentNode)
    const animate = useSpring(
        {
            opacity: Opacity ? 1 : 0,
            config: {
                duration: 100,
                easing: t => easePolyIn(t),
            }
        })

    const handleListItemClick = (index, item) => {
        console.log('item clicked')
        console.log(nowDepartmentNode)
        console.log(item)
        setSelectedIndex(index);
        setNowSelectedMember(nowDepartmentNode.Members[index]);
    };

    return (
        <Paper
            style={{
                width: '100%',
                height: '100%',
                overflowX: "hidden",
                overflowY: "auto",
                position: "relative",
            }}
            elevation={3}
            onScroll={() => {
                const cachedRef = subHeaderRef.current
                if (cachedRef != null) {
                    if (cachedRef.offsetTop > 0) {
                        if (Opacity != false) {
                            setOpacity(false)
                        }
                    } else {
                        if (Opacity != true) {
                            setOpacity(true)
                        }
                    }
                }
            }}
        >
            {

                function () {
                    if (nowDepartmentNode) {
                        return <Box className={classes.container}>
                            <List
                                subheader={
                                    <animated.div style={{
                                        position: "sticky",
                                        top: -1,
                                        ...animate
                                    }} ref={subHeaderRef}>
                                        <ListSubheader>
                                            {
                                                nowDepartmentNode.title
                                            }
                                        </ListSubheader>
                                    </animated.div>
                                }
                            >
                                {
                                    function () {
                                        console.log(nowDepartmentNode.Members)
                                        if (nowDepartmentNode.Members) {
                                            return (
                                                <Box>
                                                    <ListItem
                                                        button
                                                        key={23232}
                                                    >
                                                        <ListItemAvatar>
                                                            <AddCircleIcon style={{
                                                                color: theme.palette.primary.main,
                                                                fontSize: '2rem'
                                                            }}/>
                                                        </ListItemAvatar>
                                                        <ListItemText classes={{
                                                            primary: classes.addNewMember,

                                                        }} primary={'添加新员工'}/>
                                                    </ListItem>
                                                    {
                                                        nowDepartmentNode.Members.map((item, index) => {
                                                            return (
                                                                <ListItem
                                                                    button
                                                                    key={index}
                                                                    selected={selectedIndex === index}
                                                                    onClick={() => handleListItemClick(index, item)}
                                                                >
                                                                    <ListItemAvatar>
                                                                        <Avatar src={item.AvatarUrl}/>
                                                                    </ListItemAvatar>
                                                                    <ListItemText primary={item.Name}
                                                                                  secondary={item.Career}/>
                                                                    <ListItemSecondaryAction>
                                                                        <IconButton
                                                                            className={classes.iconButton}
                                                                        >
                                                                            <RemoveCircleOutlineIcon/>
                                                                        </IconButton>
                                                                    </ListItemSecondaryAction>
                                                                </ListItem>

                                                            )
                                                        })
                                                    }
                                                </Box>
                                            )
                                        }
                                    }()
                                }
                            </List>
                        </Box>
                    } else {
                        return null
                    }

                }()
            }
        </Paper>
    );
};

export default memo(Members_List);
