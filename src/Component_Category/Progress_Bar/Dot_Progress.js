import React from 'react';
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../MyTheme/Theme";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {animated, useTrail} from "react-spring";
import {easeBounce} from "d3-ease";
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";



const useStyles = makeStyles({
    Avatar: {
        color: theme.palette.primary.main,
        fontSize: '2.5rem',
        margin: '0.2rem'
    },
})


const Dot_Progress = () => {
    const classes = useStyles()
    const trail = useTrail(3, {
        loop: {reverse: true},
        from: {y: 20},
        to: {y: -20},
        config: {
            easing: t => easeBounce(t),
            friction: 26,
            tension: 340,
            mass: 1
        }
    })


    return (
        <Box style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: '100%',
            height: '100%'
        }}>
            <Box >
                <Grid container direction={"column"} spacing={2}>
                    <Grid item style={{
                        display: "flex",
                        flexDirection: "row",
                    }}>
                        {
                            trail.map((styles,index) =>
                                <animated.div style={styles} key={index*index}>
                                    <FiberManualRecordIcon className={classes.Avatar}/>
                                </animated.div>
                            )

                        }

                    </Grid>
                    {/*<Grid item style={{*/}
                    {/*    display:'flex',*/}
                    {/*    justifyContent:"center"*/}
                    {/*}}>*/}
                    {/*    <Typography variant="subtitle1">读取中</Typography>*/}
                    {/*</Grid>*/}
                </Grid>



            </Box>
        </Box>
    );
};

export default Dot_Progress;
