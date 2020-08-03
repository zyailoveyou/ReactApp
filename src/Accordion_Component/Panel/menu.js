
import Download from "../icon_group/download.png";
import Edit from "../icon_group/edit.png";
import Information from "../icon_group/information.png";


export const menu =
    [
        {
            title: '主菜单',
            classname: 'main_menu',
            type: 'list',
            onopen: true,
            level: 'main_menu',
            clickable: false,
            id: 0,
            icon:null,
            list:
                [
                    {
                        title: '详细信息',
                        classname: 'detail_menu',
                        onopen: false,
                        type: 'list',
                        level: 'detail_menu',
                        clickable: true,
                        id: 0,
                        icon:Download,
                        list: [
                            {
                                title: '公司信息',
                                classname: 'cop_inf',
                                type: 'item',
                                level: 'corporation_inf',
                                clickable: true,
                                id: 0,
                            },
                            {
                                title: '员工信息',
                                classname: 'worker_inf',
                                type: 'item',
                                level: 'employee_inf',
                                clickable: true,
                                id: 1,
                            },
                        ]
                    },
                    {
                        title: '统计报表',
                        classname: 'statistics_menu',
                        type: 'list',
                        level: 'statistics_menu',
                        clickable: true,
                        id: 1,
                        icon:Edit,
                        list:[
                            {
                                title: '报表1',
                                classname: 'fuc1_inf',
                                type: 'item',
                                level: 'option1_inf',
                                clickable: true,
                                id: 0,
                            },
                            {
                                title: '报表2',
                                classname: 'fuc2_inf',
                                type: 'item',
                                level: 'option2_inf',
                                clickable: true,
                                id: 1,
                            },
                            {
                                title: '报表3',
                                classname: 'fuc3_inf',
                                type: 'item',
                                level: 'option3_inf',
                                clickable: true,
                                id: 2,
                            },

                        ]
                    },

                    {
                        title: '功能集合',
                        onopen: false,
                        classname: 'function_menu',
                        type: 'list',
                        level: 'option_menu',
                        clickable: true,
                        id: 2,
                        icon:Information,
                        list: [
                            {
                                title: '功能1',
                                classname: 'fuc1_inf',
                                type: 'item',
                                level: 'option1_inf',
                                clickable: true,
                                id: 0,
                            },
                            {
                                title: '功能2',
                                classname: 'fuc2_inf',
                                type: 'item',
                                level: 'option2_inf',
                                clickable: true,
                                id: 1,
                            },
                            {
                                title: '功能3',
                                classname: 'fuc3_inf',
                                type: 'item',
                                level: 'option3_inf',
                                clickable: true,
                                id: 2,
                            },
                        ]
                    }
                ]
        }
    ]

