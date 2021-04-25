import React, {useEffect, useState} from 'react';
import Box from "@material-ui/core/Box";
import {Route, useHistory, useLocation} from "react-router-dom";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import {makeStyles} from "@material-ui/core/styles";
import Vacation_Approval_Page from "./Attendance/Vacation_Approval_Page";

const Attendance_Page = () => {
    return (
        <Box>
            <Route path='/Main/Attendance/Vacation'
                   component={Vacation_Approval_Page}></Route>
        </Box>
    );
};

export default Attendance_Page;
