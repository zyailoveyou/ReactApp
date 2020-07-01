import React from "react";
import '../CSS/Input.scss'


export default class InputArea_Component extends React.Component{

    constructor(props) {
        super(props);
        this.InputAreaType = props.Type;
        this.SetData = this.props.SetData;

    }

    render() {
        let SetType = this.InputAreaType;
        return (
            <div className='InputWrapper'>
                <input
                    className='Input'
                    type={SetType}
                    placeholder={SetType}
                    onChange={(event)=>(this.SetData(event.target.value))}
                    id = {SetType}/>
                <label className='InputLabel'
                       htmlFor={SetType}>{SetType}</label>
            </div>
        );
    }


}

// InputArea_Component.prototypes ={
//     Type:PropTypes.element.isRequired,
//     SetData:PropTypes.element.isRequired,
// }
