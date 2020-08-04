import React from "react";
import Accordion_Comtainer from "../Accordion_Component/Panel/Accordion_Comtainer";
import {menu} from '../Accordion_Component/Panel/menu'
import './CSS/Main_Page.scss'
import StatusBar_Component from '../StatusBar_Component/StatusBar_Component'

export class Main_Page extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='main_holder'>
                <div className='status_bar_holder'>
                    <StatusBar_Component />
                </div>
                <div className='operation_area_holder'>
                    <div className='menu_holder'>
                    <Accordion_Comtainer
                        menu={menu}
                    />
                    </div>
                    <div className='panel_holder'>
                        <p>zhumianban</p>
                    </div>
                </div>
            </div>
        );
    }


}

export default Main_Page


