import theme from "../../../MyTheme/Theme";

export const schedulerData = [
    {
        allDay: false,
        title: 'Website Re-Design Plan',
        startDate: new Date(2021, 0, 23, 9, 30),
        endDate: new Date(2021, 0, 23, 11, 30),
        name: '张千唱',
        approved: false,
        department: '办公室',
        id: '2db7a5a2-738d-4da1-ba93-aadb4976c220',
        notes: "456456",
        startDateStamp: new Date(2021, 0, 23, 9, 30).getTime(),
        endDateStamp: new Date(2021, 0, 23, 11, 30).getTime(),
        type: 1,
        subtype: 1,
    },
];


export const resourcesData = [
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


export const Vacation_Type = [
    {
        text: '年休假',
        id: 1,
        color: '#7E57C2',
    }, {
        text: '事假',
        id: 2,
        color: '#FF7043',
    }, {
        text: '换休',
        id: 3,
        color: '#E91E63',
    }, {
        text: '病假',
        id: 4,
        color: '#E91E63',
    }, {
        text: '产假',
        id: 5,
        color: '#AB47BC',
    },
];


export const ExtraWork_Type = [
    {
        text: '节假日加班',
        id: 1,
        color: '#F58E0C',
    }, {
        text: '休息日加班',
        id: 2,
        color: '#FF710D',
    }, {
        text: '超时加班',
        id: 3,
        color: '#E74001',
    },
    {
        text: '计换休',
        id: 4,
        color: '#FF2A0D',
    },
];

export const NotCheck_Type = [
    {
        text: '未打卡',
        id: 1,
        color: '#7E57C2',
    },
];

export const Relative_Sheet = [
    {
        name: '未打卡',
        id:1,
        RelativeType:NotCheck_Type
    },
    {
        name: '请假' ,
        id:2,
        RelativeType:Vacation_Type
    },
    {
        name: '加班',
        id:3,
        RelativeType:ExtraWork_Type
    },

]