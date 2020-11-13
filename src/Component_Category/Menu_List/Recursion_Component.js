import React from 'react';
import Collapse from "@material-ui/core/Collapse";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom';
import theme from "../../MyTheme/Theme";
import Box from "@material-ui/core/Box";


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
        paddingLeft: '2rem'


    },

    List_Item_Root: {
        paddingLeft: (props) => {
            return theme.spacing(props.left);
        },

        color: theme.palette.grey["400"],
        "&:hover": {
            color: theme.palette.secondary.contrastText,
            '& $Icon_Hover': {
                color: 'white',
            },
        },
    },

    List_Item_Selected: {
        backgroundColor: theme.palette.secondary.main + ' !important',
        color: theme.palette.secondary.contrastText + ' !important',
    },

    Icon_Hover: {
        color: theme.palette.grey["400"],
    },


    Level_1: {},

    Level_2: {
        backgroundColor: theme.palette.grey.A200
    },

    Level_3: {
        backgroundColor: theme.palette.grey.A400
    },

    Level_4: {
        backgroundColor: theme.palette.grey.A700
    },
});

const Recursion_Component = (props) => {

    const history = useHistory();
    const classes = useStyles(props);

    const handleClick = (item,Now_Indicator, Upper_Indicator) => {
        props.Set_Data(Now_Indicator, Upper_Indicator);
        console.log('开始执行')
        if (item.Node_Type === 'item' && item.On_Click != undefined)
        {
            item.On_Click(history);
        }

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
                    return (
                        <Box name={'inner'} key={index} className={function () {
                            switch (props.level) {
                                case 1:
                                    return classes.Level_1;
                                case 2:
                                    return classes.Level_2;
                                case 3:
                                    return classes.Level_3;
                                case 4:
                                    return classes.Level_4;
                            }
                        }()}>
                            <ListItem button
                                      classes={{
                                          root: classes.List_Item_Root,
                                          selected: classes.List_Item_Selected,
                                      }}
                                      selected={get_selected(props.menu, item.Indicator)}
                                      name={item.Indicator}
                                      onClick={() => handleClick(item,item.Indicator, item.Upper_List_Indicator)}
                            >
                                <ListItemIcon className={classes.Icon_Hover}>
                                    {item.Icon}
                                </ListItemIcon>
                                <ListItemText primary={item.Title}/>
                                {
                                    item.Node_Type === 'list' ? get_checked(props.menu, item.Indicator) ? item.ExpandLess : item.ExpandMore : null
                                }
                            </ListItem>
                            <Collapse in={get_checked(props.menu, item.Indicator)}
                                      timeout="auto"
                                      unmountOnExit
                            >
                                {item.Node_Type === 'list'
                                    ?
                                    <Recursion_Component menu={item.List} left={left + 4} Set_Data={props.Set_Data}
                                                         level={item.Level}/>
                                    :
                                    null}
                            </Collapse>
                        </Box>
                    )
                }
            )

        )
    }

    return (
        Creat_List(props.menu, props.left)
    );
};

export default Recursion_Component;
