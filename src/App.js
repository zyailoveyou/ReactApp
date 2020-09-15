import React from 'react';
import 'jquery/dist/jquery.js'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js'
import './App.css';
import Main_Page from './Page/Main_Page';
import Login_Page from './Page/Login_Page';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import PrivateRoute from "./Private_Router/PrivateRoute";
import {makeStyles} from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from "./MyTheme/Theme";
import Myco from "./Test_Component/Myco";
import menu from "./Component_Category/Menu_List/Data/menu";



const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    test: {
        position: "sticky",
        top: 0,
    },
    test2: {
        position: "sticky",
        top: 0,
    }
});


function App() {

    const classes = useStyles();
    return (
        // <ThemeProvider theme={theme}>
        //     <BrowserRouter>
        //         <Switch>
        //             <Route path='/' exact component={Login_Page}></Route>
        //             <PrivateRoute path='/main'  component={Main_Page}></PrivateRoute>
        //         </Switch>
        //     </BrowserRouter>
        // </ThemeProvider>
        <Myco menu = {menu}></Myco>


        // <Animated animationIn="animate__fadeIn" animationOut="animate__fadeOut" isVisible={true}>
        // <div>123bbb</div>
        // </Animated>
        // <div>
        //     <Accordion_Container
        //         menu={menu}
        //         padding="2rem"
        //     />
        // </div>
    );
}


export default App;
