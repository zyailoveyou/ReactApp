import React from 'react';
import Box from "@material-ui/core/Box";
import {Route} from "react-router-dom";
import Department from "./Department/Department";
import Profile_Page from "../User_Manager/User/Profile_Page";


const Corporation_Page = () => {
    return (
        <Box>
            <Route path='/Main/Corporation/Department'
                   component={Department}></Route>
        </Box>
    );
};

export default Corporation_Page;
