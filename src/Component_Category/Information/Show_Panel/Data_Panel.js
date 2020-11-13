import React from 'react';
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import Chip from '@material-ui/core/Chip';
import theme from "../../../MyTheme/Theme";


const useStyles = makeStyles({
    container: {
        padding: "1rem",
    },
    font:{
        color: props => {
            if (props.Percentage>=0){
                return theme.palette.success.main
            }
            else {
                return theme.palette.error.main
            }
        }
    },

    hint:{
       color: theme.palette.text.hint
    }

});


const Data_Panel = (props) => {
    const classes = useStyles(props);
    const title = props.Title;
    const display_type = props.Display_Type;
    const increase = props.Increase;
    const percentage = props.Percentage;
    const period = props.Period
    return (
        <Box className={classes.container}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Box style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <Typography variant={"subtitle1"}>{title}</Typography>
                        <Chip color="primary" label={display_type} size={'small'}/>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={'h5'}>{increase}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography className={classes.font} variant={'subtitle1'}>{
                        percentage >0 ? '+'+percentage+'%':percentage+'%'
                    }</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant={'subtitle1'} className={classes.hint}>{period}</Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Data_Panel;
