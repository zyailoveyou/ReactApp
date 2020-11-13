import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import theme from "../../MyTheme/Theme";
import Box from '@material-ui/core/Box';
import {flexbox} from '@material-ui/system';

const useStyles = makeStyles({
        root: {
            paddingLeft: props => {
                return props.Padding
            }
        },
        helper_text: {
            color: theme.palette.grey["500"],
            fontSize: '0.75rem',
            marginLeft: (props => {
                    let len = 0;
                    for (let i = 0; i < props.Title.length; i++) {
                        let a = props.Title.charAt(i);
                        if (a.match(/[^\x00-\xff]/ig) != null) {
                            len += 1;
                        } else {
                            len += 0.5;
                        }
                    }
                    return len + 1 + 'rem'
                }
            )
        },
        box_Container: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        },
        box_Title: {},
        box_Textfield: {
            flex: 1
        },
    }
);


const Input_Information_Component = (props) => {
    const classes = useStyles(props);
    const {Padding} = props
    return (
        <Grid container direction={"column"} className={classes.root} spacing={1}>
            <Grid item>
                <Grid container alignItems={"center"}>
                    <Grid item xs={12}>
                        <Box className={classes.box_Container}>
                            {
                                props.Has_Icon ?
                                    <ErrorOutlineIcon color='primary'/>
                                    :
                                    null
                            }
                            <Box className={classes.box_Title}>
                                <Typography>{props.Title + '：'}</Typography>
                            </Box>
                            <Box className={classes.box_Textfield}>
                                <TextField
                                    variant='outlined'
                                    fullWidth
                                    label={null}
                                    size='small'
                                    error={false}
                                    // onChange={(e) =>props.Data_Set_Function(props.Data_Set_Name,e.target.value)}
                                    // onBlur={(e) => props.Data_Set_Function(props.Data_Set_Name, e.target.value)}
                                >
                                </TextField>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                    <Typography className={classes.helper_text}>{props.Helper_Text}</Typography>
            </Grid>
        </Grid>
    );
};

export default Input_Information_Component;


