import React, {useState,useMemo} from 'react';
import 'jquery/dist/jquery.js'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js'
import './App.css';
import Main_Page from './Page/Main/Main_Page';
import Login_Page from './Page/Login_Register/Login_Page';
import Error_Page from "./Page/Error/Error_Page";
import 'animate.css/animate.min.css'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import PrivateRoute from "./Private_Router/PrivateRoute";
import {ThemeProvider} from '@material-ui/core/styles';
import theme from "./MyTheme/Theme";
import CloudBase_Context from "./Context/Context_Info/CloudBase_Context";
import Cloud_Base from "./Context/Data/Cloud_Base_Data";

//test

document.body.style.overflowY = 'overlay !important'

const App =()=> {
    console.log('render top')
    const [errorOpen, setErrorOpen] = useState(true)
    return (
        <CloudBase_Context.Provider value={Cloud_Base}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Switch>
                        <Route path='/' exact component={Login_Page} />
                        <PrivateRoute path='/Main' component={Main_Page} />
                        <Route path='/Error' render={() => {
                            return (
                                <Error_Page
                                    type='error'
                                    title='非法操作'
                                    content='请先登录再进行操作'
                                    open={errorOpen}
                                    setOpen={setErrorOpen}
                                />
                            )
                        }} />
                    </Switch>
                </BrowserRouter>
            </ThemeProvider>
        </CloudBase_Context.Provider>
        // <div>123123</div>

    );
}


export default App;
