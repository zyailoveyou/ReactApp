import React from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Checkbox from '@material-ui/core/Checkbox';
import theme from "../../MyTheme/Theme";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import {KeyboardDateTimePicker, MuiPickersUtilsProvider,DateTimePicker} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import cn from "date-fns/locale/zh-CN";


const useStyles = makeStyles({


    Outline: {
        outline: "none !important",
    },
    container: {
        padding: "1rem",
    },
    rootApproved: {
        '&$checked': {
            color: theme.palette.success.main,
        },
    },
    rootDenied: {
        '&$checked': {
            color: theme.palette.error.main
        },
    },
    checked: {},

})

const Vacation_Panel = (props) => {
    const classes = useStyles();
    return (
        <Paper style={{
            width: '100%',
            height: '100%',
        }} elevation={3}>
            <Box className={classes.container}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant={"h5"}>{'这里是请假标题'}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Chip color="primary" label={'部门信息'} size={'small'}/>
                        <Chip color="primary" label={'类型1'} size={'small'}/>
                        <Chip color="primary" label={'类型2'} size={'small'}/>
                    </Grid>
                    <Grid item xs={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={cn}>
                            <Box style={{
                                display:"flex",
                                flexDirection:"row",
                                alignItems:"center"
                            }}>
                                <DateTimePicker
                                    label="起始时间"
                                    format="yyyy/MM/dd HH:mm"
                                />
                                <Box style={{
                                    marginLeft: '1rem',
                                    marginRight: '1rem',
                                }}
                                >-</Box>
                                <DateTimePicker
                                    label="结束时间"
                                    format="yyyy/MM/dd HH:mm"
                                />
                            </Box>
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.font} variant={"body1"}>
                            {
                                '这里是内容adflasdlfjlasdjflasjldfjlasdljfjalsdflasldfjlas2341234'
                            }
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar src={null}/>
                            </ListItemAvatar>
                            <ListItemText primary={'名字'}
                                          secondary={'职业'}/>

                        </ListItem>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider orientation='horizontal' variant='middle'/>
                    </Grid>
                    <Grid item xs={12} style={{
                        display: "flex",
                        justifyContent: "flex-end"
                    }}>
                        <Box style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}>
                            <Box style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                            }}>
                                <Checkbox classes={{
                                    root: classes.rootApproved,
                                    checked: classes.checked,
                                }} style={{
                                    marginRight: '0.5rem'
                                }}/>
                                <Typography>同意</Typography>
                            </Box>
                            <Box style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                marginLeft: '1.5rem'
                            }}>
                                <Checkbox
                                    classes={{
                                        root: classes.rootDenied,
                                        checked: classes.checked,
                                    }}
                                    style={{
                                        marginRight: '0.5rem'
                                    }}
                                />
                                <Typography>拒绝</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center"
                    }}>


                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default Vacation_Panel;
