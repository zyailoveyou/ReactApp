import React, {useState, memo} from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {Route, useHistory, useLocation} from "react-router-dom";
import Department_Page from "./Department/Department_Page";

const Corporation_Page = () => {
    return (
        <Box>
            <Route path='/Main/Corporation/Department'
                   component={Department_Page}></Route>
        </Box>
    );
};

export default Corporation_Page;
