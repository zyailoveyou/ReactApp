import React from "react";
import {Animated} from "react-animated-css";
import Accordion_Container from "../../Accordion_Component/Panel/Accordion_Container";
import menu from "../../Accordion_Component/Panel/menu";

export default class Worker_Information_Page extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Accordion_Container menu={menu}></Accordion_Container>
        );
    }
}