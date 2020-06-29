import React from "react";


export default class Register_Button_Component extends React.Component{

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <button className='Login_Button' onClick={this.props.OnClickRegister}>注册</button>
        )
    }
}
