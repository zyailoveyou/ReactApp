import React from "react";
import Logo from "../Image/Logo/Logo.png";
import './CSS/StatusBar_Component.scss'

export default class StatusBar_Component extends React.Component{

    constructor(props) {
        super(props);
    }


    render() {
        return(
            <div className='status_bar'>
                <div className='status_bar_title mr-auto'>
                    <div className='logo_holder'>
                    <img src={Logo} alt=""/>
                    </div>
                    <p>欢迎进入眼球后台</p>
                </div>
                <div className='status_bar_userinf mr-4'>
                    <p>欢迎您XX已登录</p>
                </div>
                <div className='status_bar_logout'>
                    <p>logout button</p>
                </div>
            </div>
        )
    }

}

