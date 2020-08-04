import React from "react";
import Accordion_Item from "./Accordion_Item";
import '../CSS/AccordionCSS.scss'
import Arrow from "../icon_group/arrow.png";



export default class Accordion_Comtainer extends React.Component {

    constructor(props) {
        super(props);
        //绑定函数
        this.creatAccordion_Comtainer = this.creatAccordion_Comtainer.bind(this);
        this.onclicklisttitle = this.onclicklisttitle.bind(this);
        this.creatTitle_Containner = this.creatTitle_Containner.bind(this);
        //设为state
        this.state = {inf: props.menu}

    }

    onclicklisttitle(id, clickable) {
        console.log('执行了修改state函数')
        if (!clickable) {
            return
        }
        this.setState(function (prestate) {
            const copy = JSON.parse(JSON.stringify(prestate.inf));
            const newstate = copy.map(function (item, index, arr) {
                if (item.type === 'list') {
                    if (index === id) {
                        item.onopen = !item.onopen
                    } else {
                        item.onopen = false;
                    }
                }
                return item;
            })
            console.log(newstate);
            return {inf: newstate};
        })
    }

    creatTitle_Containner(item) {
        const classname = item.classname;
        const id = item.id;
        const clickable = item.clickable;
        const title = item.title;
        if (item.icon!== null) {
            if (item.classname !== 'main_menu')
            {
                return (
                    <div
                        className={classname + ' title'}
                        onClick={() => this.onclicklisttitle(id, clickable)}
                    >
                        <div  className={classname + ' holder'}>
                            <img className={classname + ' icon'} src={item.icon} alt=""/>
                            <p>{title}</p>
                        </div>
                        <img className={classname + ' arrow'} src={Arrow} alt=""/>
                    </div>
                )
            }else {
                return (
                    <div
                        className={classname + ' title'}
                        onClick={() => this.onclicklisttitle(id, clickable)}
                    >
                        <div  className={classname + ' holder'}>
                            <img className={classname + ' icon'} src={item.icon} alt=""/>
                            <p>{title}</p>
                        </div>
                    </div>
                )
            }


        } else {

            return (

                <div
                    className={classname + ' title'}
                    onClick={() => this.onclicklisttitle(id, clickable)}
                >
                    <p>{title}</p>
                </div>
            )
        }


    }

    creatAccordion_Comtainer(Nodeinf) {
        console.log(Nodeinf);
        return (
            Nodeinf.map(function (item, index, arr) {
                //初始化基本数据
                const title = item.title;
                const padding = item.padding;
                const level = item.level;
                const clickable = item.clickable;
                const onopen = item.onopen;
                const id = item.id;
                const classname = item.classname;

                if (item.type === 'list') {
                    return (
                        <div
                            className={classname + ' menu' + (onopen ? ' open' : '')}
                        >
                            {
                                this.creatTitle_Containner(item)
                            }
                            <div className={classname + ' listgroup'}>
                                <Accordion_Comtainer
                                    menu={item.list}
                                />
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <Accordion_Item
                            title={title}
                            onopen={onopen}
                            id={id}
                            padding={padding}
                            level={level}
                        />
                    )
                }
            }.bind(this))
        )
    }


    render() {
        return (
            this.creatAccordion_Comtainer(this.state.inf)
        )
    }
}
