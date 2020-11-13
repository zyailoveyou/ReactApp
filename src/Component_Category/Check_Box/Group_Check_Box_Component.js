import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from "@material-ui/core/Grid";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import theme from "../../MyTheme/Theme";


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
        flex: 1,
    },
    formControlLabel: {
        margin: 0,

    },
    root_checkBox: {
        paddingLeft:0,
    },
    root_Typography:{
        marginLeft:0,
        marginRight:'1rem'
    }
});

const Group_Check_Box_Component = (props) => {

    const classes = useStyles(props);
    const [state, setState] = React.useState(props.Data);

    const handleChange = (id, e) => {

        const check = e.target.checked
        setState(prevState => (
            prevState.map((item, index) => {
                    if (index === id) {
                        return {...item, checked: check}
                    } else {
                        if (props.Unique === true) {
                            item.checked = false;
                        }
                        return item
                    }
                }
            )
        ));
    };

    useEffect(() => {
        props.Data_Set_Function(props.Data_Set_Name, state);
    }, [state])

    return (
        <Grid container direction={"column"} className={classes.root}>
            <Grid item>
                <Grid container alignItems={"center"} spacing={1}>
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
                                <FormGroup row={true}>
                                    {
                                        state.map((item) => {
                                            return (
                                                <FormControlLabel
                                                    key={item.index}
                                                    classes={{
                                                        root: classes.formControlLabel
                                                    }}
                                                    control={
                                                        <Checkbox
                                                        classes={{
                                                            root: classes.root_checkBox,
                                                        }}
                                                        color={"secondary"}
                                                        checked={item.checked}
                                                        onChange={(e) => handleChange(item.index, e)}
                                                        index={item.index}
                                                        value={item.index}
                                                    />}
                                                    label={
                                                        <Typography
                                                            classes={{
                                                                root: classes.root_Typography
                                                            }}
                                                            index={item.index}
                                                            value={item.index}
                                                            noWrap
                                                        >{item.name}</Typography>}
                                                />
                                            )
                                        })
                                    }
                                </FormGroup>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography className={classes.helper_text} noWrap>{props.Helper_Text}</Typography>
            </Grid>
        </Grid>
    );
};

export default Group_Check_Box_Component;
