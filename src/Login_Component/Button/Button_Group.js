import React from "react";
import Button_Component from "./Button_Component";
import '../CSS/Button.scss'

export default class Button_Group extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className='Button_Group'>
                <Button_Component Class = 'Login_Button' Name = '登录' OnClick = {this.props.OnClickLogin}/>
                <Button_Component Class = 'Register_Button' Name = '注册' OnClick = {this.props.OnClickRegister}/>
            </div>

        );
    }

}
