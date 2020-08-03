import React from "react";

export default class Accordion_Item extends React.Component {

    Details =
        {
            title: null,
            onopen: false,
            id: null,
        }

    constructor(props) {
        super(props);
        this.Details.title = props.title;
        this.Details.onopen = props.onopen;
        this.Details.id = props.id
        this.padding = this.props.padding;
        this.level = this.props.level;
    }

    render() {
        return (
            <div className={this.level +" item"} >{this.Details.title}</div>
        );
    }
}

