import React, {useContext, useEffect, useState} from 'react';
import Box from "@material-ui/core/Box";
import {Route, useHistory, useLocation} from "react-router-dom";
import Hierarchy_Page from "./Hierarchy_Page";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../../../MyTheme/Theme";
import Members_Page from "./Members_Page";
import {getTreeFromFlatData} from "react-sortable-tree";
import CloudBase_Context from "../../../../Context/Context_Info/CloudBase_Context";
import TreeData_Context from "../../../../Context/Context_Info/TreeData_Context";
import LinearProgress from "@material-ui/core/LinearProgress";
import Dot_Progress from "../../../../Component_Category/Progress_Bar/Dot_Progress";

const useStyles = makeStyles(
    {
        root: {
            background: (theme.palette.grey["400"]),
            color: (theme.palette.primary.contrastText),
            borderTopRightRadius: '0.5rem',
            borderTopLeftRadius: '0.5rem',
            '&$selected': {
                background: (theme.palette.primary.main),
                color: (theme.palette.primary.contrastText),
                boxShadow: 'none',
                outline: "none",
            },
        },
        selected: {},
        indicator: {
            background: (theme.palette.secondary.main),
        },

    });

const page_map = [
    {
        value: 0,
        url: '/Main/Corporation/Department/Hierarchy'
    },
    {
        value: 1,
        url: '/Main/Corporation/Department/Members'
    },
]

const Department_Page = () => {

    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const CloudBase = useContext(CloudBase_Context)
    const [treeData, setTreeData] = useState([])
    const [loadingDepartmentTree, setLoadingDepartmentTree] = useState(true);
    const [loadAuthorityList, setLoadAuthorityList] = useState(true);
    const [authorityCheckList, setAuthorityCheckList] = useState([]);
    const [removeTreeData, setRemoveTreeData] = useState([]);
    const [removeMemberList, setRemoveMemberList] = useState([]);


    const [load, setLoad] = useState(true);


    const result = page_map.find((item) => {
        return item.url === location.pathname
    })

    const [value, setValue] = useState(result.value);

    const handleChange = (event, newValue) => {
        const result = page_map.find((item) => {
            return item.value === newValue
        })
        history.push(result.url);
    };


    useEffect(() => {
        const result = page_map.find((page_inf) => {
            return location.pathname === page_inf.url
        })
        setValue(result.value);
    }, [location])

    useEffect(() => {
        loadingInitialData()
    }, [])


    useEffect(()=>{
        if (!loadingDepartmentTree && !loadAuthorityList){
            setLoad(false)
        }
    },[loadingDepartmentTree,loadAuthorityList])


    const loadingInitialData = () => {
        setLoadingDepartmentTree(true)
        setLoadAuthorityList(true)

        //读取部门和部门所属人员，聚合
        CloudBase.app
            .callFunction({
                name: "aggregateDepartment",
            })
            .then((res) => {
                const result = res.result; //云函数执行结果
                console.log(res)
                console.log(result)

                const nestTree = getTreeFromFlatData({
                    flatData: result,
                    getKey: (node) => node.id,
                    getParentKey: (node) => node.parentNode,
                    rootKey: 0
                })

                console.log(nestTree)

                if (result) {
                    console.log('set treeData')
                    setTreeData(nestTree)
                    setLoadingDepartmentTree(false)

                } else {
                    console.log('failed on loading tree')
                    setLoadingDepartmentTree(false)

                }
            });


        //读取预设部门人员权限
        CloudBase.app
            .callFunction({
                name: "getDepartmentAuthority",
            })
            .then((res) => {
                const result = res.result; //云函数执行结果
                console.log(res)
                console.log(result)
                CloudBase.app
                    .callFunction({
                        name: "getDepartmentAuthority",
                    })
                    .then((res) => {
                        const result = res.result; //云函数执行结果
                        console.log(result)

                        if (result.Authority) {
                            console.log('set Authority Check List')
                            setAuthorityCheckList(() => {
                                return result.Authority.map((item) => {
                                    return {...item, Checked: false}
                                })
                            })
                            setLoadAuthorityList(false)
                        } else {
                            console.log('failed on loading tree')
                            setLoadAuthorityList(false)
                        }
                    });

            });

    }


    return (
        <TreeData_Context.Provider value={{
            treeData: treeData,
            setTreeData: setTreeData,
            loadingDepartmentTree: loadingDepartmentTree,
            setLoadingDepartmentTree: setLoadingDepartmentTree,
            loadAuthorityList: loadAuthorityList,
            setLoadAuthorityList: setLoadAuthorityList,
            authorityCheckList: authorityCheckList,
            setAuthorityCheckList: setAuthorityCheckList,
            removeTreeData: removeTreeData,
            setRemoveTreeData: setRemoveTreeData,
            removeMemberList: removeMemberList,
            setRemoveMemberList: setRemoveMemberList
        }}>
            {
                load ?
                    <Box style={{
                        display:"flex",
                        height:'70vh',
                        justifyContent:'center',
                        alignItems:'center',
                    }}>
                        <Dot_Progress/>
                    </Box>
                    :
                    <Box>
                        <Tabs value={value} onChange={handleChange}
                              classes={{indicator: classes.indicator}}>
                            <Tab label="部门层级"
                                 classes={{
                                     root: classes.root,
                                     selected: classes.selected,
                                 }}/>
                            <Tab label="人员详情"
                                 classes={{
                                     root: classes.root,
                                     selected: classes.selected,
                                 }}/>
                        </Tabs>
                        <Route path='/Main/Corporation/Department/Hierarchy'
                               component={Hierarchy_Page}></Route>
                        <Route path='/Main/Corporation/Department/Members'
                               component={Members_Page}></Route>
                    </Box>
            }
        </TreeData_Context.Provider>
    );
};
export default Department_Page;
