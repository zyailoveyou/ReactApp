import React, {useState, memo} from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {Route, useHistory, useLocation} from "react-router-dom";
import Personal_Profile from "./User/Personal_Profile";
import Set_Personal_Profile from "./User/Set_Personal_Profile";
import Profile_Page from "./User/Profile_Page";
import Scheduler_Page from "./Scheduler/Scheduler_Page";

const User_Page = () => {
    return (
        <Box>
            <Route path='/Main/User/Profile'
                   component={Profile_Page}></Route>
            <Route path='/Main/User/Scheduler'
                   component={Scheduler_Page}></Route>
        </Box>
    );
};

export default User_Page;
