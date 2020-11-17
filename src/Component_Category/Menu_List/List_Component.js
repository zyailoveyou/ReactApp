import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import cloneDeep from 'lodash/cloneDeep';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
//my customized
import theme from "../../MyTheme/Theme";
//test icon
import Recursion_Component from "./Recursion_Component";


const useStyles = makeStyles({
    sticky: {
        width: '100%',
        position: "sticky",
        top: 0,
        color: theme.palette.grey["400"],
        // background: theme.palette.grey.A100,
        // color: theme.palette.grey["200"],
    },
    nested: {
        paddingLeft: (props) => {
            return theme.spacing(props.left);
        },
    },
    Avatar: {
        width: '3.5rem',
        height: '3.5rem',
        backgroundColor: "white",
        color: "black"
    },
    List_Header: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: '1rem'

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
});


const List_Component = (props) => {

    const classes = useStyles(props);
    const [Open_Manager, Set_Open_Manager] = React.useState(
        props.menu
    );


    useEffect(() => {
        if (Open_Manager[0].Last_Choice_Type === 'item') {
            Unselected_Other_item();
        }
    }, [Open_Manager])

    const Unselected_Other_item = () => {
        Set_Open_Manager((PreManager) => {
            let copy_manager = cloneDeep(PreManager);
            console.log(copy_manager);
            const result = Cancel_Other_Item(copy_manager, copy_manager[0].Last_Choice_Indicator);
            result[0].Last_Choice_Indicator = null;
            result[0].Last_Choice_Type = null;
            return result;
        })
    }

    const Cancel_Other_Item = (Passed, indicator) => {

        for (let i = 0; i < Passed.length; i++) {
            if (Passed[i].Node_Type === 'item') {
                if (Passed[i].Indicator != indicator) {
                    Passed[i].Selected = false;
                }
            } else {
                if (Passed[i].List != null && Passed[i].List != undefined) {
                    Cancel_Other_Item(Passed[i].List, indicator)
                }
            }
        }
        return Passed;
    }


    const Search_Menu_Indicator = (Passed, indicator) => {
        console.log('执行次数')
        for (let i = 0; i < Passed.length; i++) {
            if (Passed[i].Indicator === indicator) {
                return Passed[i]
            } else {
                if (Passed[i].List != null && Passed[i].List != undefined) {
                    const result = Search_Menu_Indicator(Passed[i].List, indicator)
                    if (result != null) {
                        return result
                    }
                }
            }
        }
        return null
    }


    const Set_State = (now_indicator, upper_indicator) => {
        Set_Open_Manager((PreManager) => {
            let copy_manager = cloneDeep(PreManager);
            console.log(copy_manager);
            let Upper_Menu = Search_Menu_Indicator(copy_manager, upper_indicator);
            console.log(Upper_Menu)

            for (let i = 0; i < Upper_Menu.List.length; i++) {
                if (Upper_Menu.List[i].Indicator === now_indicator) {
                    Upper_Menu.List[i].Selected = !Upper_Menu.List[i].Selected
                    if (Upper_Menu.List[i].Node_Type === 'list')
                    {
                        copy_manager[0].Last_Choice_Type = 'list';
                    }
                    else {
                        copy_manager[0].Last_Choice_Type = 'item';
                    }
                    copy_manager[0].Last_Choice_Indicator = now_indicator;
                } else {
                    if (Upper_Menu.List[i].Node_Type === 'list' && props.Accordion === true) {
                        Upper_Menu.List[i].Selected = false;
                    }
                }
            }
            return copy_manager;
        })
    }

    function Creat_List(List) {
        return (
            List.map((item, index) => {
                    if (item.Is_Top === true) {
                        return (
                            <Box name={'top'} className={classes.sticky} key={index}>
                                <ListItem className={classes.List_Header}>
                                    <Avatar className={classes.Avatar} src={item.Logo}>

                                    </Avatar>

                                    {/*<img src={Logo} alt="" width={'10px'}/>*/}
                                </ListItem>
                                <Recursion_Component
                                    menu={item.List}
                                    left={props.left}
                                    Set_Data={Set_State}
                                    level={item.Level}
                                />
                            </Box>
                        )
                    }
                }
            )

        )
    }

    return (
        Creat_List(Open_Manager)
    );
};


export default List_Component;
