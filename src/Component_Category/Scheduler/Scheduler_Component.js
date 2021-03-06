import React, {memo, useContext, useState, createContext, useEffect} from 'react';
import {ViewState, EditingState, IntegratedEditing} from '@devexpress/dx-react-scheduler';
import Box from "@material-ui/core/Box";
import {Button} from "@material-ui/core";
import Scheduler_Context from "../../Context/Context_Info/Scheduler_Context";
import User_Context from "../../Context/Context_Info/User_Context";
import CloudBase_Context from "../../Context/Context_Info/CloudBase_Context";
import LinearProgress from "@material-ui/core/LinearProgress";
import cloneDeep from 'lodash/cloneDeep';
import Dialog_Load from "../Dialog/Dialog_Load";
import 'moment/locale/zh-cn'
import {v4 as uuidv4} from 'uuid';
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
import TodayButton_Component from "./TodayButton_Component";
import NavigationButton_Component from "./NavigationButton_Component";
import OpenButton_Component from "./OpenButton_Component";
import Switcher_Component from "./Switcher_Component";
import Content from "./Content_Component";
import BasicLayout from "./BasicLayout_Component";
import Layout_Component from "./Layout_Component";
import Appointment from "./Appointment_Component";

import {
    resourcesData,
    Vacation_Type,
    schedulerData,
    NotCheck_Type,
    ExtraWork_Type,
    Relative_Sheet
} from "./Test_Data/Data";
import theme from "../../MyTheme/Theme";
import Paper from "@material-ui/core/Paper";


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


const test = [
    {
        text: '未打卡',
        id: 1,
        color: theme.palette.secondary.light
    }, {
        text: '请假',
        id: 2,
        color: theme.palette.primary.main,
    }, {
        text: '加班',
        id: 3,
        color: theme.palette.secondary.main,
    }
];

const schedulerHeaderHeight = 28;
const schedulerHeight = 650;

const MonthTableCell = props => {
    return (
        <MonthView.TimeTableCell
            {...props}
            style={{ height: (schedulerHeight-schedulerHeaderHeight)/6 }}
        />
    );
};

const WeekTableCell = props => {
    return (
        <WeekView.TimeTableCell
            {...props}
            style={{ height: (schedulerHeight-schedulerHeaderHeight)/11 }}
        />
    );
};

const DayTableCell = props => {
    return (
        <DayView.TimeTableCell
            {...props}
            style={{ height: (schedulerHeight-schedulerHeaderHeight)/11 }}
        />
    );
};


const Scheduler_Component = (props) => {
    const [data, setData] = useState({
        dateGroup: schedulerData,
        deleteGroup: [],
        currentDate: new Date(),
        resources: [
            {
                fieldName: 'type',
                title: '类型',
                instances: resourcesData,
            },
            {
                fieldName: 'subtype',
                title: '未打卡',
                instances: NotCheck_Type,
                allowMultiple: false,
            }
        ],
    })

    const [loading, setLoading] = useState(false)
    const [sending, setSending] = useState(false)
    const {userData, setUserData} = useContext(User_Context)
    const CloudBase = useContext(CloudBase_Context)

    useEffect(() => {
        updateData(data.currentDate)
    }, [])

    const updateData = (Passed_Date) => {
        setLoading(true)
        const _ = CloudBase.db.command;
        let upperTemp = new Date(Passed_Date)
        let lowerTemp = new Date(Passed_Date)
        upperTemp.setMonth((upperTemp.getMonth() - 1))
        lowerTemp.setMonth((lowerTemp.getMonth()) + 1)
        upperTemp.setDate(29)
        lowerTemp.setDate(1)
        CloudBase.db.collection("Appointments").where({
            startDateStamp: _.gte(upperTemp.getTime()).and(_.lte(lowerTemp.getTime())),
            Uid: _.eq(userData.Uid)
        }).limit(1000).get().then((res) => {
            console.log(res.data)
            setLoading(false)
            setData((preData) => {
                return (
                    {...preData, dateGroup: res.data}
                )
            })
        });
    }

    const commitChanges = ({added, changed, deleted}) => {
        setData((preState) => {
            // let copy_data = cloneDeep(preState.dateGroup);
            let copy_data = cloneDeep(preState);
            if (added) {
                console.log(added)
                const startingAddedId = uuidv4();
                copy_data.dateGroup =
                    [...copy_data.dateGroup,
                        {
                            id: startingAddedId,
                            department: userData.Department,
                            startDateStamp: added.startDate.getTime(),
                            endDateStamp: added.endDate.getTime(),
                            Uid:userData.Uid,
                            handlerId:null,
                            handledTime:null,
                            approved: false,
                            handled:false,
                            type: resourcesData[0],
                            subtype: Relative_Sheet[0].RelativeType[0],
                            ...added,
                        }
                    ];
                console.log(copy_data)
            }
            if (changed) {
                console.log(changed)
                copy_data.dateGroup = copy_data.dateGroup.map(appointment => {
                    console.log(appointment.id)
                    return (
                        changed[appointment.id] ? {...appointment, ...changed[appointment.id]} : appointment
                    )
                })
            }
            if (deleted !== undefined) {
                console.log(deleted)
                copy_data.dateGroup = copy_data.dateGroup.filter(appointment => appointment.id !== deleted);
                copy_data.deleteGroup.push(deleted)
                console.log(copy_data)
            }
            console.log(copy_data)
            return copy_data
        });
    }


    return (

        <Paper elevation={3}
               style={{
                   pointerEvents: loading ? 'none' : "auto",
                   height:{schedulerHeight}
               }}
        >
            <Scheduler_Context.Provider value={{data, setData, loading, setLoading, sending, setSending}}>
                    <Scheduler
                        data={data.dateGroup}
                        locale={'zh-CN'}
                    >
                        <ViewState
                            currentDate={data.currentDate}
                            onCurrentDateChange={(currentDate) => {
                                setData((preData) => {
                                    return (
                                        {...preData, currentDate: currentDate}
                                    )
                                })
                                updateData(currentDate)
                            }}
                            onCurrentViewNameChange={(viewName) => {
                                console.log(viewName)
                            }}
                        />
                        <EditingState
                            onCommitChanges={commitChanges}
                        />
                        <IntegratedEditing/>
                        <MonthView
                            name="mouth"
                            displayName="整月显示"
                            startDayHour={9}
                            endDayHour={14}
                            intervalCount={1}
                            timeTableCellComponent={MonthTableCell}
                        />
                        <WeekView
                            name="week"
                            displayName="整周显示"
                            startDayHour={9}
                            endDayHour={14}
                            style={{
                                height:1000
                            }}
                            timeTableCellComponent={WeekTableCell}
                        />
                        <DayView
                            name="day"
                            displayName="单日显示"
                            startDayHour={9}
                            endDayHour={14}
                            timeTableCellComponent={DayTableCell}
                        />
                        <Toolbar
                            rootComponent={ToolbarWithLoading}
                        />
                        <TodayButton
                            buttonComponent={TodayButton_Component}
                            messages={Today_Button_Local}
                        />
                        <DateNavigator
                            navigationButtonComponent={NavigationButton_Component}
                            openButtonComponent={OpenButton_Component}
                        />
                        <ViewSwitcher
                            switcherComponent={Switcher_Component}
                        />
                        <Appointments
                            appointmentComponent={Appointment}
                        />
                        <AppointmentTooltip
                            contentComponent={Content}
                            showOpenButton
                            showDeleteButton
                        />
                        <AppointmentForm
                            messages={Appointment_Form_Local}
                            layoutComponent={Layout_Component}
                            basicLayoutComponent={BasicLayout}
                        />
                        <AllDayPanel/>
                    </Scheduler>
            </Scheduler_Context.Provider>
        </Paper>

    );
};


const ToolbarWithLoading = ({style, children, ...restProps}) => {
    const Scheduler_Data = useContext(Scheduler_Context);
    const {userData, setUserData} = useContext(User_Context)
    const CloudBase = useContext(CloudBase_Context)
    const {data, loading, sending, setSending} = Scheduler_Data
    const onSave = () => {
        setSending(true)
        console.log(data.dateGroup)
        if (userData.Name != '') {
            CloudBase.app
                .callFunction({
                    name: "setAppointments",
                    data: {
                        dateGroup: data.dateGroup,
                        deleteGroup: data.deleteGroup,
                    }
                })
                .then((res) => {
                    const result = res.result; //云函数执行结果
                    console.log(result)
                    setSending(false)
                });
        }
    }
    return (
        <Box>
            <Toolbar.Root {...restProps}
                          style={{
                              ...style,
                              alignItems: "center",
                          }}>
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
                <Dialog_Load load={sending}/>
            </Toolbar.Root>
            {
                loading ? <LinearProgress/> : null
            }
        </Box>
    );
}


export default memo(Scheduler_Component);
