import React, {useEffect, useState} from 'react';
import Box from "@material-ui/core/Box";
import {Route, useHistory, useLocation} from "react-router-dom";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../../../MyTheme/Theme";
import Vacation_Handle_Page from "./Vacation_Handle_Page";
import Vacation_Summary_Page from "./Vacation_Summary_Page";


const useStyles = makeStyles(
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

    });

const page_map = [
    {
        value: 0,
        url: '/Main/Attendance/Vacation/Unhandled'
    },
    {
        value: 1,
        url: '/Main/Attendance/Vacation/Summary'
    },
]


const Vacation_Approval_Page = () => {


    const history = useHistory();
    const location = useLocation()
    const classes = useStyles()
    const result = page_map.find((item) => {
        return item.url === location.pathname
    })

    const [value, setValue] = useState(result.value);

    const handleChange = (event, newValue) => {
        const result = page_map.find((item) => {
            return item.value === newValue
        })
        history.push(result.url);
    };


    useEffect(() => {
        const result = page_map.find((page_inf) => {
            return location.pathname === page_inf.url
        })
        setValue(result.value);
    }, [location])


    return (
        <Box>

            <Tabs value={value} onChange={handleChange}
                  classes={{indicator: classes.indicator}}>
                <Tab label="考勤审批"
                     classes={{
                         root: classes.root,
                         selected: classes.selected,
                     }}/>
                <Tab label="记录统计"
                     classes={{
                         root: classes.root,
                         selected: classes.selected,
                     }}/>
            </Tabs>
            <Route path='/Main/Attendance/Vacation/Unhandled'
                   component={Vacation_Handle_Page}></Route>
            <Route path='/Main/Attendance/Vacation/Summary'
                   component={Vacation_Summary_Page}></Route>
        </Box>
    );
};

export default Vacation_Approval_Page;
