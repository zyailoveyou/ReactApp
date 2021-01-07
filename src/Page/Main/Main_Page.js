import {Route} from 'react-router-dom'
import React, {memo, useContext, useEffect, useState} from "react";
import Footer_Component from "../../Component_Category/Footer/Footer_Component";
import Navigation_Text from '../../Component_Category/Breadcrumb/Navigation_Text_Component'
import Home_Page from "./Home/Home_Page";
import List_Component from "../../Component_Category/Menu_List/List_Component";
import menu from "../../Component_Category/Menu_List/Data/menu";
import User_Page from "./Corporation_Manage/User_Page";
import App_Bar from "../../Component_Category/App_Bar/App_Bar";
//material ui
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import theme from "../../MyTheme/Theme";
import {Box} from "@material-ui/core";
import useSignOut from "../../Hook/useSignOut";
import User_Context from "../../Context/Context_Info/User_Context";
import CloudBase_Context from "../../Context/Context_Info/CloudBase_Context";
import User_Data from "../../Context/Data/User_Data";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
    position: {
        position: "relative",
        width: '100%',
    },
    container: {
        padding: '1.5rem',
        background: theme.palette.grey["200"],
        width: '100%'
    },
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        '&$selected': {
            background: 'rgba(0, 0, 0, 0.12)',
            color: 'white',
            boxShadow: 'none',
            outline: "none",
        },
    },
    fill_in: {
        width: '100%',
        height: '100%',
        background: theme.palette.grey.A100,
        position: "sticky",
        top: 0,
    },
    selected: {},
    Load: {
        width: '100%',
        height: '100vh',
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
});


const Main_Page = () => {

    console.log('render main page')
    const classes = useStyles();
    const CLoudBase = useContext(CloudBase_Context)
    const [Load, setLoad] = useState(true)
    const [userData, setUserData] = useState(null)
    useSignOut();

    useEffect(() => {
        CLoudBase.auth.getCurrenUser().then((user) => {
            console.log('进入初始化用户')
            CLoudBase.db.collection("User").doc(user.uid).get().then((res) => {
                if (res.data[0] != null) {
                    if (res.data[0].AvatarFileID!=null){
                        CLoudBase.app.getTempFileURL({
                            fileList: [res.data[0].AvatarFileID]
                        }).then((res2) => {
                            res2.fileList.forEach((el) => {
                                if (el.code === "SUCCESS") {
                                    console.log({...res.data[0], AvatarUrl: el.tempFileURL})
                                    setUserData({...res.data[0], AvatarUrl: el.tempFileURL})
                                    setLoad(false)
                                } else {
                                    console.log('没有成功获取temperUrl')
                                }
                            });
                        })
                    }else {
                        setUserData(res.data[0])
                        setLoad(false)
                    }
                } else {
                    setUserData(User_Data)
                    setLoad(false)
                }
            })
        })
    }, [])


    return (
        <User_Context.Provider value={userData}>
            <Grid container>
                <Grid item xs={2}>
                    <Box className={classes.fill_in}>
                        <List_Component menu={menu} left={2} Accordion={true}/>
                    </Box>
                </Grid>
                <Grid item xs={10}>
                    {
                        Load ?
                            <Box className={classes.Load}>
                                <CircularProgress size={'8rem'}/>
                            </Box>
                            :
                            <Box>
                                <App_Bar/>
                                <Box className={classes.container}>
                                    <Grid container spacing={2} direction={"column"}>
                                        <Grid item xs={12}>
                                            <Navigation_Text/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider orientation='horizontal' variant='middle'/>
                                        </Grid>
                                        <Grid item>
                                            <Route path='/Main/Home' component={Home_Page}></Route>
                                            <Route path='/Main/Corporation' component={User_Page}></Route>
                                        </Grid>
                                        <Footer_Component Title='React Admin ©2020 Created By Neo Zhang'/>
                                    </Grid>
                                </Box>
                            </Box>
                    }
                </Grid>
            </Grid>
        </User_Context.Provider>
    )
}


export default memo(Main_Page);





