//customized Component
import React, {useContext} from "react";
import Input_Selector_Component from "../../Component_Category/Input/Input_Selector_Component";
import Input_Information_Component from "../../Component_Category/Input/Input_Information_Component";
import Input_Password_Component from "../../Component_Category/Input/Input_Password_Component";
import Alert_Component from "../../Component_Category/Alert/Alert_Component";
import Group_Check_Box_Component from "../../Component_Category/Check_Box/Group_Check_Box_Component";
import Switch_Component from "../../Component_Category/Switch/Switch_Component";
import Check_Box_With_Text from "../../Component_Category/Check_Box/Check_Box_With_Text";
import Single_Button_Component from "../../Component_Category/Button/Single_Button";
import Show_Information_Component from "../../Component_Category/Information/Show_Information_Component";
//material ui
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

//context
import {Corporation_Context} from "../../Context/Corporation_Context";


const useStyles = makeStyles({
    container: {
        padding: 20,
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


const Corporation_Information_Page = (props) => {
    const classes = useStyles();
    const Corporation = useContext(Corporation_Context);
    return (
        <Grid container spacing={2} direction={"column"}>
            <Grid item style={{width:'100%'}}>
                <Show_Information_Component/>
            </Grid>
            <Grid item style={{width:'100%'}}>
                <Paper elevation={5} square={false} className={classes.paper}>
                    <div className={classes.container}>
                        <Grid container spacing={2} direction={"column"}>
                            <Grid item>
                                <Alert_Component severity='warning' content='请注意带感叹号的为必须填写项目'/>
                            </Grid>
                            <Grid item>
                                <Divider orientation='horizontal' variant='middle'/>
                            </Grid>
                            <Grid item>
                                <Typography variant='h5'>
                                    公司基本信息
                                </Typography>
                            </Grid>
                            <Grid item xs={12} style={{width:'100%'}}>
                                <Grid container direction='column' spacing={3}>
                                    <Grid item style={{width:'100%'}}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Box style={{
                                                    display: "flex"
                                                }}>
                                                    <Box style={{
                                                        flex: 3,
                                                    }}>
                                                    </Box>
                                                    <Box style={{flex: 6}}>
                                                        <Input_Information_Component
                                                            Title="公司名称"
                                                            Helper_Text='请输入公司名称'
                                                            Data_Set_Function={Corporation.SetData}
                                                            Data_Set_Name={'Corporation_Name'}
                                                            Has_Icon={false}
                                                        />
                                                    </Box>
                                                    <Box style={{
                                                        flex: 3,
                                                    }}></Box>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item style={{width:'100%'}}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Box style={{
                                                    display: "flex"
                                                }}>
                                                    <Box style={{
                                                        flex: 3,
                                                    }}>
                                                    </Box>
                                                    <Box style={{flex: 6}}>
                                                        <Input_Information_Component
                                                            Title="地址"
                                                            Padding='2rem'
                                                            Helper_Text='请输入公司地址'
                                                            Data_Set_Function={Corporation.SetData}
                                                            Data_Set_Name={'Corporation_Address'}
                                                            Has_Icon={false}/>
                                                    </Box>
                                                    <Box style={{
                                                        flex: 3,
                                                    }}></Box>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item style={{width:'100%'}}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Box style={{
                                                    display: "flex"
                                                }}>
                                                    <Box style={{
                                                        flex: 3,
                                                    }}>
                                                    </Box>
                                                    <Box style={{flex: 6}}>
                                                        <Input_Information_Component
                                                            Title="公司邮箱"
                                                            Helper_Text='请输入公司邮箱'
                                                            Data_Set_Function={Corporation.SetData}
                                                            Data_Set_Name={'Corporation_Email'}
                                                            Has_Icon={false}
                                                        />
                                                    </Box>
                                                    <Box style={{
                                                        flex: 3,
                                                    }}></Box>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item style={{width:'100%'}}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Box style={{
                                                    display: "flex"
                                                }}>
                                                    <Box style={{
                                                        flex: 3,
                                                    }}>
                                                    </Box>
                                                    <Box style={{flex: 6}}>
                                                        <Input_Information_Component
                                                            Title="公司logo"
                                                            Helper_Text='请上传logo'
                                                            Data_Set_Function={Corporation.SetData}
                                                            Data_Set_Name={'Corporation_Logo'}
                                                            Has_Icon={false}
                                                        />
                                                    </Box>
                                                    <Box style={{
                                                        flex: 3,
                                                    }}></Box>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item style={{width:'100%'}}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Box style={{
                                                    display: "flex"
                                                }}>
                                                    <Box style={{
                                                        flex: 3,
                                                    }}>
                                                    </Box>
                                                    <Box style={{flex: 6}}>
                                                        <Input_Selector_Component
                                                            Padding={'2rem'}
                                                            Title="选项"
                                                            Helper_Text='请选择选项'
                                                            Data_Set_Function={Corporation.SetData}
                                                            Data_Set_Name={'Selector'}
                                                            Has_Icon={false}
                                                        />
                                                    </Box>
                                                    <Box style={{
                                                        flex: 3,
                                                    }}></Box>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item style={{width:'100%'}}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Box style={{
                                                    display: "flex"
                                                }}>
                                                    <Box style={{
                                                        flex: 3,
                                                    }}>
                                                    </Box>
                                                    <Box style={{flex: 4}}>
                                                        <Input_Password_Component
                                                            Title="密码"
                                                            Padding='2rem'
                                                            Helper_Text='请输入密码'
                                                            Data_Set_Function={Corporation.SetData}
                                                            Data_Set_Name={'Password'}
                                                            Has_Icon={false}
                                                        />
                                                    </Box>
                                                    <Box style={{
                                                        flex: 5,
                                                    }}></Box>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item style={{width:'100%'}}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Box style={{
                                                    display: "flex"
                                                }}>
                                                    <Box style={{
                                                        flex: 3,
                                                    }}>
                                                    </Box>
                                                    <Box style={{flex: 4}}>
                                                        <Input_Password_Component
                                                            Title="确认密码"
                                                            Helper_Text='请输入确认密码'
                                                            Data_Set_Function={Corporation.SetData}
                                                            Data_Set_Name={'Certification_Password'}
                                                            Has_Icon={false}
                                                        />
                                                    </Box>
                                                    <Box style={{
                                                        flex: 5,
                                                    }}></Box>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item style={{width:'100%'}}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Grid container>
                                                    <Grid item xs={3}>

                                                    </Grid>
                                                    <Grid item xs={6} style={{
                                                        }}>
                                                        <Group_Check_Box_Component
                                                            Title="选项"
                                                            Padding = '2rem'
                                                            Helper_Text='请选择选项'
                                                            Data_Set_Function={Corporation.SetData}
                                                            Data_Set_Name={'Check_Option'}
                                                            Has_Icon={false}
                                                            Unique={true}
                                                            Data={[
                                                                {
                                                                    name: 'n1',
                                                                    checked: false,
                                                                    index: 0,
                                                                },
                                                                {
                                                                    name: 'n2',
                                                                    checked: false,
                                                                    index: 1,
                                                                },
                                                                {
                                                                    name: 'n2',
                                                                    checked: false,
                                                                    index: 2,
                                                                }
                                                            ]}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3}>

                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item style={{width:'100%'}}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Box style={{
                                                    display: "flex"
                                                }}>
                                                    <Box style={{
                                                        flex: 3,
                                                    }}>
                                                    </Box>
                                                    <Box style={{flex: 6}}>
                                                        <Switch_Component
                                                            Padding='2rem'
                                                            Title="开关"
                                                            Helper_Text='请点击开关'
                                                            Data_Set_Function={Corporation.SetData}
                                                            Data_Set_Name={'Switch_Option'}
                                                            Has_Icon={false}
                                                        />
                                                    </Box>
                                                    <Box style={{
                                                        flex: 3,
                                                    }}></Box>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item style={{width:'100%'}}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Box style={{
                                                    display: "flex"
                                                }}>
                                                    <Box style={{
                                                        flex: 3,
                                                    }}>
                                                    </Box>
                                                    <Box style={{flex: 6}}>
                                                        <Check_Box_With_Text
                                                            Padding={'5rem'}
                                                            Title="协议认可"
                                                            Helper_Text='协议认可'
                                                            Data_Set_Function={Corporation.SetData}
                                                            Data_Set_Name={'Has_Read_Agreement'}
                                                            Has_Icon={false}
                                                        />
                                                    </Box>
                                                    <Box style={{
                                                        flex: 3,
                                                    }}></Box>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item style={{width:'100%'}}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Box style={{
                                                    display: "flex"
                                                }}>
                                                    <Box style={{
                                                        flex: 3,
                                                    }}>
                                                    </Box>
                                                    <Box style={{flex: 6}}>
                                                        <Single_Button_Component
                                                            Padding={'5rem'}
                                                            disable = {Corporation.Has_Read_Agreement}/>
                                                    </Box>
                                                    <Box style={{
                                                        flex: 3,
                                                    }}></Box>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Corporation_Information_Page;

