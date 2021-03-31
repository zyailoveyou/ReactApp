import React, {memo, useContext, useEffect, useState} from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Show_Information_Component from "../../../../Component_Category/Information/Show_Information_Component";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Input_Information_Component from "../../../../Component_Category/Input/Input_Information_Component";
import {makeStyles} from "@material-ui/core/styles";
import Avatar_Upload from "../../../../Component_Category/Information/Avatar_Upload";
import Button from '@material-ui/core/Button';
import CloudBase_Context from "../../../../Context/Context_Info/CloudBase_Context";
import Input_Selector_Component from "../../../../Component_Category/Input/Input_Selector_Component";
import Department_Select from "../../../../Component_Category/Information/Department_Select";
import User_Context from "../../../../Context/Context_Info/User_Context";
import Dialog_Load from "../../../../Component_Category/Dialog/Dialog_Load";
import theme from "../../../../MyTheme/Theme";
import LinearProgress from "@material-ui/core/LinearProgress";
import TreeData_Context from "../../../../Context/Context_Info/TreeData_Context";
import {getFlatDataFromTree} from "react-sortable-tree";


const useStyles = makeStyles({
    container: {
        padding: '1rem',
        overflowX: "hidden",
        overflowY: "hidden",

    },
    paper: {
        width: '100%',
        height: loading => {
            if (loading) {
                return 492
            } else {
                return '100%'
            }
        }
    },
    item: {
        height: "30%",
    },
    selector: {
        marginBottom: 0,
        padding: 0
    },
    box_test: {
        marginLeft: '2rem'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        background: 'rgba(0, 0, 0, 0)'
    },
});

const Set_Personal_Profile = (props) => {
    const [loading, setLoading] = useState(false)
    const [departmentGroup,setDepartmentGroup] = useState([])
    const classes = useStyles(loading);
    const CloudBase = useContext(CloudBase_Context)
    const [send, setSend] = useState(false)
    const [sendUser,setSendUser] = useState(false)
    const [sendTree,setSendTree] = useState(false)
    const {userData, setUserData} = useContext(User_Context)
    const {treeData,setTreeData} = useContext(TreeData_Context)
    console.log(treeData)

    const setData = (data_name, data) => {
        setUserData_Temper((prevUserData) => {
            return (
                {
                    ...prevUserData,
                    data: {
                        ...prevUserData.data,
                        [data_name]: data
                    }
                }
            )
        })
    }

    const setFile = (data) => {
        setUserData_Temper((prevUserData) => {
            return (
                {
                    ...prevUserData,
                    File: data
                }
            )
        })
    }

    const [userData_Temper, setUserData_Temper] = useState(
        {
            data: userData,
            SetData: setData,
            File: null,
            SetFile: setFile
        });


    const sendUserData =()=>{
        setSendUser(true)
        CloudBase.auth.getCurrenUser().then((user) => {
            console.log(user)
            //File不为null
            if (userData_Temper.File != null) {
                const type = userData_Temper.File.type.split('/')
                CloudBase.app.uploadFile({
                    cloudPath: `Avatar/User_Avatar_${user.uid + '.' + type[1]}`,
                    filePath: userData_Temper.File,
                    onUploadProgress: function (progressEvent) {
                        console.log(progressEvent);
                        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    }
                }).then((result) => {
                    CloudBase.app.getTempFileURL({
                        fileList: [result.fileID]
                    }).then((res2) => {
                        res2.fileList.forEach((el) => {
                            if (el.code === "SUCCESS") {
                                const newData = {
                                    ...userData_Temper.data,
                                    AvatarFileID: result.fileID,
                                }
                                console.log(newData)
                                CloudBase.db.collection("User").doc(user.uid).set({
                                    data: newData
                                }).then((res) => {
                                    console.log(res)
                                    setUserData({...newData, AvatarUrl: el.tempFileURL})
                                    setSendUser(false)
                                })
                            } else {
                                console.log('没有成功获取temperUrl')
                            }
                        });
                    })
                })
            } else {
                CloudBase.db.collection("User").doc(user.uid).set({
                    data: userData_Temper.data
                }).then((res) => {
                    console.log(res)
                    setUserData(userData_Temper.data)
                    setSendUser(false)
                })
            }
        })

    }


    const sendTreeData =()=>{
        setSendTree(true)
        CloudBase.db.collection("Department").doc("Department").set({
            treeData: treeData
        }).then((res) => {
            console.log(res)
            setSendTree(false)
        })
    }

    const handleSave = () => {
        setSend(true)
        sendUserData()
        sendTreeData()
    }

    useEffect(() => {
        if (!sendTree&&!sendUser){
            setSend(false)
        }
    }, [sendTree,sendUser])

    return (
        <Grid container spacing={2} direction={"column"}>
            <Grid item>
                <Show_Information_Component
                    Title={'填写说明'}
                    Content={'必须填写部门以及名称，其他信息可以不用填写'}
                />
            </Grid>
            <Grid item>
                <Paper className={classes.paper} elevation={3}>
                    {
                        loading ? <LinearProgress/> :
                            <Box className={classes.container}>
                                <Grid container direction={"row"} spacing={2}>
                                    <Grid item xs={9}>
                                        <Box className={classes.container}>
                                            <Grid container direction={"column"} spacing={2}>
                                                <Grid item>
                                                    <Typography variant={"h6"}>个人信息</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Divider variant='middle'></Divider>
                                                </Grid>
                                                <Grid item>
                                                    <Grid container direction={"row"} spacing={2}>
                                                        <Grid item xs={4}>
                                                            <Input_Information_Component
                                                                Title="姓名昵称"
                                                                Data_Set_Function={userData_Temper.SetData}
                                                                Data_Set_Name={'Name'}
                                                                Has_Icon={false}
                                                                Value={userData_Temper.data.Name}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <Input_Selector_Component
                                                                Title="性别"
                                                                Data_Set_Function={userData_Temper.SetData}
                                                                Data_Set_Name={'Gender'}
                                                                Data_Group={[
                                                                    '男', '女'
                                                                ]}
                                                                Has_Icon={false}
                                                                Value={userData_Temper.data.Gender}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={4}>
                                                            <Department_Select
                                                                Title="所属部门"
                                                                Data_Set_Function={userData_Temper.SetData}
                                                                Data_Set_Name={'Department'}
                                                                Data_Group={[
                                                                    '工程部', '销售部'
                                                                ]}
                                                                Has_Icon={false}
                                                                Value={userData_Temper.data.Department.treeIndex}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <Input_Information_Component
                                                                Title="邮箱地址"
                                                                Data_Set_Function={userData_Temper.SetData}
                                                                Data_Set_Name={'Email'}
                                                                Has_Icon={false}
                                                                Value={userData_Temper.data.Email}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <Input_Information_Component
                                                                Title="联系QQ"
                                                                Data_Set_Function={userData_Temper.SetData}
                                                                Data_Set_Name={'QQ'}
                                                                Has_Icon={false}
                                                                Value={userData_Temper.data.QQ}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <Input_Information_Component
                                                                Title="电话号码"
                                                                Data_Set_Function={userData_Temper.SetData}
                                                                Data_Set_Name={'Phone'}
                                                                Has_Icon={false}
                                                                Value={userData_Temper.data.Phone}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <Input_Information_Component
                                                                Title="工作岗位"
                                                                Data_Set_Function={userData_Temper.SetData}
                                                                Data_Set_Name={'Career'}
                                                                Has_Icon={false}
                                                                Value={userData_Temper.data.Career}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <Input_Selector_Component
                                                                Title="省份"
                                                                Data_Set_Function={userData_Temper.SetData}
                                                                Data_Set_Name={'Province'}
                                                                Data_Group={[
                                                                    '四川',
                                                                    '重庆',
                                                                    '陕西',
                                                                    '北京',
                                                                ]}
                                                                Has_Icon={false}
                                                                Value={userData_Temper.data.Province}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <Input_Information_Component
                                                                Title="城市"
                                                                Data_Set_Function={userData_Temper.SetData}
                                                                Data_Set_Name={'City'}
                                                                Has_Icon={false}
                                                                Value={userData_Temper.data.City}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Input_Information_Component
                                                                Title="详细地址"
                                                                Data_Set_Function={userData_Temper.SetData}
                                                                Data_Set_Name={'Address'}
                                                                Has_Icon={false}
                                                                Value={userData_Temper.data.Address}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Button
                                                                style={{
                                                                    outline: "none"
                                                                }}
                                                                color="primary"
                                                                variant="contained"
                                                                size={"medium"}
                                                                onClick={handleSave}
                                                            >保存信息</Button>
                                                            <Dialog_Load load={send}/>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Avatar_Upload
                                            Data_Set_Function={userData_Temper.SetFile}
                                            Data_Set_Name={'File'}
                                            File={userData_Temper.File}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                    }
                </Paper>
            </Grid>
        </Grid>

    )
}

export default memo(Set_Personal_Profile)