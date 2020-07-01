import React from "react";
import UserName_Component from "../MixedComponent/UserName_Component";
import Password_Component from "../MixedComponent/Password_Component";
import Button_Group from "../Button/Button_Group";
import "../CSS/Login_Register_Panel.scss"


export default class Login_Register_Panel extends React.Component{

    Login_Data = {
        UserName:'',
        PassWord:'',
        Certification:'',
    }

    constructor(props) {
        super(props);
        this.SetUserName = this.SetUserName.bind(this);
        this.SetPassWord = this.SetPassWord.bind(this);
        this.SetCertification = this.SetCertification.bind(this);
        this.OnClickLogin = this.OnClickLogin.bind(this);
        this.OnClickRegister = this.OnClickRegister.bind(this);
        this.state = this.Login_Data;
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }

    SetUserName(UserNameInput){
        console.log('执行了setusername')
        this.setState({
            UserName: UserNameInput,
        })

    }

    SetPassWord(PassWordInput){
        console.log('执行了setpassword')
        this.setState({
            PassWord: PassWordInput,
        })
    }

    SetCertification(CertificationInput){
        this.setState({
            Certification: CertificationInput,
        })
    }

    OnClickLogin(){
        console.log('执行了OnClickLogin')
        //执行登录操作

    }

    OnClickRegister(){
        console.log('执行了OnClickRegister')
        //执行注册操作

    }

    render() {

        console.log('has done render')

        return (
            <div className='Login_Register_Panel'>
            <div className='BackGround'></div>
            <div className='PanelContent'>
                <UserName_Component SetData = {this.SetUserName}/>
                <Password_Component SetData = {this.SetPassWord}/>
                <Button_Group OnClickLogin ={this.OnClickLogin} OnClickRegister = {this.OnClickRegister}/>
            </div>
            </div>

        );
    }

}
