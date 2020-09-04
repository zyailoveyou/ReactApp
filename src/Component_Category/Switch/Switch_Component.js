import React, {useEffect, useState} from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from "@material-ui/core/Grid";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../MyTheme/Theme";


const useStyles = makeStyles({
    align_right: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",

    },
    align_left: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
    },

    formControlLabel: {
        margin: '0',
    },

    root: {
        width: '2.4rem',
        height: '1.335rem',
        padding: 0,
        margin: 0,
    },
    switchBase: {
        padding: '0.135rem',
        color:theme.palette.grey["400"],
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


    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    const handleChange = () => {
        setChecked(prevState => {
            return !prevState
        })
    };

    useEffect(()=>{
        props.Data_Set_Function(props.Data_Set_Name,checked);
    },[checked])

    return (
        <Grid container spacing={1}>
            <Grid item xs={4} className={classes.align_right}>
                {
                    props.Has_Icon ?
                        <ErrorOutlineIcon color='primary' className='mr-1'/>
                        :
                        null
                }
                <Typography>{props.Title + ':'}</Typography>
            </Grid>
            <Grid item xs={4} className={classes.align_left}>
                <div className={classes.align_left}>
                    <FormControlLabel
                        classes={{
                            root: classes.formControlLabel
                        }}
                        control={
                            <Switch
                                classes={{
                                    root: classes.root,
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
                </div>
            </Grid>
        </Grid>
    );
};

export default Switch_Component;
