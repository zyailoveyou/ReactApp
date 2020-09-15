import React from 'react';
import Collapse from "@material-ui/core/Collapse";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import StarBorder from "@material-ui/icons/StarBorder";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../MyTheme/Theme";


const useStyles = makeStyles({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: (props) => {
            return theme.spacing(3 * props.index);
        }
    },
    test: {
        position: "relative"
    }
});

const Recursion_Component = (props) => {

    const classes = useStyles(props);
    const [Open_Manager, Set_Open_Manager] = React.useState(
        props.menu
    );

    const Search_Menu_Indicator = (Passed, indicator) => {
        console.log('执行次数')
        if (Passed.Indicator === indicator) {
            return Passed;
        } else {
            if (Passed.List != null && Passed.List != undefined) {
                for (let i = 0; i < Passed.List.length; i++) {
                    const result = Search_Menu_Indicator(Passed.List[i], indicator)
                    if (result != null) {
                        return result
                    }
                }
            } else {
                return null;
            }
        }
    }


    const handleClick = (Passed, indicator, upper_indicator, node_type) => {
        Set_Open_Manager((PreManager) => {
            let copy_manager = JSON.parse(JSON.stringify(PreManager));
            console.log(copy_manager);
            let Upper_Menu = Search_Menu_Indicator(copy_manager, upper_indicator);
            Upper_Menu.List.forEach((item) => {
                if (item.Indicator === indicator) {
                    item.On_Open = !item.On_Open;
                } else if (props.Accordion === true) {
                    item.On_Open = false;
                }
            })
            console.log(copy_manager)
            return copy_manager;
        })
    };


    function get_checked(Passed, Now_Indicator) {
        const result = Search_Menu_Indicator(Passed, Now_Indicator);
        console.log(result.Indicator);
        if (result.Node_Type === 'list') {
            return result.On_Open;
        } else {
            return true
        }

    }


    function Creat_List(List, Indicator) {

        return (
            List.map((item, index, arr) => {
                return (
                    <Collapse in={() => {
                        return true
                    }}
                              timeout="auto"
                              unmountOnExit
                              key={index}
                    >
                        <ListItem button
                                  className={classes.nested}
                                  name={item.Indicator}
                                  key={index}
                        >
                            <ListItemIcon>
                                <StarBorder/>
                            </ListItemIcon>
                            <ListItemText primary={item.Title}/>
                        </ListItem>
                        {item.Node_Type === 'list' ? <Recursion_Component menu={item.List}
                                                                          Indicator={item.Indicator}
                                                                          index={(props.index + 1)}/> : null}
                    </Collapse>
                )
            })
        )
    }

    return (
        Creat_List(props.menu, props.Indicator)
    );
};

export default Recursion_Component;
