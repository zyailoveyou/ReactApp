import React from "react";
import Accordion_Item from "../Accordion_Component/Panel/Accordion_Item";

export default class Myco extends React.Component {


    constructor(props) {
        super(props);
        this.state = {inf: this.props.data};
        this.creatAccordion_Comtainer = this.creatAccordion_Comtainer.bind(this);
        this.onclicklisttitle = this.onclicklisttitle.bind(this);
    }


    creatAccordion_Comtainer(Nodeinf) {
        console.log(Nodeinf);
        return (
            Nodeinf.map(function (item, index, arr) {
                if (item.type === 'list') {
                    return (
                        <div className={item.number1}>
                            <div className={item.number1 + ' title'}></div>
                            <div
                                className={item.number1 + ' listgroup'}
                                onClick={() => this.onclicklisttitle()}
                            >
                                <Myco data = {item.list}></Myco>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div>{item.number1 + "  " + item.number2}</div>
                    )
                }
            }.bind(this))

        )
    }


    onclicklisttitle() {
        console.log('执行了修改state函数')
        this.setState(function (prestate) {
            const copy = JSON.parse(JSON.stringify(prestate.inf));
            const newstate = copy.map(function (item, index, arr) {
                 item.number1 = item.number1 +"1";
                 return item;
            })
            console.log(newstate);
            return {inf: newstate};
        })
    }

    render() {
        console.log(this.state);
        return (
            this.creatAccordion_Comtainer(this.state.inf)
        );
    }


}

