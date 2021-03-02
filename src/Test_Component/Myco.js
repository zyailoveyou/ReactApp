import * as React from 'react';
import Paper from '@material-ui/core/Paper';



export default (props) => {
    const {func} = props
    const progress = ()=>{
        func(5)
    }
    const b = 5
    return (
        <div onClick={progress}>
            123123
        </div>

    );
};