import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import React, {useState, memo} from 'react';
import theme from "../../MyTheme/Theme";
import Box from '@material-ui/core/Box';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import ErrorIcon from '@material-ui/icons/Error';

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
            width:'100%',
            height:'100%'
        },
    }
);


const Input_Information_Component = (props) => {
    const classes = useStyles(props);
    const {Value,Title} = props
    const [value,setValue] = useState(Value)
    const [Error, Set_Error] = useState(false)
    return (
        <Box className={classes.box_Textfield}>
            <TextField
                variant='outlined'
                fullWidth
                label={Title}
                size='small'
                error={false}
                value={value}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                style={{
                                    outline: "none"
                                }}
                            >
                                {
                                    Error ? <ErrorIcon style={{
                                        color: theme.palette.error.main
                                    }}/> : null
                                }
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                onChange={(e)=>{setValue(e.target.value)}}
                onBlur={(e) => props.Data_Set_Function(props.Data_Set_Name, e.target.value)}
            >
            </TextField>
        </Box>
    );
};

export default memo(Input_Information_Component);


