import React, {useEffect, useState} from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from "@material-ui/core/Grid";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../MyTheme/Theme";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";


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

    formControlLabel: {
        margin: '0',
    },

    round_button: {
        width: '2.4rem',
        height: '1.335rem',
        padding: 0,
        margin: 0,
    },
    switchBase: {
        padding: '0.135rem',
        color: theme.palette.grey["400"],
        '&$checked': {
            transform: 'translateX(1.2rem)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: theme.palette.primary.main,
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
            color: '#52d869',
            border: '6px solid #fff',
        },
    },
    thumb: {
        width: '1rem',
        height: '1rem',
    },
    track: {
        borderRadius: '1rem',
        border: `1px solid ${theme.palette.grey["500"]}`,
        backgroundColor: theme.palette.grey[50],
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},

});

const Switch_Component = (props) => {


    const classes = useStyles(props);
    const [checked, setChecked] = useState(false);
    const handleChange = () => {
        setChecked(prevState => {
            return !prevState
        })
    };

    useEffect(() => {
        props.Data_Set_Function(props.Data_Set_Name, checked);
    }, [checked])

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
                                <FormControlLabel
                                    classes={{
                                        root: classes.formControlLabel
                                    }}
                                    control={
                                        <Switch
                                            classes={{
                                                root: classes.round_button,
                                                switchBase: classes.switchBase,
                                                thumb: classes.thumb,
                                                track: classes.track,
                                                checked: classes.checked,
                                            }}
                                            checked={checked}
                                            onChange={handleChange}
                                            name="check"
                                            color="primary"
                                        />
                                    }
                                />
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

export default Switch_Component;
