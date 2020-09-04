import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';

class PrivateRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: true,
        }
    }

    componentWillMount() {
        if(!this.state.isAuthenticated){
            const {history} = this.props;
            setTimeout(() => {
                history.replace("/");
            }, 1000)
        }

    }

    render() {
        // let {...props} = this.props;
        let props2 = this.props;
        return  this.state.isAuthenticated ?
            (<Route {...props2} />)
            :
            (<p style = {{"width": "100%", "text-align": "center", "fontSize": "20px", "lineHeight": "50px"}}>请登录...</p>)

    }
}

export default withRouter(PrivateRoute);
