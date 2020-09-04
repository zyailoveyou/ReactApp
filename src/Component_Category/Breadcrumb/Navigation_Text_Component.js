import React from "react";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from "@material-ui/core/Typography";
import {Route, withRouter} from 'react-router-dom';

class Navigation_Text_Component extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='Navigation_Text_holder'>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" href="/">
                        首页
                    </Link>
                    <Link color="inherit" href="/">
                        Core
                    </Link>
                    <Typography color="textPrimary">Breadcrumb</Typography>
                </Breadcrumbs>
            </div>
        );
    }
}

export default withRouter(Navigation_Text_Component);

