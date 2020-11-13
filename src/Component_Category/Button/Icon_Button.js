import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import {Box} from "@material-ui/core";

const Icon_Button = (props) => {
    return (
        <Box>
            <IconButton>
                {props.Icon}
            </IconButton>
        </Box>
    );
};

export default Icon_Button;
