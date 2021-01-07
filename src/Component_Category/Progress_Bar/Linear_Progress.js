import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from "@material-ui/core/Box";

const Linear_Progress = () => {
    return (
        <Box>
            <LinearProgress color="primary" style={{
                position: "absolute",
                top: 0,
                left: 0,
            }}/>
        </Box>
    );
};

export default Linear_Progress;
