import React from "react";
import '../CSS/Button.scss'

export default class Button_Component extends React.Component{

    constructor(props) {
        super(props);
        this.Class = props.Class
        this.Name = props.Name
    }


    render() {
        return (
            <button className={this.Class} onClick={this.props.OnClick}>{this.Name}</button>
        );
    }


}
