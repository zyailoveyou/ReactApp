import {useState} from "react";

const [confirmState,setConfirmState] = useState(-1);

const checkConfirm = (value)=>{
    if (value ===''){
        setConfirmState(1)
    }
    else {
        setConfirmState(0)
    }
}