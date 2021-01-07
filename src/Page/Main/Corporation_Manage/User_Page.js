import React, {useEffect, useState, memo, useContext} from 'react';
import {Box} from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../../MyTheme/Theme";
import {Route, useHistory, useLocation} from "react-router-dom";
import Personal_Profile from "./Personal_Profile";
import Set_Personal_Profile from "./Set_Personal_Profile";
import CloudBase_Context from "../../../Context/Context_Info/CloudBase_Context";
import CircularProgress from "@material-ui/core/CircularProgress";
import User_Context from "../../../Context/Context_Info/User_Context";


const useStyles_tab = makeStyles(
    {
        root: {
            background: (theme.palette.grey["400"]),
            color: (theme.palette.primary.contrastText),
            borderTopRightRadius: '0.5rem',
            borderTopLeftRadius: '0.5rem',
            '&$selected': {
                background: (theme.palette.primary.main),
                color: (theme.palette.primary.contrastText),
                boxShadow: 'none',
                outline: "none",
            },
        },
        selected: {},
        indicator: {
            background: (theme.palette.secondary.main),
        },
        container: {
            width: '100%',
            height: '60vh',
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }
    });

const page_map = [
    {
        value: 0,
        url: '/Main/Corporation/Information'
    },
    {
        value: 1,
        url: '/Main/Corporation/SetInformation'

    }
]

const User_Page = (props) => {
    console.log('render user page')
    const history = useHistory();
    const location = useLocation()
    const result = page_map.find((item) => {
        return item.url === location.pathname
    })
    const [value, setValue] = useState(result.value);
    const classes = useStyles_tab();

    useEffect(() => {
        const result = page_map.find((page_inf) => {
            return location.pathname === page_inf.url
        })
        setValue(result.value);
    }, [location])


    const handleChange = (event, newValue) => {
        const result = page_map.find((item) => {
            return item.value === newValue
        })
        history.push(result.url);
    };

    return (
        <Box>
            <Tabs value={value} onChange={handleChange}
                  classes={{indicator: classes.indicator}}>
                <Tab label="公司信息"
                     classes={{
                         root: classes.root,
                         selected: classes.selected,
                     }}/>
                <Tab label="员工信息"
                     classes={{
                         root: classes.root,
                         selected: classes.selected,
                     }}/>
            </Tabs>
            <Box>
                <Route exact path='/Main/Corporation/Information'
                       component={Personal_Profile}></Route>
                <Route exact path='/Main/Corporation/SetInformation'
                       component={Set_Personal_Profile}></Route>
            </Box>
        </Box>

    );
};

export default memo(User_Page, (prevProps, nextProps) => {
    if (prevProps != nextProps) {
        return false
    } else {
        return true
    }
});
