import {Route} from 'react-router-dom'
import React, {useEffect, useState} from "react";
import Footer_Component from "../Component_Category/Footer/Footer_Component";
import Navigation_Text from '../Component_Category/Breadcrumb/Navigation_Text_Component'
import Home_Page from "./Home/Home_Page";
import List_Component from "../Component_Category/Menu_List/List_Component";
import menu from "../Component_Category/Menu_List/Data/menu";
import Corporation_Page from "./Corporation_Manage/Corporation_Page";
import App_Bar from "../Component_Category/App_Bar/App_Bar";
//material ui
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import theme from "../MyTheme/Theme";
import {Corporation_Context} from "../Context/Corporation_Context";
import Corporation_Form from "./Data/Corporation_Form";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Box} from "@material-ui/core";

const useStyles_container = makeStyles({
    position: {
        position: "relative",
        width: '100%',
    },
    container: {
        padding: '1.5rem',
        background: theme.palette.grey["200"],
        width: '100%'
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
    fill_in: {
        width: '100%',
        background: theme.palette.grey.A100,
    },
    selected: {},
});


const Main_Page = (props) => {

    const classes_container = useStyles_container();
    const setData = (data_name, data) => {
        SetCorporation((prevCorporation) => {
            return {...prevCorporation, [data_name]: data};
        })
    }
    const [Corporation, SetCorporation] = useState({...Corporation_Form, 'SetData': setData});

    useEffect(() => {
        console.log('已经变更')
        console.log(Corporation)
    }, [Corporation])

    return (
        <Corporation_Context.Provider value={Corporation}>
            <Grid container>
                <Grid container item xs={2}>
                    <Box className={classes_container.fill_in}>
                        <List_Component menu={menu} left={2} Accordion={true}/>
                    </Box>
                </Grid>
                <Grid container item xs={10}>
                    <App_Bar />
                    <div className={classes_container.container}>
                        <Grid container spacing={2} direction={"column"}>
                            <Grid item xs={12}>
                                <Navigation_Text/>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider orientation='horizontal' variant='middle'/>
                            </Grid>
                            <Grid item>
                                <Route path='/Main/Home' component={Home_Page}></Route>
                                <Route path='/Main/Corporation' component={Corporation_Page}></Route>
                            </Grid>
                            <Footer_Component Title='React Admin ©2020 Created By Neo Zhang'/>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </Corporation_Context.Provider>
    );
};

export default Main_Page;





