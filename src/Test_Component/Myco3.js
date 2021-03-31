import React, {useState, useCallback} from "react";
import Sticky from 'react-stickynode';

const MomentLocalizationExample = (props) => {
    const handleStateChange = (status) =>{
        console.log(status.status)
    }

    return (


        <div style={{
            background: "red",
            height: 300,
            overflow: "auto"
        }}>

        </div>


    );
}

export default MomentLocalizationExample;