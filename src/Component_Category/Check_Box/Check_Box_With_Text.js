import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from "@material-ui/core/Grid";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';


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

    root_checkBox: {
        // marginLeft: 0,
        paddingLeft: 0,
        // marginRight:0,

    },
});

const Check_Box_With_Text = (props) => {

    const classes = useStyles();
    const [checked, setChecked] = React.useState(false);
    const onHandleChange =(e)=>{
        setChecked(e.target.checked);
    }

    useEffect(()=>{
        props.Data_Set_Function(props.Data_Set_Name,checked);
    },[checked])

    const onLinkClicked = (e) =>{
        e.preventDefault();
        console.log('Link clicked');
        const win = window.open('https://www.baidu.com/', '_blank');
        win.focus();
    }

    return (
        <Grid container item spacing={1}>
            <Grid item xs={4} className={classes.align_right}>
            </Grid>
            <Grid item xs={4} className={classes.align_left}>
                <Checkbox
                    color={"secondary"}
                    classes={{
                        root: classes.root_checkBox,
                    }}
                    checked={checked}
                    onChange={(e)=>onHandleChange(e)}
                />
                <Typography>请认真阅读</Typography>
                <Link href = '#' onClick={(e) => onLinkClicked(e)}>此协议</Link>
            </Grid>
        </Grid>
    );
};

export default Check_Box_With_Text;
