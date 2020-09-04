import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from "@material-ui/core/Grid";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Typography from "@material-ui/core/Typography";


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
        padding: 0,
    },
    root_checkBox: {
        marginLeft:0,
        paddingLeft:0,
    },
    root_Typography:{
        marginLeft:0,
        marginRight:'1rem'
    }
});

const Group_Check_Box_Component = (props) => {

    const classes = useStyles();
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

    useEffect(()=>{
        props.Data_Set_Function(props.Data_Set_Name,state);
    },[state])

    return (
        <Grid container item spacing={1}>
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
                <FormGroup row={true}>
                    {
                        state.map((item) => {
                            return (
                                <FormControlLabel key={item.index}
                                                  classes={{
                                                      root: classes.formControlLabel
                                                  }}
                                                  control={<Checkbox
                                                      classes={{
                                                          root:classes.root_checkBox,
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
                                                              root:classes.root_Typography
                                                          }}
                                                          index={item.index}
                                                          value={item.index}
                                                      >{item.name}</Typography>}
                                />
                            )
                        })
                    }
                </FormGroup>
            </Grid>
        </Grid>
    );
};

export default Group_Check_Box_Component;
