import React, {useContext, useEffect, useState,memo} from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Show_Information_Component from "../../../Component_Category/Information/Show_Information_Component";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Input_Information_Component from "../../../Component_Category/Input/Input_Information_Component";
import {makeStyles} from "@material-ui/core/styles";
import Avatar_Upload from "../../../Component_Category/Information/Avatar_Upload";
import Button from '@material-ui/core/Button';
import CloudBase_Context from "../../../Context/Context_Info/CloudBase_Context";
import User_Data from "../../../Context/Data/User_Data";
import Input_Selector_Component from "../../../Component_Category/Input/Input_Selector_Component";
import User_Context from "../../../Context/Context_Info/User_Context";



const useStyles = makeStyles({
    container: {
        padding: '1rem',
        overflowX: "hidden",
        overflowY: "hidden",
    },
    paper: {
        height: "100%",
        width: '100%'
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
    }
});

const Set_Personal_Profile = () => {
    const classes = useStyles();
    const CLoudBase = useContext(CloudBase_Context)
    const User = useContext(User_Context)
    const User_Temper = function () {
        if (User !=null){
            return(
                {
                    Career:User.Career,
                    Department:User.Department,
                    Gender:User.Gender,
                    Address:User.Address,
                    City:User.City,
                    Province:User.Province,
                    Name:User.Name,
                    Phone:User.Phone,
                    QQ:User.QQ,
                    Email: User.Email,
                }
            )
        }
        else {
            return (
                User_Data
            )
        }
    }()


    const setData = (data_name, data) => {
        setUserData((prevUserData) => {
            return {...prevUserData, [data_name]: data};
        })
    }


    const [userData, setUserData] = useState({...User_Temper, SetData: setData,File:null});


    const handleSave = () =>{
        CLoudBase.auth.getCurrenUser().then((user)=>{
            console.log(user.uid)
            CLoudBase.db.collection("User").doc(user.uid).set({
                Career:userData.Career,
                Department:userData.Department,
                Gender:userData.Gender,
                Address:userData.Address,
                City:userData.City,
                Province:userData.Province,
                Name:userData.Name,
                Phone:userData.Phone,
                QQ:userData.QQ,
                Email: userData.Email,
            }).then((res)=>{
                console.log(res)
            })

            if(userData.File !=null){
                const type = userData.File.type.split('/')
                console.log(type)
                CLoudBase.app.uploadFile({
                    cloudPath: `Avatar/User_Avatar_${user.uid+'.'+type[1]}`,
                    filePath: userData.File,
                    onUploadProgress: function (progressEvent) {
                        console.log(progressEvent);
                        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    }
                }).then((result) => {
                    console.log(result)
                    CLoudBase.db.collection("User").doc(user.uid).update({
                        AvatarFileID:result.fileID
                    }).then((res)=>{
                        console.log(res)
                    })
                });
            }
        })
    }

    useEffect(()=>{

        console.log(userData)

    },[userData])

    return (
        <Grid container spacing={2} direction={"column"}>
            <Grid item>
                <Show_Information_Component/>
            </Grid>
            <Grid item>
                <Paper style={{
                    width: '100%',
                    height: '100%',
                }} elevation={3}>
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
                                                        Data_Set_Function={userData.SetData}
                                                        Data_Set_Name={'Name'}
                                                        Has_Icon={false}
                                                        Value = {User_Temper.Name}
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Input_Selector_Component
                                                        Title="性别"
                                                        Data_Set_Function={userData.SetData}
                                                        Data_Set_Name={'Gender'}
                                                        Data_Group={[
                                                            {value:'男'},{value:'女'}
                                                        ]}
                                                        Has_Icon={false}
                                                        Value={User_Temper.Gender}
                                                    />
                                                </Grid>

                                                <Grid item xs={4}>
                                                    <Input_Selector_Component
                                                        Title="所属部门"
                                                        Data_Set_Function={userData.SetData}
                                                        Data_Set_Name={'Department'}
                                                        Data_Group={[
                                                            {value:'工程部'},{value:'销售部'}
                                                        ]}
                                                        Has_Icon={false}
                                                        Value={User_Temper.Department}
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Input_Information_Component
                                                        Title="邮箱地址"
                                                        Data_Set_Function={userData.SetData}
                                                        Data_Set_Name={'Email'}
                                                        Has_Icon={false}
                                                        Value={User_Temper.Email}
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Input_Information_Component
                                                        Title="联系QQ"
                                                        Data_Set_Function={userData.SetData}
                                                        Data_Set_Name={'QQ'}
                                                        Has_Icon={false}
                                                        Value={User_Temper.QQ}
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Input_Information_Component
                                                        Title="电话号码"
                                                        Data_Set_Function={userData.SetData}
                                                        Data_Set_Name={'Phone'}
                                                        Has_Icon={false}
                                                        Value={User_Temper.Phone}
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Input_Information_Component
                                                        Title="工作岗位"
                                                        Data_Set_Function={userData.SetData}
                                                        Data_Set_Name={'Career'}
                                                        Has_Icon={false}
                                                        Value={User_Temper.Career}
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Input_Selector_Component
                                                        Title="省份"
                                                        Data_Set_Function={userData.SetData}
                                                        Data_Set_Name={'Province'}
                                                        Data_Group={[
                                                            {value:'四川'},
                                                            {value:'重庆'},
                                                            {value:'陕西'},
                                                            {value:'北京'},
                                                        ]}
                                                        Has_Icon={false}
                                                        Value={User_Temper.Province}
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Input_Information_Component
                                                        Title="城市"
                                                        Data_Set_Function={userData.SetData}
                                                        Data_Set_Name={'City'}
                                                        Has_Icon={false}
                                                        Value={User_Temper.City}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Input_Information_Component
                                                        Title="详细地址"
                                                        Data_Set_Function={userData.SetData}
                                                        Data_Set_Name={'Address'}
                                                        Has_Icon={false}
                                                        Value={User_Temper.Address}
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
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Avatar_Upload
                                    Data_Set_Function={userData.SetData}
                                    Data_Set_Name={'File'}
                                    File = {userData.File}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Grid>
        </Grid>

    )
}

export default memo(Set_Personal_Profile)