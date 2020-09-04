import React,{useContext} from 'react';
import {Corporation_Context} from "../Context/Corporation_Context";

const Myco3 = () => {
    const context  = useContext(Corporation_Context)
    return (
        <div>
            {context}
        </div>
    );
};

export default Myco3;
