import {TodayButton} from "@devexpress/dx-react-scheduler-material-ui";
import React from "react";

const TodayButton_Component = (props) => {
    return (
        (
            <TodayButton.Button
                {...props}
                variant={'contained'}
                color={'secondary'}
                style={{
                    outline: 'none'
                }}
            >

            </TodayButton.Button>
        )
    )
}

export default TodayButton_Component