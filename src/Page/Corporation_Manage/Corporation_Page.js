import React, {useEffect, useState} from 'react';
import {Box} from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../MyTheme/Theme";
import {Route,useHistory,useLocation} from "react-router-dom";
import Corporation_Information_Page from "./Corporation_Information_Component";
import Worker_Information_Page from "./Worker_Information_Page";
import Grid from "@material-ui/core/Grid";


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
        }
    });

const page_map = [
    {
        value: 0,
        url: '/Main/Corporation/Information'
    },
    {
        value: 1,
        url: '/Main/Corporation/Worker'
        // url: '/'
    }
]

const Corporation_Page = (props) => {
    const history = useHistory();
    const location = useLocation()
    const classes_tab = useStyles_tab();

    const [value, setValue] = useState(
    ()=>{
        const result =  page_map.find((item)=>{
            return item.url === location.pathname
        })
        return result.value
    });


    const handleChange = (event, newValue) => {
        const result = page_map.find((item)=>{
            return item.value === newValue
        })
        console.log(history)
        history.push(result.url);
    };


    useEffect(()=>{
        const result = page_map.find((page_inf) => {
            return location.pathname ===page_inf.url
        })
        setValue(result.value);

    },[location])

    return (
        <Box>
            <Tabs value={value} onChange={handleChange}
                  classes={{indicator: classes_tab.indicator}}>
                <Tab label="公司信息"
                     classes={{
                         root: classes_tab.root,
                         selected: classes_tab.selected,
                     }}/>
                <Tab label="员工信息"
                     classes={{
                         root: classes_tab.root,
                         selected: classes_tab.selected,
                     }}/>
            </Tabs>
            <Route exact path='/Main/Corporation/Information'
                   component={Corporation_Information_Page}></Route>
            <Route exact path='/Main/Corporation/Worker'
                   component={Worker_Information_Page}></Route>
        </Box>
    );
};

export default Corporation_Page;
