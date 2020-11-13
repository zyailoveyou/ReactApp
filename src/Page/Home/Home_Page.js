import React from 'react'
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Information_Area_Component from "../../Component_Category/Information/Information_Area_Component";
import Bar_Chart from "../../Component_Category/Chart/Bar_Chart";
import Line_Chart from "../../Component_Category/Chart/Line_Chart";
import Pie_Chart from "../../Component_Category/Chart/Pie_Chart";
import theme from "../../MyTheme/Theme";
import Data_Panel from "../../Component_Category/Information/Show_Panel/Data_Panel";

const useStyles = makeStyles({
    fullwidth_figure: {
        height: '45vh',
    },
    quarter_figure: {
        height: '20vh'
    },

    half_figure: {
        height: '500px',
        background: "red",
    },

    test: {
        height: "400px",
    },

    test2: {
        background: "cyan",
        height: '100%',
    },

    full: {
        background: "green",
        height: "inherit"
    }
});

const Home_Page = () => {
    const classes = useStyles();
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} className={classes.test}>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Information_Area_Component data={<Data_Panel
                                    Title={'实时流量'}
                                    Display_Type={'PC_Platform'}
                                    Increase={28897}
                                    Percentage={-12}
                                    Period={'去年合计'}
                                />}/>
                            </Grid>
                            <Grid item xs={6}>
                                <Information_Area_Component data={<Data_Panel
                                    Title={'变动量'}
                                    Display_Type={'MO_Platform'}
                                    Increase={12313}
                                    Percentage={13}
                                    Period={'去年合计'}
                                />}/>
                            </Grid>
                            <Grid item xs={6}>
                                <Information_Area_Component data={<Data_Panel
                                    Title={'访问人数'}
                                    Display_Type={'WX_Platform'}
                                    Increase={245587}
                                    Percentage={22}
                                    Period={'上周合计'}
                                />}/>
                            </Grid>
                            <Grid item xs={6}>
                                <Information_Area_Component data={<Data_Panel
                                    Title={'在线人数'}
                                    Display_Type={'QQ_Platform'}
                                    Increase={187548}
                                    Percentage={-15}
                                    Period={'上月合计'}
                                />}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={7} className={classes.test}>
                        <Information_Area_Component data={<Line_Chart/>}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={7} className={classes.test}>
                <Information_Area_Component data={<Bar_Chart/>}/>
            </Grid>
            <Grid item xs={5} className={classes.test}>
                <Information_Area_Component data={<Pie_Chart/>}/>
            </Grid>
        </Grid>
    );
};

export default Home_Page;
