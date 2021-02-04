import React from "react";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Box from "@material-ui/core/Box";
import Link from '@material-ui/core/Link';
import Typography from "@material-ui/core/Typography";
import {capitalize} from 'lodash';
import {Route, withRouter} from 'react-router-dom';

import {useLocation} from "react-router-dom";
import {useHistory} from "react-router-dom";

const Navigation_Text_Component = (props) => {
    console.log('render navigation text')

    const location = useLocation();
    const history = useHistory();
    const Location_Array = location.pathname.split('/').filter((item, index) => {
        return item;
    })
    const Group_Location = []

    Location_Array.forEach((item) => {
        console.log(item)
        Group_Location.push(item)
    })

    const handleClick = (event, history) => {
        console.log(history)
        event.preventDefault();
        console.log('clicked')
    }

    return (
        <Box className='Navigation_Text_holder'>
            <Breadcrumbs aria-label="breadcrumb">
                {
                    Group_Location.map((item, index) => {
                        return (
                            <Link color="inherit" href="/" key={index} onClick={(e) => handleClick(e, history)}>
                                {item}
                            </Link>
                        )
                    })
                }
            </Breadcrumbs>
        </Box>
    );
}

export default withRouter(Navigation_Text_Component);

