import React,{useContext} from 'react';
import {Corporation_Context} from "../Context/Corporation_Context";

const Myco2 = (props) => {
    const context  = useContext(Corporation_Context)
    return (
        <div>
            {context}
        </div>
    );
};

export default Myco2;
