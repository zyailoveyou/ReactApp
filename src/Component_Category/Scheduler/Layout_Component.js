import {
    AllDayPanel,
    AppointmentForm,
    Appointments,
    AppointmentTooltip,
    DateNavigator,
    DayView,
    MonthView,
    Scheduler,
    TodayButton,
    Toolbar,
    ViewSwitcher,
    Resources,
    WeekView,
} from '@devexpress/dx-react-scheduler-material-ui';
import Input_Selector_Component from "../Input/Input_Selector_Component";
import React from "react";
import theme from "../../MyTheme/Theme";
import Box from "@material-ui/core/Box";



const Layout_Component = ({children, style, ...restProps}) => (
    <AppointmentForm.Layout
        {...restProps}
        style={{
            ...style,
            overflowY:"hidden"

        }}
    >
        {children}
    </AppointmentForm.Layout>
);

export default Layout_Component