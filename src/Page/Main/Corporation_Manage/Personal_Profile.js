//customized Component
import React from "react";
import Show_Information_Component from "../../../Component_Category/Information/Show_Information_Component";
//material ui
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar_Profile from "../../../Component_Category/Information/Avatar_Profile";
import Chips_Profile from "../../../Component_Category/Information/Chips_Profile";
import About_Profile from "../../../Component_Category/Information/About_Profile";
import Table_Component from "../../../Component_Category/Table/Table_Component";
import Bar_Chart from "../../../Component_Category/Chart/Bar_Chart";
//context
import Data_Panel from "../../../Component_Category/Information/Data_Panel";
import {Box} from "@material-ui/core";
import theme from "../../../MyTheme/Theme";


const useStyles = makeStyles({
    container: {
        position:"relative"
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
    },
    background: {
        position: "absolute",
        width: '100%',
        height: '100%',
        padding:8,
        top: 0,
        left: 0,
        zIndex: 100,
        background: theme.palette.grey["600"],
        opacity: 0.5,
    },
    Liner_Progress: {
        position: "absolute",
        top: 0,
        left: 0,
        height: 5,
        zIndex:100,
        width: 'inherit'
    }
});


const Personal_Profile = (props) => {
    const classes = useStyles()
    console.log('render personal profile')

    return (
        <Box>
            <Grid container spacing={2} direction={"column"}>
                <Grid item>
                    <Show_Information_Component/>
                </Grid>
                <Grid item >
                    <Grid container spacing={2} direction={"row"} className={classes.container}>
                        <Grid item xs={3}>
                            <Grid container spacing={2} direction={"column"}>
                                <Grid item>
                                    <Avatar_Profile/>
                                </Grid>
                                <Grid item>
                                    <About_Profile/>
                                </Grid>
                                <Grid item>
                                    <Chips_Profile/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={9}>
                            <Grid container spacing={2} direction={"column"}>
                                <Grid item style={{height: 400}}>
                                    <Bar_Chart/>
                                </Grid>
                                <Grid item>
                                    <Grid container spacing={2} direction={"row"}>
                                        <Grid item xs={4}>
                                            <Data_Panel
                                                Title={'实时流量'}
                                                Display_Type={'PC_Platform'}
                                                Increase={28897}
                                                Percentage={-12}
                                                Period={'去年合计'}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Data_Panel
                                                Title={'实时流量'}
                                                Display_Type={'PC_Platform'}
                                                Increase={28897}
                                                Percentage={-12}
                                                Period={'去年合计'}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Data_Panel
                                                Title={'实时流量'}
                                                Display_Type={'PC_Platform'}
                                                Increase={28897}
                                                Percentage={-12}
                                                Period={'去年合计'}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Table_Component/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Personal_Profile;

