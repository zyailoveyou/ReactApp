import React from 'react';
import {Alert, AlertTitle} from '@material-ui/lab';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const Alert_Component = (props) => {

    const [open, setOpen] = React.useState(true);
    return (
        <Collapse in={open}>
            <Alert
                severity={props.severity}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        <CloseIcon fontSize="inherit"/>
                    </IconButton>
                }
            >
                {props.content}
            </Alert>
        </Collapse>
    );
};

export default Alert_Component;
