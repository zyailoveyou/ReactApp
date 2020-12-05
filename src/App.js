import React, {useState} from 'react';
import 'jquery/dist/jquery.js'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js'
import './App.css';
import Main_Page from './Page/Main_Page';
import Login_Page from './Page/Login_Page';
import Button from '@material-ui/core/Button';
import 'animate.css/animate.min.css'

import {BrowserRouter, Route, Switch} from 'react-router-dom'
import PrivateRoute from "./Private_Router/PrivateRoute";
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import theme from "./MyTheme/Theme";

//test
import Myco3 from "./Test_Component/Myco3";



const useStyles = makeStyles({
    root: {
        width: '100%',
        height:'500px',


    },
});


function App() {
    // document.body.style = 'overflow:hidden;';
    return (
        // <Myco3 />
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={Login_Page}></Route>
                    <PrivateRoute path='/Main' component={Main_Page}></PrivateRoute>
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
}


export default App;
