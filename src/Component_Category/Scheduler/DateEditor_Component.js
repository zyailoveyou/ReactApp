import {AppointmentForm} from "@devexpress/dx-react-scheduler-material-ui";
import React from "react";


const DateEditor_Component = (props) => {

    return (
        (
            <AppointmentForm.DateEditor
                {...props}
                locale={'zh'}
            >
                <div>123123123</div>
            </AppointmentForm.DateEditor>
        )
    )
}

export default DateEditor_Component