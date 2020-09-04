import React from 'react';
import 'jquery/dist/jquery.js'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js'
import './App.css';
import Myco from "./Test_Component/Myco";
import Main_Page from './Page/Main_Page';
import Login_Page from './Page/Login_Page';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import PrivateRoute from "./Private_Router/PrivateRoute";
import {Corporation_Context} from "./Context/Corporation_Context";

function App() {


    return (

        // <BrowserRouter>
        //     <Switch>
        //         <Route path='/' exact component={Login_Page}></Route>
        //         <PrivateRoute path='/main'  component={Main_Page}></PrivateRoute>
        //     </Switch>
        // </BrowserRouter>

        // <Animated animationIn="animate__fadeIn" animationOut="animate__fadeOut" isVisible={true}>
        // <div>123bbb</div>
        // </Animated>
        // <div className='animate__animated animate__bounce animate__slow'>123bb</div>
        <Myco></Myco>
        // <div>
        //     <Accordion_Container
        //         menu={menu}
        //         padding="2rem"
        //     />
        // </div>
    );
}


export default App;
