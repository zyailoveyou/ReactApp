import React, {memo, useState} from 'react';
import Box from "@material-ui/core/Box";
import theme from "../../MyTheme/Theme";
import {ViewState, EditingState, IntegratedEditing} from '@devexpress/dx-react-scheduler';
import cloneDeep from 'lodash/cloneDeep';
import LinearProgress from '@material-ui/core/LinearProgress';
import {Button} from "@material-ui/core";
import 'moment/locale/zh-cn'

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
        startDate: new Date(2018, 6, 23, 9, 30),
        endDate: new Date(2018, 6, 23, 11, 30),
    }, {
        title: 'Book Flights to San Fran for Sales Trip',
        startDate: new Date(2018, 6, 23, 12, 0),
        endDate: new Date(2018, 6, 23, 13, 0),
    }, {
        title: 'Install New Router in Dev Room',
        startDate: new Date(2018, 6, 23, 14, 30),
        endDate: new Date(2018, 6, 23, 15, 30),
    }, {
        title: 'Approve Personal Computer Upgrade Plan',
        startDate: new Date(2018, 6, 24, 10, 0),
        endDate: new Date(2018, 6, 24, 11, 0),
    },
];

const Appointment_Form_Local = {
    detailsLabel: '标题',
    commitCommand: '保存',
    moreInformationLabel: '详细信息',
    allDayLabel: '全天',
    repeatLabel: '重复',
    repeatEveryLabel: '重复周期',
    daysLabel: '每天'
}

const Today_Button_Local = {
    today: '当前日期'
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


const DateNavigator_navigationButtonComponent = ({children, style, ...restProps}) => (
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


const DateNavigator_openButtonComponent = ({children, style, ...restProps}) => (
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


const DateEditor_Component = (props) => {

    return (
        (
            <AppointmentForm.DateEditor
                {...props}
                locale={'zh'}
            >
            </AppointmentForm.DateEditor>
        )
    )
}


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

const ViewSwitcher_SwitcherComponent = (props) => {
    return (
        (
            <ViewSwitcher.Switcher
                {...props}
                variant="filled"
                color="primary"
                style={{
                    outline: "none",
                }}
            >
            </ViewSwitcher.Switcher>
        )
    )
}


const ToolbarWithLoading = ({children, classes, ...restProps}) => {
    const onSave = ()=>{
        console.log('onSave')
    }
    return (
        <div>
            <Toolbar.Root
                {...restProps}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: 'center'
                }}
            >
                {children}
                <Button
                    variant={"contained"}
                    color={"primary"}
                    size={'medium'}
                    style={{
                        outline: 'none',
                        marginLeft: '1rem'
                    }}
                    onClick={onSave}
                >保存信息</Button>
            </Toolbar.Root>
            <LinearProgress/>
        </div>
    )
}


const Scheduler_Component = (props) => {

    const [data, setData] = useState({
        dateGroup: schedulerData,
        currentDate: '2018-06-20',
    })
    const [loading, setLoading] = useState(true)

    const commitChanges = ({added, changed, deleted}) => {
        setData((preState) => {
            let copy_data = cloneDeep(preState.dateGroup);
            if (added) {
                console.log(copy_data)
                const startingAddedId = copy_data.length > 0 ? copy_data[data.dateGroup.length - 1].id + 1 : 0;
                copy_data = [...copy_data, {id: startingAddedId, ...added}];
            }
            if (changed) {
                console.log(changed)
                copy_data = copy_data.map(appointment => {
                    console.log(appointment)
                    console.log(changed[appointment.id])
                    return (
                        changed[appointment.id] ? {...appointment, ...changed[appointment.id]} : appointment
                    )
                })
            }
            if (deleted !== undefined) {
                copy_data = copy_data.filter(appointment => appointment.id !== deleted);
            }
            console.log(copy_data)
            return {...preState, dateGroup: copy_data}
        });
    }

    return (

        <Scheduler
            data={schedulerData}
            locale={'zh-Cn'}
        >
            <ViewState
                // currentDate={data.currentDate}
                // currentViewName={currentViewName}
                // onCurrentDateChange={(currentDate) => {
                //     console.log(currentDate)
                //     setData((preData) => {
                //         return (
                //             {...preData, currentDate: currentDate}
                //         )
                //     })
                // }}
                // onCurrentViewNameChange={(viewName) => {
                //     console.log(viewName)
                // }}
            />
            <EditingState
                // onCommitChanges={commitChanges}
            />
            <IntegratedEditing/>
            <DayView
                name="day"
                displayName="单日显示"
                startDayHour={9}
                endDayHour={14}
            />
            <WeekView
                name="week"
                displayName="整周显示"
                startDayHour={9}
                endDayHour={14}
            />
            <MonthView
                name="mouth"
                displayName="整月显示"
                startDayHour={9}
                endDayHour={14}
                intervalCount={1}
            />
            <Toolbar
                /*{...loading ? {rootComponent: ToolbarWithLoading} : null}*/
            />
            <TodayButton
                // buttonComponent={TodayButton_Component}
                // messages={Today_Button_Local}
            />
            <DateNavigator
                // navigationButtonComponent={DateNavigator_navigationButtonComponent}
                // openButtonComponent={DateNavigator_openButtonComponent}
            />
            <ViewSwitcher
                // switcherComponent={ViewSwitcher_SwitcherComponent}
            />
            <Appointments
                // appointmentComponent={Appointment_Component}
            />
            <AppointmentTooltip
                // showOpenButton
                // showDeleteButton
            />
            <AppointmentForm
                // messages={Appointment_Form_Local}
                // dateEditorComponent={DateEditor_Component}
            />
            <AllDayPanel/>
        </Scheduler>

    );
};

export default memo(Scheduler_Component);
