import React, {useContext, useEffect, useState} from 'react';
import {Box} from "@material-ui/core";
import Show_Information_Component from "../../../../Component_Category/Information/Show_Information_Component";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../../../MyTheme/Theme";
import {useHistory, useLocation} from "react-router-dom";
import Tree from "../../../../Component_Category/TreeView/Tree";
import Button from '@material-ui/core/Button';
import Authority_Panel from "../../../../Component_Category/Information/Authority_Panel";
import Alert_Component from "../../../../Component_Category/Alert/Alert_Component";
import User_Context from "../../../../Context/Context_Info/User_Context";
import CloudBase_Context from "../../../../Context/Context_Info/CloudBase_Context";
import LinearProgress from "@material-ui/core/LinearProgress";
import Dialog_Load from "../../../../Component_Category/Dialog/Dialog_Load";

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
        container: {
            padding: '1rem',
        }
    });


const page_map = [
    {
        value: 0,
        url: '/Main/Corporation/Department'
    },
    {
        value: 1,
        url: '/Main/Corporation/Department'
    },
]


const Department_Page = () => {
    const classes = useStyles()
    const {userData, setUserData} = useContext(User_Context)
    const CloudBase = useContext(CloudBase_Context)
    const history = useHistory();
    const location = useLocation()
    const result = page_map.find((item) => {
        return item.url === location.pathname
    })

    const [value, setValue] = useState(result.value);
    const [treeData, setTreeData] = useState([
        {
            title: 'src/',
            expanded: true,
            duty:'张千唱',
            children: [{title: 'index.js'}]
        },
    ])
    const [loadingTree,setLoadingTree] = useState(false)
    const [loadingAuthority,setLoadingAuthority] = useState(false)
    const [send,setSend] = useState(false)

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

    useEffect(()=>{
        setLoadingTree(true)
        CloudBase.db.collection("Department").where({
            _id: 'Department'
        }).limit(1000).get().then((res) => {
            console.log(res.data)
            console.log(res.data[0].treeData)
            if (res.data[0].treeData){
                console.log('set treeData')
                setTreeData(res.data[0].treeData)
            }
            setLoadingTree(false)
        });

    },[])

    return (

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
            <Grid container direction={"column"} spacing={2}>
                <Grid item>
                    <Show_Information_Component
                        Title={'使用说明'}
                        Content={'设置公司部门'}
                    />
                </Grid>
                <Grid item>
                    <Grid container direction={"column"} spacing={2}>
                        <Grid item>
                            <Grid container direction={'row'} spacing={2}>
                                <Grid item xs={4}>
                                    <Authority_Panel
                                        loadingAuthority={loadingAuthority}
                                        setLoadingAuthority={setLoadingAuthority}
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    <Tree
                                        treeData={treeData}
                                        setTreeData={setTreeData}
                                        loadingTree={loadingTree}
                                        setLoadingTree={setLoadingTree}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Paper elevation={3}>
                                        <Box className={classes.container}>
                                            <Grid container direction={'row'} spacing={2}>
                                                <Grid item xs={12}>
                                                    <Alert_Component content={'进行部门数据修改后一定要保存，否则修改数据会自动失效'}
                                                                     severity={'warning'}
                                                                     switch={false}/>
                                                </Grid>
                                                <Grid item xs={12} style={{
                                                    display:'flex',
                                                    justifyContent:'flex-end'
                                                }}>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        size={"medium"}
                                                        style={{
                                                            outline:'none'
                                                        }}
                                                        onClick={()=>{
                                                            console.log('on save')
                                                            setSend(true)
                                                            CloudBase.db.collection("Department").doc("Department").set({
                                                                treeData: treeData
                                                            }).then((res) => {
                                                                console.log(res)
                                                                setSend(false)
                                                            })
                                                        }}
                                                    >
                                                        保存信息
                                                    </Button>
                                                    <Dialog_Load load={send}></Dialog_Load>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Department_Page;