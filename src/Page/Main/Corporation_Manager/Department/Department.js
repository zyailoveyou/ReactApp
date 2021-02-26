import React, {useEffect, useState} from 'react';
import {Box} from "@material-ui/core";
import Show_Information_Component from "../../../../Component_Category/Information/Show_Information_Component";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../../../MyTheme/Theme";
import {useHistory, useLocation} from "react-router-dom";
import Tree from "../../../../Component_Category/TreeView/Tree";

const useStyles = makeStyles(
    {
        root: {
            background: (theme.palette.grey["400"]),
            color: (theme.palette.primary.contrastText),
            borderTopRightRadius: '0.5rem',
            borderTopLeftRadius: '0.5rem',
            '&$selected': {
                background: (theme.palette.primary.main),
                color: (theme.palette.primary.contrastText),
                boxShadow: 'none',
                outline: "none",
            },
        },
        selected: {},
        indicator: {
            background: (theme.palette.secondary.main),
        },
        container: {
            width: '100%',
            height: '60vh',
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }
    });


const page_map = [
    {
        value: 0,
        url: '/Main/Corporation/Department'
    },
    {
        value: 1,
        url: '/Main/Corporation/Department'
    },
]


const Department = () => {
    const classes = useStyles()
    const history = useHistory();
    const location = useLocation()
    const result = page_map.find((item) => {
        return item.url === location.pathname
    })

    const [value, setValue] = useState(result.value);
    const handleChange = (event, newValue) => {
        const result = page_map.find((item) => {
            return item.value === newValue
        })
        history.push(result.url);
    };


    useEffect(() => {
        const result = page_map.find((page_inf) => {
            return location.pathname === page_inf.url
        })
        setValue(result.value);
    }, [location])

    return (

        <Box>
            <Tabs value={value} onChange={handleChange}
                  classes={{indicator: classes.indicator}}>
                <Tab label="部门层级"
                     classes={{
                         root: classes.root,
                         selected: classes.selected,
                     }}/>
                <Tab label="人员详情"
                     classes={{
                         root: classes.root,
                         selected: classes.selected,
                     }}/>
            </Tabs>
            <Grid container direction={"column"} spacing={2}>
                <Grid item>
                    <Show_Information_Component
                        Title={'使用说明'}
                        Content={'设置公司部门'}
                    />
                </Grid>
                <Grid item>
                    <Grid container direction={"row"} spacing={2}>
                        <Grid item xs={12}>
                            <Paper elevation={3}>
                                <Tree />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Department;
