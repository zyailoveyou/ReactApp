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
import ResourceEditor from "./ResourceEditor_Component";
import DateEditor_Component from "./DateEditor_Component";

import {resourcesData,Vacation_Type,schedulerData,NotCheck_Type,ExtraWork_Type} from "./Test_Data/Data";

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




const Scheduler_Component = (props) => {
    const [data, setData] = useState({
        dateGroup: schedulerData,
        deleteGroup:[],
        currentDate: new Date(),
        resources:[
            {
                fieldName: 'type',
                title: '类型',
                instances: resourcesData,
            },
            {
                fieldName: 'subtype',
                title: '请假',
                instances: Vacation_Type,
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
            name:_.eq(userData.Name)
        }).get().then((res) => {
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
                            name: userData.Name,
                            department: userData.Department,
                            startDateStamp: added.startDate.getTime(),
                            endDateStamp: added.endDate.getTime(),
                            approved: false,
                            typetext:function () {
                                console.log(added.type)
                                for (let i = 0;i< resourcesData.length;i++){
                                    console.log(resourcesData[i].id)
                                    console.log(resourcesData[i].text)
                                    if (resourcesData[i].id = added.type){
                                        return resourcesData[i].text
                                    }
                                }
                            }(),
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
            return copy_data
        });
    }


    return (
        <Scheduler_Context.Provider value={{data, setData, loading, setLoading,sending,setSending}}>
            <Box style={{
                pointerEvents:loading?'none':"auto"
            }}>
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
                    />
                    <WeekView
                        name="week"
                        displayName="整周显示"
                        startDayHour={9}
                        endDayHour={14}
                    />
                    <DayView
                        name="day"
                        displayName="单日显示"
                        startDayHour={9}
                        endDayHour={14}
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
                        // appointmentComponent={Appointment_Component}
                    />
                    <AppointmentTooltip
                        showOpenButton
                        showDeleteButton
                    />
                    <AppointmentForm
                        messages={Appointment_Form_Local}
                        dateEditorComponent={DateEditor_Component}
                        resourceEditorComponent={ResourceEditor}
                    />
                    <Resources
                        data={data.resources}
                        mainResourceName="type"
                    />
                    <AllDayPanel/>
                </Scheduler>
            </Box>
        </Scheduler_Context.Provider>
    );
};


const ToolbarWithLoading = (props) => {
    const Scheduler_Data = useContext(Scheduler_Context);
    const {userData, setUserData} = useContext(User_Context)
    const CloudBase = useContext(CloudBase_Context)
    const {data, loading,sending,setSending } = Scheduler_Data
    const onSave = () => {
        setSending(true)
        if (userData.Name != '') {
            CloudBase.app
                .callFunction({
                    name: "setAppointments",
                    data: {
                        dateGroup: data.dateGroup,
                        deleteGroup:data.deleteGroup,
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
            <Toolbar.Root {...props}>
                {props.children}
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
                loading ? <LinearProgress/> :null
            }
        </Box>
    );
}


export default memo(Scheduler_Component);
