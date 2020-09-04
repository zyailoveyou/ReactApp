import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import {Typography} from "@material-ui/core";
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const List_Component = (props) => {

    const menu = props.Menu;
    const classes = useStyles();
    let signal = false;

    const [Open_Manager, Set_Open_Manager] = React.useState(
        props.Menu
    );

    const Search_Upper_Indicator = (List, indicator) => {
        return List.find((item) => {
           return item.Indicator === indicator
        })
    }


    const handleClick = (indicator, upper_indicator,node_type) => {
        if(node_type ==='list'){
            Set_Open_Manager((prevState) => {
                const a =  {
                    ...prevState, List: (
                        function () {
                            //查找一下最顶级的菜单
                            if (prevState.Indicator != undefined) {
                                let result_main= null;
                                if (prevState.Indicator === upper_indicator) {
                                    result_main = prevState.List.map((item, index, arr) => {
                                        if (item.Node_Type === 'list') {
                                            if (item.Indicator === indicator) {
                                                item.On_Open = !item.On_Open;
                                            } else if (props.Accordion === true) {
                                                item.On_Open = false;
                                            }
                                        }
                                        return item;
                                    })
                                    return result_main
                                }
                                //查找下级
                                else {
                                    const result = prevState.List.map((item) => {
                                        if (item.Indicator === upper_indicator) {
                                            item.List.forEach((item2, index, arr) => {
                                                if (item2.Node_Type === 'list') {
                                                    if (item2.Indicator === indicator) {
                                                        item2.On_Open = !item2.On_Open;
                                                    } else if (props.Accordion === true) {
                                                        item2.On_Open = false;
                                                    }
                                                }
                                            })
                                            return item;
                                        }
                                        else {
                                            return item;
                                        }
                                    })
                                    return result;
                                }
                            }
                        }()
                    )
                }
                return a;
            })
        }

    };


    function get_checked(Passed, Now_Indicator) {
        if (Passed.Indicator === Now_Indicator) {
            return Passed.On_Open;
        } else {
            if (Passed.List != null || Passed.List != undefined) {
                for (let i = 0; i < Passed.List.length; i++) {
                    const result = get_checked(Passed.List[i], Now_Indicator)
                    if (result != null) {
                        return result
                    }
                }
            } else {
                return null;
            }
        }

    }


    function Creat_List(List, Indicator) {
        return (
            List.map((item, index, arr) => {
                return (
                    <Box className={classes.nested} key={index}>
                        <Collapse in={get_checked(Open_Manager, Indicator)}
                                  timeout="auto"
                                  unmountOnExit
                        >
                            <ListItem button onClick={() => handleClick(item.Indicator, item.Upper_List_Indicator,item.Node_Type)}
                                      name={item.Indicator}
                                      key={index}
                            >
                                <ListItemIcon>
                                    <StarBorder/>
                                </ListItemIcon>
                                <ListItemText primary={item.Title}/>
                            </ListItem>
                            {item.Node_Type === 'list' ? Creat_List(item.List, item.Indicator) : null}
                        </Collapse>
                    </Box>
                )
            })
        )
    }

    return (
        <List
            subheader={
                <ListSubheader>
                    {menu.Title}
                </ListSubheader>
            }
            className={classes.root}
            dense={false}
        >
            {
                Creat_List(menu.List, menu.Indicator)
            }
        </List>
    )
};


export default List_Component;
