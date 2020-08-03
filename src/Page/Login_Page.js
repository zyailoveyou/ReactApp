import React from "react";
import Login_Register_Panel from '../Login_Component/Panel/Login_Register_Panel'
import './CSS/Login_Page.scss'


export default class Login_Page extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='PageWrapper'>
                <Login_Register_Panel/>
            </div>
        )
    }

}
