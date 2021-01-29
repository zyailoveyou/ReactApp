import {DateNavigator} from "@devexpress/dx-react-scheduler-material-ui";
import React from "react";

const NavigationButton_Component = ({children, style, ...restProps}) => (
    <DateNavigator.NavigationButton
        {...restProps}
        color='secondary'
        style={{
            ...style,
            outline: "none",

        }}
    >
    </DateNavigator.NavigationButton>
);

export default NavigationButton_Component