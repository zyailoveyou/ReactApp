import React from "react";
import {Route, withRouter} from 'react-router-dom';
import theme from "../../../MyTheme/Theme";



//icons
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
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
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';


const menu =

    [
        {
            Title: '这是菜单表',
            Indicator: 'Main_Menu',
            Node_Type: 'list',
            Is_Top:true,
            Id: 0,
            Last_Choice_Type:null,
            Last_Choice_Indicator:null,
            Upper_List_Indicator: null,
            Level:1,
            List:
                [
                    {
                        Title: '首页',
                        Indicator: 'Home_Page',
                        Selected:false,
                        Node_Type: 'item',
                        Clickable: true,
                        Icon: <HomeIcon/>,
                        Id: 0,
                        Upper_List_Indicator: 'Main_Menu',
                        Level:2,
                    },
                    {
                        Title: '公司管理',
                        Indicator: 'Corp_Manage',
                        On_Open: false,
                        Node_Type: 'list',
                        Clickable: true,
                        Id: 1,
                        Icon: <ApartmentIcon/>,
                        Upper_List_Indicator: 'Main_Menu',
                        ExpandLess:<ExpandLess/>,
                        ExpandMore:<ExpandMore/>,
                        Level:2,
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
                                ExpandLess:<ExpandLess/>,
                                ExpandMore:<ExpandMore/>,
                                Level:3,
                                List: [
                                    {
                                        Title: '三级1',
                                        Indicator: 'three1',
                                        Selected:false,
                                        Node_Type: 'item',
                                        Clickable: true,
                                        Icon: <HomeWorkIcon/>,
                                        Id: 0,
                                        Upper_List_Indicator: 'Corp_Information',
                                        Level:4,
                                    },
                                    {
                                        Title: '三级2',
                                        Indicator: 'three2',
                                        Selected:false,
                                        Node_Type: 'item',
                                        Clickable: true,
                                        Icon: <HomeWorkIcon/>,
                                        Id: 0,
                                        Upper_List_Indicator: 'Corp_Information',
                                        Level:4,
                                    },
                                ]
                            },
                            {
                                Title: '员工名单',
                                Indicator: 'Corp_Worker',
                                Node_Type: 'list',
                                On_Open: false,
                                Clickable: true,
                                Icon: <PeopleAltIcon/>,
                                Id: 1,
                                Upper_List_Indicator: 'Corp_Manage',
                                ExpandLess:<ExpandLess/>,
                                ExpandMore:<ExpandMore/>,
                                Level:3,
                                List: [
                                    {
                                        Title: '三级3',
                                        Indicator: 'three3',
                                        Selected:false,
                                        Node_Type: 'item',
                                        Clickable: true,
                                        Icon: <HomeWorkIcon/>,
                                        Id: 0,
                                        Upper_List_Indicator: 'Corp_Worker',
                                        Level:4,
                                    },
                                    {
                                        Title: '三级4',
                                        Indicator: 'three4',
                                        Selected:false,
                                        Node_Type: 'list',
                                        On_Open: false,
                                        Clickable: true,
                                        Icon: <HomeWorkIcon/>,
                                        Id: 0,
                                        Upper_List_Indicator: 'Corp_Worker',
                                        ExpandLess:<ExpandLess/>,
                                        ExpandMore:<ExpandMore/>,
                                        Level:4,
                                        List: [
                                            {
                                                Title: '四级1',
                                                Indicator: 'four1',
                                                Selected:false,
                                                Node_Type: 'item',
                                                Clickable: true,
                                                Icon: <HomeWorkIcon/>,
                                                Id: 0,
                                                Upper_List_Indicator: 'three4',
                                                Level:5,
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
                                Level:3,
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
                                Level:3,
                            },
                        ]
                    },
                    {
                        Title: '统计报表',
                        Indicator: 'Statis_Form',
                        Node_Type: 'list',
                        On_Open: false,
                        Clickable: true,
                        Icon: <FormatListNumberedIcon/>,
                        Id: 2,
                        Upper_List_Indicator: 'Main_Menu',
                        ExpandLess:<ExpandLess/>,
                        ExpandMore:<ExpandMore/>,
                        Level:2,
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
                                Level:3,
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
                                Level:3,
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
                                Level:3,
                            },

                        ]
                    },

                    {
                        Title: '功能管理',
                        On_Open: false,
                        Indicator: 'Function_Manager',
                        Node_Type: 'list',
                        Clickable: true,
                        Id: 3,
                        Icon: <LaptopIcon/>,
                        Upper_List_Indicator: 'Main_Menu',
                        ExpandLess:<ExpandLess/>,
                        ExpandMore:<ExpandMore/>,
                        Level:2,
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
                                Level:3,
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
                                Level:3,
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
                                Level:3,
                            },
                        ]
                    },

                    {
                        Title: '图表展示',
                        On_Open: false,
                        Indicator: 'Figure_Show',
                        Node_Type: 'list',
                        Clickable: true,
                        Id: 4,
                        Icon: <LaptopIcon/>,
                        Upper_List_Indicator: 'Main_Menu',
                        ExpandLess:<ExpandLess/>,
                        ExpandMore:<ExpandMore/>,
                        Level:2,
                        List: [
                            {
                                Title: '图表1',
                                Indicator: 'Figure_1',
                                Selected:false,
                                Node_Type: 'item',
                                Clickable: true,
                                Icon: <PaletteIcon/>,
                                Id: 0,
                                Upper_List_Indicator: 'Figure_Show',
                                Level:3,
                            },
                            {
                                Title: '图表2',
                                Indicator: 'Figure_2',
                                Selected:false,
                                Node_Type: 'item',
                                Clickable: true,
                                Icon: <SecurityIcon/>,
                                Id: 1,
                                Upper_List_Indicator: 'Figure_Show',
                                Level:3,
                            },
                            {
                                Title: '图表3',
                                Indicator: 'Figure_3',
                                Selected:false,
                                Node_Type: 'item',
                                Clickable: true,
                                Icon: <PhotoIcon/>,
                                Id: 2,
                                Upper_List_Indicator: 'Figure_Show',
                                Level:3,
                            },
                        ]
                    },


                    {
                        Title: '其他功能',
                        On_Open: false,
                        Indicator: 'Other_Option',
                        Node_Type: 'list',
                        Clickable: true,
                        Id: 5,
                        Icon: <LaptopIcon/>,
                        Upper_List_Indicator: 'Main_Menu',
                        ExpandLess:<ExpandLess/>,
                        ExpandMore:<ExpandMore/>,
                        Level:2,
                        List: [
                            {
                                Title: '功能1',
                                Indicator: 'Option_1',
                                Selected:false,
                                Node_Type: 'item',
                                Clickable: true,
                                Icon: <PaletteIcon/>,
                                Id: 0,
                                Upper_List_Indicator: 'Other_Option',
                                Level:3,
                            },
                            {
                                Title: '功能2',
                                Indicator: 'Option_2',
                                Selected:false,
                                Node_Type: 'item',
                                Clickable: true,
                                Icon: <SecurityIcon/>,
                                Id: 1,
                                Upper_List_Indicator: 'Other_Option',
                                Level:3,
                            },
                            {
                                Title: '功能3',
                                Indicator: 'Option_3',
                                Selected:false,
                                Node_Type: 'item',
                                Clickable: true,
                                Icon: <PhotoIcon/>,
                                Id: 2,
                                Upper_List_Indicator: 'Other_Option',
                                Level:3,
                            },
                        ]
                    },

                    {
                        Title: '导览',
                        On_Open: false,
                        Indicator: 'Direct_Page',
                        Node_Type: 'list',
                        Clickable: true,
                        Id: 6,
                        Icon: <LaptopIcon/>,
                        Upper_List_Indicator: 'Main_Menu',
                        ExpandLess:<ExpandLess/>,
                        ExpandMore:<ExpandMore/>,
                        Level:2,
                        List: [
                            {
                                Title: '功能1',
                                Indicator: 'Direct_1',
                                Selected:false,
                                Node_Type: 'item',
                                Clickable: true,
                                Icon: <PaletteIcon/>,
                                Id: 0,
                                Upper_List_Indicator: 'Direct_Page',
                                Level:3,
                            },
                            {
                                Title: '功能2',
                                Indicator: 'Direct_2',
                                Selected:false,
                                Node_Type: 'item',
                                Clickable: true,
                                Icon: <SecurityIcon/>,
                                Id: 1,
                                Upper_List_Indicator: 'Direct_Page',
                                Level:3,
                            },
                            {
                                Title: '功能3',
                                Indicator: 'Direct_3',
                                Selected:false,
                                Node_Type: 'item',
                                Clickable: true,
                                Icon: <PhotoIcon/>,
                                Id: 2,
                                Upper_List_Indicator: 'Direct_Page',
                                Level:3,
                            },
                        ]
                    },
                    {
                        Title: '关于',
                        Indicator: 'About_Page',
                        Selected:false,
                        Node_Type: 'item',
                        Clickable: true,
                        Icon: <InfoIcon/>,
                        Id: 7,
                        Upper_List_Indicator: 'Main_Menu',
                        Level:2,
                    },
                ]
        }
    ]


export default menu;

// export default withRouter(menu);



