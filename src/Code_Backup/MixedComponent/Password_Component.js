import React from "react";
import InputArea_Component from "../InputArea/InputArea_Component";
import PropTypes from 'prop-types';


export default class Password_Component extends React.Component{

    constructor(props) {
        super(props);
    }


    render() {

        return (
            <div className='Password_Component'>
                <InputArea_Component
                    Name ='密码'
                    Type ='password'
                    id = 'idpassword'
                    SetData = {this.props.SetData}>
                </InputArea_Component>
            </div>

        );
    }

}

// Password_Component.prototype={
//     SetData:PropTypes.element.isRequired
// }
