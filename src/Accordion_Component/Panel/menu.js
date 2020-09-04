import React from "react";
import Download from "../icon_group/download.png";
import Edit from "../icon_group/edit.png";
import Information from "../icon_group/information.png";
import Menu from '../icon_group/main.png'
import {Route, withRouter} from 'react-router-dom';

const menu2 =
    {
        Title: '这是菜单表',
        Indicator: 'Main_Menu',
        Node_Type: 'list',
        Id:0,
        On_Open: true,
        Upper_List_Indicator:null,
        List:
            [
                {
                    Title: '公司管理',
                    Indicator: 'Corp_Manage',
                    On_Open: true,
                    Node_Type: 'list',
                    Clickable: true,
                    Id: 0,
                    Icon: Download,
                    Upper_List_Indicator:'Main_Menu',
                    List: [
                        {
                            Title: '公司信息',
                            Indicator: 'Corp_Information',
                            Node_Type: 'list',
                            On_Open: true,
                            Clickable: true,
                            Icon: Download,
                            Id: 0,
                            Upper_List_Indicator:'Corp_Manage',
                            List: [
                                {
                                    Title: '三级1',
                                    Indicator: 'three1',
                                    Node_Type: 'item',
                                    Clickable: true,
                                    Icon: Download,
                                    Id: 0,
                                },
                                {
                                    Title: '三级2',
                                    Indicator: 'three2',
                                    Node_Type: 'item',
                                    Clickable: true,
                                    Icon: Download,
                                    Id: 0,
                                },
                            ]
                        },
                        {
                            Title: '员工名单',
                            Indicator: 'Corp_Worker',
                            Node_Type: 'list',
                            On_Open: true,
                            Clickable: true,
                            Icon: Download,
                            Id: 1,
                            Upper_List_Indicator:'Corp_Manage',
                            List: [
                                {
                                    Title: '三级3',
                                    Indicator: 'three3',
                                    Node_Type: 'item',
                                    Clickable: true,
                                    Icon: Download,
                                    Id: 0,
                                },
                                {
                                    Title: '三级4',
                                    Indicator: 'three4',
                                    Node_Type: 'item',
                                    Clickable: true,
                                    Icon: Download,
                                    Id: 0,
                                },
                            ]

                        },
                        {
                            Title: '部门层级',
                            Indicator: 'Corp_Department',
                            Node_Type: 'item',
                            Clickable: true,
                            Icon: Download,
                            Id: 2,
                            Upper_List_Indicator:'Corp_Manage',
                        },
                        {
                            Title: '账号维护',
                            Indicator: 'Corp_Maintain',
                            Node_Type: 'item',
                            Clickable: true,
                            Icon: Download,
                            Id: 3,
                            Upper_List_Indicator:'Corp_Manage',
                        },
                    ]
                },
                {
                    Title: '统计报表',
                    Indicator: 'Statis_Form',
                    Node_Type: 'list',
                    On_Open: true,
                    Clickable: true,
                    Icon: Download,
                    Id: 1,
                    Upper_List_Indicator:'Main_Menu',
                    List: [
                        {
                            Title: '报表1',
                            Indicator: 'Form_1',
                            Node_Type: 'item',
                            Clickable: true,
                            Icon: Download,
                            Id: 0,
                            Upper_List_Indicator:'Statis_Form',
                        },
                        {
                            Title: '报表2',
                            Indicator: 'Form_2',
                            Node_Type: 'item',
                            Clickable: true,
                            Icon: Download,
                            Id: 1,
                            Upper_List_Indicator:'Statis_Form',
                        },
                        {
                            Title: '报表3',
                            Indicator: 'Form_3',
                            Node_Type: 'item',
                            Clickable: true,
                            Icon: Download,
                            Id: 2,
                            Upper_List_Indicator:'Statis_Form',
                        },

                    ]
                },

                {
                    Title: '功能管理',
                    On_Open: false,
                    Indicator: 'Function_Manager',
                    Node_Type: 'list',
                    Clickable: true,
                    Id: 2,
                    icon: Information,
                    Upper_List_Indicator:'Main_Menu',
                    List: [
                        {
                            Title: '功能1',
                            Indicator: 'Function_1',
                            Node_Type: 'item',
                            Clickable: true,
                            Icon: Download,
                            Id: 0,
                            Upper_List_Indicator:'Function_Manager',
                        },
                        {
                            Title: '功能2',
                            Indicator: 'Function_2',
                            Node_Type: 'item',
                            Clickable: true,
                            Icon: Download,
                            Id: 1,
                            Upper_List_Indicator:'Function_Manager',
                        },
                        {
                            Title: '功能3',
                            Indicator: 'Function_3',
                            Node_Type: 'item',
                            Clickable: true,
                            Icon: Download,
                            Id: 2,
                            Upper_List_Indicator:'Function_Manager',
                        },
                    ]
                }
            ]
    }


export default menu2;

// export default withRouter(menu);



