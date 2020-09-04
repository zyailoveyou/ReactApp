import React, {useEffect, useState} from "react";
import Footer_Component from "../Component_Category/Footer/Footer_Component";
import Navigation_Text from '../Component_Category/Breadcrumb/Navigation_Text_Component'
import {Route} from 'react-router-dom'
import Corporation_Information_Page from "./Fuction_Page/Corporation_Information_Page";
import Worker_Information_Page from "./Fuction_Page/Worker_Information_Page";
import Divider from "@material-ui/core/Divider";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import theme from "../MyTheme/Theme";
import {Corporation_Context} from "../Context/Corporation_Context";
//data
import Corporation_Form from "./Data/Corporation_Form";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from "@material-ui/core/Typography";

const useStyles_container = makeStyles({
    container: {
        padding: '1.5rem',
        overflowX: "hidden",
        overflowY: "hidden",
        background:theme.palette.grey["200"],
        width:'100%'
    },
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        '&$selected': {
            background: 'rgba(0, 0, 0, 0.12)',
            color: 'white',
            boxShadow: 'none',
            outline: "none",
        },
    },
    selected: {},
});


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
        url: '/main/corporation/information'
    },
    {
        value: 1,
        url: '/main/corporation/worker'
    }
]

const Main_Page = (props) => {

    const classes_container = useStyles_container();
    const classes_tab = useStyles_tab();
    const {history} = props;
    const [value, setValue] = useState(0);

    const setData = (data_name, data) => {
        SetCorporation((prevCorporation) => {
            return {...prevCorporation, [data_name]: data};
        })
    }


    const [Corporation, SetCorporation] = useState({...Corporation_Form, 'SetData': setData});
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        page_map.forEach((page_inf) => {
            if (page_inf.value === value) {
                history.push(page_inf.url);
            }
        })
    }, [value]);

    useEffect(() => {
        console.log('name已经变更')
        console.log(Corporation)
    }, [Corporation])


    return (
        <Corporation_Context.Provider value={Corporation}>
            <Grid container>
                <Grid container item xs ={2}>
                    <div>这是导航栏区域</div>
                </Grid>
                <Grid container item xs = {10}>
                    <AppBar position={"sticky"}>
                        <Toolbar>

                        </Toolbar>
                    </AppBar>
                    <div className={classes_container.container}>
                        <Grid container spacing={2} direction={"column"}>
                            <Grid item>
                                <Navigation_Text/>
                            </Grid>
                            <Grid item>
                                <Divider orientation='horizontal' variant='middle'/>
                            </Grid>
                            <Grid item container>
                                <Tabs value={value} onChange={handleChange} classes={{indicator: classes_tab.indicator}}>
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
                                <Route path='/main/corporation/information' component={Corporation_Information_Page}></Route>
                                <Route path='/main/corporation/worker' component={Worker_Information_Page}></Route>
                            </Grid>
                            <Footer_Component Title = 'React Admin ©2020 Created By Neo Zhang'/>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </Corporation_Context.Provider>
    );
};

export default Main_Page;





