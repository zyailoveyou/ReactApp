import React, {memo, useState} from 'react';
import Box from "@material-ui/core/Box";
import theme from "../../MyTheme/Theme";
import {ViewState,EditingState} from '@devexpress/dx-react-scheduler';
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import {zhCN} from '@material-ui/core/locale'
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
    WeekView,

} from '@devexpress/dx-react-scheduler-material-ui';



const schedulerData = [
    {
        title: 'Website Re-Design Plan',
        startDate: new Date(2018, 5, 25, 9, 35),
        endDate: new Date(2018, 5, 25, 11, 30),
        id: 0,
        location: 'Room 1',
    }, {
        title: 'Book Flights to San Fran for Sales Trip',
        startDate: new Date(2018, 5, 25, 12, 11),
        endDate: new Date(2018, 5, 25, 13, 0),
        id: 1,
        location: 'Room 1',
    }, {
        title: 'Install New Router in Dev Room',
        startDate: new Date(2018, 5, 25, 14, 30),
        endDate: new Date(2018, 5, 25, 15, 35),
        id: 2,
        location: 'Room 2',
    }, {
        title: 'Approve Personal Computer Upgrade Plan',
        startDate: new Date(2018, 5, 26, 10, 0),
        endDate: new Date(2018, 5, 26, 11, 0),
        id: 3,
        location: 'Room 2',
    }, {
        title: 'Final Budget Review',
        startDate: new Date(2018, 5, 26, 12, 0),
        endDate: new Date(2018, 5, 26, 13, 35),
        id: 4,
        location: 'Room 2',
    }, {
        title: 'New Brochures',
        startDate: new Date(2018, 5, 26, 14, 30),
        endDate: new Date(2018, 5, 26, 15, 45),
        id: 5,
        location: 'Room 2',
    }, {
        title: 'Install New Database',
        startDate: new Date(2018, 5, 27, 9, 45),
        endDate: new Date(2018, 5, 27, 11, 15),
        id: 6,
        location: 'Room 1',
    }, {
        title: 'Approve New Online Marketing Strategy',
        startDate: new Date(2018, 5, 27, 12, 0),
        endDate: new Date(2018, 5, 27, 14, 0),
        id: 7,
        location: 'Room 3',
    }, {
        title: 'Upgrade Personal Computers',
        startDate: new Date(2018, 5, 27, 15, 15),
        endDate: new Date(2018, 5, 27, 16, 30),
        id: 8,
        location: 'Room 3',
    }, {
        title: 'Customer Workshop',
        startDate: new Date(2018, 5, 28, 11, 0),
        endDate: new Date(2018, 5, 28, 12, 0),
        id: 9,
        location: 'Room 3',
    }, {
        title: 'Prepare 2015 Marketing Plan',
        startDate: new Date(2018, 5, 28, 11, 0),
        endDate: new Date(2018, 5, 28, 13, 30),
        id: 10,
        location: 'Room 1',
    }, {
        title: 'Brochure Design Review',
        startDate: new Date(2018, 5, 28, 14, 0),
        endDate: new Date(2018, 5, 28, 15, 30),
        id: 11,
        location: 'Room 2',
    }
];

const Appointment_Form_Local = {
    detailsLabel:'标题',
    commitCommand:'保存',
    moreInformationLabel:'详细信息',
}


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


const DateNavigator_root = (props) => {
    console.log(props.navigatorText)
    return (
        <DateNavigator.Root
            {...props}
            style={{
                ...props.style,
                outline: "none",
                color: theme.palette.primary.main
            }}

        >
            <Box>
                {props.children}
            </Box>
        </DateNavigator.Root>
    )
}

const DateNavigator_Button = ({children, style, ...restProps}) => (
    <DateNavigator.NavigationButton
        {...restProps}
        style={{
            ...style,
            outline: "none",
            color: theme.palette.primary.main
        }}
    >
        <Box>
            {children}
        </Box>
    </DateNavigator.NavigationButton>
);





const DateEditor_Component = ({children, locale, ...restProps}) => {
    console.log(locale)
    return (
        (
            <AppointmentForm.DateEditor
                {...restProps}
                locale={'de-DE'}
            >
            </AppointmentForm.DateEditor>
        )
    )
}


const testrsc = (props) => {
    return (
        <AppointmentTooltip.Layout
            {...props}
            recurringIconComponent={testrsc}>
            <VideoLabelIcon/>
        </AppointmentTooltip.Layout>
    );
};


const Scheduler_Component = (props) => {

    console.log(zhCN)
    const [currentViewName, setCurrentViewName] = useState('day View')

    const commitChanges=({ added, changed, deleted })=> {
        this.setState((state) => {
            let { data } = state;
            if (added) {
                const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
                data = [...data, { id: startingAddedId, ...added }];
            }
            if (changed) {
                data = data.map(appointment => (
                    changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
            }
            if (deleted !== undefined) {
                data = data.filter(appointment => appointment.id !== deleted);
            }
            return { data };
        });
    }

    return (

        <Scheduler
            data={schedulerData}
            locale={'zh-CN'}
        >
            <ViewState
                defaultCurrentDate={'2018-06-27'}
                // currentViewName={currentViewName}
                onCurrentViewNameChange={(currentViewName) => {
                    console.log(currentViewName)
                    setCurrentViewName(currentViewName)
                }}
            />
            <EditingState
                onCommitChanges={commitChanges}
            />
            <DayView
                name="day"
                displayName="day View"
                startDayHour={9}
                endDayHour={14}
            />
            <WeekView
                name="week"
                displayName="week View"
                startDayHour={9}
                endDayHour={14}
            />
            <MonthView
                name="mouth"
                displayName="mouth View"
                startDayHour={9}
                endDayHour={14}
            />
            <Toolbar/>
            <TodayButton/>
            <DateNavigator
                rootComponent={DateNavigator_root}
                navigationButtonComponent={DateNavigator_Button}
            />
            <ViewSwitcher/>
            <Appointments
                appointmentComponent={Appointment_Component}
            />
            <AppointmentTooltip
                showOpenButton
                showDeleteButton
                layoutComponent={testrsc}
            />
            <AppointmentForm
                messages={Appointment_Form_Local}
                dateEditorComponent={DateEditor_Component}
                // labelComponent={Label_Component}
            />
            <AllDayPanel/>
        </Scheduler>

    );
};

export default memo(Scheduler_Component);
