import React from "react";
import {Route, withRouter} from 'react-router-dom';
import theme from "../../../MyTheme/Theme";



//icons

import ApartmentIcon from '@material-ui/icons/Apartment';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import DvrIcon from '@material-ui/icons/Dvr';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LaptopIcon from '@material-ui/icons/Laptop';
import PaletteIcon from '@material-ui/icons/Palette';
import SecurityIcon from '@material-ui/icons/Security';
import PhotoIcon from '@material-ui/icons/Photo';


const menu =

    [
        {
            Title: '这是菜单表',
            Indicator: 'Main_Menu',
            Node_Type: 'list',
            Is_Top:true,
            Id: 0,
            On_Open: true,
            Upper_List_Indicator: null,
            List:
                [
                    {
                        Title: '公司管理',
                        Indicator: 'Corp_Manage',
                        On_Open: true,
                        Node_Type: 'list',
                        Clickable: true,
                        Id: 0,
                        Icon: <ApartmentIcon/>,
                        Upper_List_Indicator: 'Main_Menu',
                        List: [
                            {
                                Title: '公司信息',
                                Indicator: 'Corp_Information',
                                Node_Type: 'list',
                                On_Open: false,
                                Clickable: true,
                                Icon: <DvrIcon/>,
                                Id: 0,
                                Upper_List_Indicator: 'Corp_Manage',
                                List: [
                                    {
                                        Title: '三级1',
                                        Indicator: 'three1',
                                        Selected:false,
                                        Node_Type: 'item',
                                        Clickable: true,
                                        Icon: <HomeWorkIcon/>,
                                        Id: 0,
                                        Upper_List_Indicator: 'Corp_Information'
                                    },
                                    {
                                        Title: '三级2',
                                        Indicator: 'three2',
                                        Selected:false,
                                        Node_Type: 'item',
                                        Clickable: true,
                                        Icon: <HomeWorkIcon/>,
                                        Id: 0,
                                        Upper_List_Indicator: 'Corp_Information'
                                    },
                                ]
                            },
                            {
                                Title: '员工名单',
                                Indicator: 'Corp_Worker',
                                Node_Type: 'list',
                                On_Open: true,
                                Clickable: true,
                                Icon: <PeopleAltIcon/>,
                                Id: 1,
                                Upper_List_Indicator: 'Corp_Manage',
                                List: [
                                    {
                                        Title: '三级3',
                                        Indicator: 'three3',
                                        Selected:false,
                                        Node_Type: 'item',
                                        Clickable: true,
                                        Icon: <HomeWorkIcon/>,
                                        Id: 0,
                                        Upper_List_Indicator: 'Corp_Worker'
                                    },
                                    {
                                        Title: '三级4',
                                        Indicator: 'three4',
                                        Selected:false,
                                        Node_Type: 'list',
                                        On_Open: true,
                                        Clickable: true,
                                        Icon: <HomeWorkIcon/>,
                                        Id: 0,
                                        Upper_List_Indicator: 'Corp_Worker',
                                        List: [
                                            {
                                                Title: '四级1',
                                                Indicator: 'four1',
                                                Selected:false,
                                                Node_Type: 'item',
                                                Clickable: true,
                                                Icon: <HomeWorkIcon/>,
                                                Id: 0,
                                                Upper_List_Indicator: 'three4'
                                            }]
                                    },
                                ]

                            },
                            {
                                Title: '部门层级',
                                Indicator: 'Corp_Department',
                                Selected:false,
                                Node_Type: 'item',
                                Clickable: true,
                                Icon: <GroupWorkIcon/>,
                                Id: 2,
                                Upper_List_Indicator: 'Corp_Manage',
                            },
                            {
                                Title: '账号维护',
                                Indicator: 'Corp_Maintain',
                                Selected:false,
                                Node_Type: 'item',
                                Clickable: true,
                                Icon: <PermContactCalendarIcon/>,
                                Id: 3,
                                Upper_List_Indicator: 'Corp_Manage',
                            },
                        ]
                    },
                    {
                        Title: '统计报表',
                        Indicator: 'Statis_Form',
                        Node_Type: 'list',
                        On_Open: true,
                        Clickable: true,
                        Icon: <FormatListNumberedIcon/>,
                        Id: 1,
                        Upper_List_Indicator: 'Main_Menu',
                        List: [
                            {
                                Title: '报表1',
                                Indicator: 'Form_1',
                                Selected:false,
                                Node_Type: 'item',
                                Clickable: true,
                                Icon: <ListAltIcon/>,
                                Id: 0,
                                Upper_List_Indicator: 'Statis_Form',
                            },
                            {
                                Title: '报表2',
                                Indicator: 'Form_2',
                                Selected:false,
                                Node_Type: 'item',
                                Clickable: true,
                                Icon: <ListAltIcon/>,
                                Id: 1,
                                Upper_List_Indicator: 'Statis_Form',
                            },
                            {
                                Title: '报表3',
                                Indicator: 'Form_3',
                                Selected:false,
                                Node_Type: 'item',
                                Clickable: true,
                                Icon: <ListAltIcon/>,
                                Id: 2,
                                Upper_List_Indicator: 'Statis_Form',
                            },

                        ]
                    },

                    {
                        Title: '功能管理',
                        On_Open: true,
                        Indicator: 'Function_Manager',
                        Node_Type: 'list',
                        Clickable: true,
                        Id: 2,
                        Icon: <LaptopIcon/>,
                        Upper_List_Indicator: 'Main_Menu',
                        List: [
                            {
                                Title: '功能1',
                                Indicator: 'Function_1',
                                Selected:false,
                                Node_Type: 'item',
                                Clickable: true,
                                Icon: <PaletteIcon/>,
                                Id: 0,
                                Upper_List_Indicator: 'Function_Manager',
                            },
                            {
                                Title: '功能2',
                                Indicator: 'Function_2',
                                Selected:false,
                                Node_Type: 'item',
                                Clickable: true,
                                Icon: <SecurityIcon/>,
                                Id: 1,
                                Upper_List_Indicator: 'Function_Manager',
                            },
                            {
                                Title: '功能3',
                                Indicator: 'Function_3',
                                Selected:false,
                                Node_Type: 'item',
                                Clickable: true,
                                Icon: <PhotoIcon/>,
                                Id: 2,
                                Upper_List_Indicator: 'Function_Manager',
                            },
                        ]
                    }
                ]
        }
    ]


export default menu;

// export default withRouter(menu);



