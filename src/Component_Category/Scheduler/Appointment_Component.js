import {Appointments} from "@devexpress/dx-react-scheduler-material-ui";
import theme from "../../MyTheme/Theme";
import Box from "@material-ui/core/Box";
import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import {getAppointmentColor, getResourceColor} from "./Based_On/utils";

const useStyles = makeStyles(({palette, typography, spacing}) => ({
    appointment: {
        userSelect: 'none',
        position: 'absolute',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        boxSizing: 'border-box',
        border: `1px solid ${palette.background.paper}`,
        backgroundClip: 'padding-box',
        borderRadius: spacing(0.5),
        backgroundColor: resources => getAppointmentColor(
            300, getResourceColor(resources), palette.primary,
        ),
        ...typography.caption,
        '&:hover': {
            backgroundColor: resources => getAppointmentColor(
                400, getResourceColor(resources), palette.primary,
            ),
        },
        '&:focus': {
            backgroundColor: resources => getAppointmentColor(
                100, getResourceColor(resources), palette.primary,
            ),
            outline: 0,
        },
    },
    clickableAppointment: {
        cursor: 'pointer',
    },
    shadedAppointment: {
        backgroundColor: resources => getAppointmentColor(
            200, getResourceColor(resources), palette.primary,
        ),
        '&:hover': {
            backgroundColor: resources => getAppointmentColor(
                300, getResourceColor(resources), palette.primary,
            ),
        },
    },
}));

const Appointment = ({
                         className,
                         children,
                         style,
                         data,
                         onClick: handleClick,
                         draggable,
                         isShaded,
                         resources,
                         ...restProps
                     }) => {
    const onClick = handleClick
        ? {
            onClick: ({target}) => {
                handleClick({target, data});
            },
        }
        : null;
    const classes = useStyles(resources);
    const clickable = onClick || restProps.onDoubleClick || draggable;
    return (
        <div
            className={classNames({
                [classes.appointment]: true,
                [classes.clickableAppointment]: clickable,
                [classes.shadedAppointment]: isShaded,
            }, className)}
            {...onClick}
            {...restProps}
            style={{
                ...style,
                backgroundColor: data.type.color,
                borderRadius: '8px',
            }}
        >
            {/*<div>this is details</div>*/}
            {children}
        </div>
    );
};

Appointment.propTypes = {
    children: PropTypes.node.isRequired,
    resources: PropTypes.array,
    className: PropTypes.string,
    data: PropTypes.object,
    onClick: PropTypes.func,
    draggable: PropTypes.bool,
    isShaded: PropTypes.bool,
};

Appointment.defaultProps = {
    resources: [],
    onClick: undefined,
    className: undefined,
    data: {},
    draggable: false,
    isShaded: false,
};

export default Appointment

