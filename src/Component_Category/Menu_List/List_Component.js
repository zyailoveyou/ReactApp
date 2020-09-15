import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import StarBorder from '@material-ui/icons/StarBorder';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Logo from './Avatar/Logo.png'
//my customized
import theme from "../../MyTheme/Theme";
//test icon
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';


const useStyles = makeStyles({
    sticky: {
        width: '100%',
        position: "sticky",
        top: 0,
        background: theme.palette.grey.A100,
        // color: theme.palette.grey["200"],
    },
    nested: {
        paddingLeft: (props) => {
            return theme.spacing(props.left);
        },
    },
    Avatar: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        backgroundColor: "white",
    },
    List_Header: {
        paddingLeft:'2rem'


    },

    List_Item_Root: {
        paddingLeft: (props) => {
            return theme.spacing(props.left);
        },

        color: theme.palette.grey["400"],
        "&:hover": {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            '& $Icon_Hover': {
                color: 'white',
            },
        },
    },

    List_Item_Selected: {
        backgroundColor: theme.palette.secondary.main+' !important',
        color: theme.palette.secondary.contrastText+' !important',
    },

    Icon_Hover: {
        color: theme.palette.grey["400"],
    },
});

const List_Component = (props) => {

    const classes = useStyles(props);
    let Current_Selected_Item = null;
    const [Open_Manager, Set_Open_Manager] = React.useState(
        props.menu
    );

    useEffect(()=>{
        Set_Open_Manager((PreManager)=>{
            PreManager.forEach((item)=>{
                if (item.Node_Type==='item' && item.Indicator !=Current_Selected_Item){
                    item.Selected = false;
                }
            })
            return PreManager;
        })

    },[Open_Manager])


    const handleClick = (Indicator) => {
        Set_Open_Manager((PreManager) => {
            let manager = JSON.parse(JSON.stringify(PreManager));
            manager.forEach((item) => {
                if (item.Indicator === Indicator) {
                    if (item.Node_Type === 'list') {
                        item.On_Open = !item.On_Open;
                    } else {
                        item.Selected = !item.Selected;
                        Current_Selected_Item = Indicator;
                    }
                } else {
                    if (props.Accordion === true) {
                        item.On_Open = false;
                    }
                }
            })
            return manager;
        })
    };

    const get_checked = (Passed, Now_Indicator) => {
        const result = Passed.find((item) => {
            if (item.Indicator === Now_Indicator) {
                return item;
            }
        })
        if (result.Node_Type === 'list') {
            return result.On_Open;
        } else {
            return true
        }
    }

    const get_selected = (Passed, Now_Indicator) => {
        const result = Passed.find((item) => {
            if (item.Indicator === Now_Indicator) {
                return item;
            }
        })
        if (result.Node_Type === 'item') {
            return result.Selected;
        } else {
            return undefined
        }
    }


    function Creat_List(List, left) {
        return (
            List.map((item, index) => {
                    if (item.Is_Top === true) {
                        return (
                            <Box name={'top'} className={classes.sticky} key={index}>
                                <ListItem classes={classes.List_Header}>
                                    <Avatar src={Logo} className={classes.Avatar}></Avatar>
                                    {/*123123123*/}
                                </ListItem>
                                <List_Component menu={item.List} left={left} Accordion={props.Accordion}/>
                            </Box>
                        )
                    } else {
                        return (
                            <Box name={'inner'} key={index}>
                                <ListItem button
                                          classes={{
                                              root: classes.List_Item_Root,
                                              selected: classes.List_Item_Selected,
                                          }}
                                          selected={get_selected(Open_Manager, item.Indicator)}
                                          name={item.Indicator}
                                          onClick={() => handleClick(item.Indicator)}
                                >
                                    <ListItemIcon className={classes.Icon_Hover}>
                                        {item.Icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.Title}/>
                                </ListItem>
                                <Collapse in={get_checked(Open_Manager, item.Indicator)}
                                          timeout="auto"
                                          unmountOnExit
                                >
                                    {item.Node_Type === 'list'
                                        ?
                                        <List_Component menu={item.List} left={left + 4} Accordion={props.Accordion}/>
                                        :
                                        null}
                                </Collapse>
                            </Box>
                        )
                    }
                }
            )

        )
    }

    return (

        Creat_List(props.menu, props.left)

    );
};


export default List_Component;
