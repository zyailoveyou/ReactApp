import React from "react";
import InputArea_Component from "../InputArea/InputArea_Component";
import PropTypes from 'prop-types';


export default class UserName_Component extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='UserName_Component'>
                <InputArea_Component
                    Name = '用户名'
                    Type ='text'
                    id = 'idtext'
                    SetData = {this.props.SetData}>
                </InputArea_Component>
            </div>
        );
    }
}

// UserName_Component.prototype = {
//     SetData:PropTypes.element.isRequired,
// }


