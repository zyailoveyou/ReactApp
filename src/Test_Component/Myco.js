import React, {useEffect, useRef} from 'react';
import Collapse from "@material-ui/core/Collapse";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import StarBorder from "@material-ui/icons/StarBorder";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from "@material-ui/core/styles";
import theme from "../MyTheme/Theme";
import {Box} from "@material-ui/core";
import Myco2 from "./Myco2";
import cloneDeep from 'lodash/cloneDeep';
import Button from '@material-ui/core/Button';
import Avatar from "@material-ui/core/Avatar";
import Logo from "../Component_Category/Menu_List/Avatar/Logo.png";


const useStyles = makeStyles({
    root: {
        width: '100%',

    },
    nested: {
        paddingLeft: (props) => {
            return theme.spacing(props.left);
        }
    },
    test: {
        position: "relative"
    }
});


const Myco = (props) => {
    const classes = useStyles(props);
    let Current_Selected_Item = null;
    const [Open_Manager, Set_Open_Manager] = React.useState(
        props.menu
    );

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


    const Set_State = (e, now_indicator, upper_indicator) => {
        Set_Open_Manager((PreManager) => {
            let copy_manager = cloneDeep(PreManager);
            console.log(copy_manager);
            let Upper_Menu = Search_Menu_Indicator(copy_manager, upper_indicator);
            console.log(Upper_Menu)
            
            for (let i = 0; i < Upper_Menu.List.length; i++) {

                if (Upper_Menu.List[i].Indicator === now_indicator){
                    if (Upper_Menu.List[i].Node_Type==='list')
                    {
                        Upper_Menu.List[i].On_Open =!Upper_Menu.List[i].On_Open
                    }
                    else {
                        Upper_Menu.List[i].Selected =!Upper_Menu.List[i].Selected
                        break;
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
                                <ListItem classes={classes.List_Header}>
                                    <Avatar src={Logo} className={classes.Avatar}></Avatar>
                                </ListItem>
                                <Myco2 menu={item.List} left={4} Set_Data={Set_State}/>
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
}


export default Myco;