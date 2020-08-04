import React, {useContext} from 'react';
import 'jquery/dist/jquery.js'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js'
import './App.css';
import Main_Page from './Page/Main_Page';
import Login_Page from './Page/Login_Page';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import PrivateRoute from "./Private_Router/PrivateRoute";


function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login_Page}></Route>
                <PrivateRoute path='/main'  component={Main_Page}></PrivateRoute>
            </Switch>
        </BrowserRouter>
        // <Myco data = {testinf}></Myco>
        // <div>
        //     <Accordion_Comtainer
        //         menu={menu}
        //         padding="2rem"
        //     />
        // </div>
    );
}


export default App;
