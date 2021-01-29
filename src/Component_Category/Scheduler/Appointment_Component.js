import {Appointments} from "@devexpress/dx-react-scheduler-material-ui";
import theme from "../../MyTheme/Theme";
import Box from "@material-ui/core/Box";
import React from "react";

const Appointment_Component = ({children, style, ...restProps}) => (
    <Appointments.Appointment
        {...restProps}
        style={{
            ...style,
            backgroundColor: theme.palette.primary.main,
            borderRadius: '8px',
        }}
    >
        <Box>
            {children}
        </Box>
    </Appointments.Appointment>
);

export default Appointment_Component
