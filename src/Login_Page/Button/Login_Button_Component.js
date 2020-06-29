import React from "react";


export default class Login_Button_Component extends React.Component{

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <button className='Login_Button' onClick={this.props.OnClickLogin}>登录</button>
        );
    }


}
