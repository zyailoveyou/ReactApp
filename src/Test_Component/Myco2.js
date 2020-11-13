import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import theme from "../MyTheme/Theme";
import SendIcon from '@material-ui/icons/Send';
//my customized


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

    Level_1: {
        backgroundColor: "purple"
    },

    Level_2: {
        backgroundColor: "blue"
    },

    Level_3: {
        backgroundColor: "white"
    },

    Level_4: {
        backgroundColor: "red"
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
        backgroundColor: theme.palette.secondary.main + ' !important',
        color: theme.palette.secondary.contrastText + ' !important',
    },

    Icon_Hover: {
        color: theme.palette.grey["400"],
    },
});


const Myco2 = (props) => {

    const classes = useStyles(props);

    const handleClick = (e, Now_Indicator, Upper_Indicator) => {
        props.Set_Data(e, Now_Indicator, Upper_Indicator);
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
                            console.log('1232')
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
                                      onClick={(e) => handleClick(e, item.Indicator, item.Upper_List_Indicator)}
                            >
                                <ListItemIcon className={classes.Icon_Hover}>
                                    {item.Icon}
                                </ListItemIcon>
                                <ListItemText primary={item.Title}/>
                            </ListItem>
                            <Collapse in={get_checked(props.menu, item.Indicator)}
                                      timeout="auto"
                                      unmountOnExit
                            >
                                {item.Node_Type === 'list'
                                    ?
                                    <Myco2 menu={item.List} left={left + 4} Set_Data={props.Set_Data} level={item.Level}/>
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
}


export default Myco2;
