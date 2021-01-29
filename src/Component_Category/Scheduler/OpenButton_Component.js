import {DateNavigator} from "@devexpress/dx-react-scheduler-material-ui";
import React from "react";

const OpenButton_Component = ({children, style, ...restProps}) => (
    <DateNavigator.OpenButton
        {...restProps}
        color='secondary'
        variant={'text'}
        style={{
            ...style,
            outline: "none",
        }}
    >

    </DateNavigator.OpenButton>
);

export default OpenButton_Component