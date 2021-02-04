import React, {memo, useEffect, useState} from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {Route, useHistory, useLocation} from "react-router-dom";
import {makeStyles, unstable_createMuiStrictModeTheme as createMuiTheme} from "@material-ui/core/styles";
import Show_Information_Component from "../../../../Component_Category/Information/Show_Information_Component";
import Paper from '@material-ui/core/Paper';
import Scheduler_Component from "../../../../Component_Category/Scheduler/Scheduler_Component";
import theme from "../../../../MyTheme/Theme";
import Personal_Profile from "../User/Personal_Profile";
import Set_Personal_Profile from "../User/Set_Personal_Profile";
import SetDate from "./SetDate";
import Summary from "./Summary";

const page_map = [
    {
        value: 0,
        url: '/Main/User/Scheduler/SetDate'
    },
    {
        value: 1,
        url: '/Main/User/Scheduler/Summary'
    },
]


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
        container: {
            width: '100%',
            height: '60vh',
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }
    });



const Scheduler_Page = (props) => {
    const history = useHistory();
    const location = useLocation()
    const classes = useStyles();

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
                <Tab label="日程表"
                     classes={{
                         root: classes.root,
                         selected: classes.selected,
                     }}/>
                <Tab label="汇总信息"
                     classes={{
                         root: classes.root,
                         selected: classes.selected,
                     }}/>
            </Tabs>

            <Box>
                <Route exact path='/Main/User/Scheduler/SetDate'
                       component={SetDate}></Route>
                <Route exact path='/Main/User/Scheduler/Summary'
                       component={Summary}></Route>
            </Box>
            {/*<Box>*/}
            {/*    <Grid container spacing={2} direction={"column"}>*/}
            {/*        <Grid item>*/}
            {/*            <Show_Information_Component*/}
            {/*                Title={'使用说明'}*/}
            {/*                Content={'查询以及设置个人出勤及安排个人计划'}*/}
            {/*            />*/}
            {/*        </Grid>*/}
            {/*        <Grid item>*/}
            {/*            <Paper elevation={3}>*/}
            {/*                <Scheduler_Component />*/}
            {/*            </Paper>*/}
            {/*        </Grid>*/}
            {/*    </Grid>*/}
            {/*</Box>*/}
        </Box>
    );
};

export default memo(Scheduler_Page);
