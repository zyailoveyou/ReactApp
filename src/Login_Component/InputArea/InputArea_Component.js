import React from "react";
import '../CSS/Input.scss'


export default class InputArea_Component extends React.Component{

    constructor(props) {
        super(props);
        this.Name = this.props.Name;
        this.InputAreaType = this.props.Type;
        this.SetData = this.props.SetData;
        this.id = this.props.id;

    }

    render() {
        let SetType = this.InputAreaType;
        return (
            <div className='InputWrapper'>
                <div className='InputCombine'>
                <input
                    className='Input'
                    type={SetType}
                    // type = 'text'
                    // type = 'password'
                    placeholder={this.Name}
                    onChange={(event)=>(this.SetData(event.target.value))}
                    id = {this.id}/>
                <label className='InputLabel'
                       htmlFor={this.id}>{this.Name}</label>
                </div>
            </div>
        );
    }


}

// InputArea_Component.prototypes ={
//     Type:PropTypes.element.isRequired,
//     SetData:PropTypes.element.isRequired,
// }
