import React, { useState, useCallback } from "react";

import Myco from "./Myco";


const  MomentLocalizationExample = (props) => {

    const  message = (text) =>{
        console.log(text)
    }
    return (
        <Myco func={message}></Myco>
    );
}

export default MomentLocalizationExample;