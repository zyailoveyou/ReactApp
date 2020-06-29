import React from "react";
import Login_Button_Component from "./Login_Button_Component";
import Register_Button_Component from "./Register_Button_Component";

export default class Button_Group extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className='Button_Group'>
                <Login_Button_Component  OnClickLogin = {this.props.OnClickLogin}/>
                <Register_Button_Component  OnClickRegister = {this.props.OnClickRegister}/>
            </div>

        );
    }

}
