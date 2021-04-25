import React from 'react';
import Box from "@material-ui/core/Box";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';


const useStyles = makeStyles({
    Dialog: {
        borderRadius: '1rem !important',
        overflow: 'hidden !important',
    },
    Dialog_Content: {
        overflow: "hidden !important",
    },
    Button: {
        outline: "none !important",
        borderRadius: '2rem'
    },
    Input_Text: {
        fontSize: '1.4rem',
    },
    Step_Content: {
        overflow: "hidden",
        // position:"relative"
    },
})

const Menu_For_Vacation = () => {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);


    const options = [
        'Show some love to Material-UI',
        'Show all notification content',
        'Hide sensitive notification content',
        'Hide all notification content',
    ];

    const handleClickListItem = (event) => {
        console.log(event.currentTarget)
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        console.log(index)
        console.log(event.target.id)
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <Box>
            <List component="nav" aria-label="Device settings">
                <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls="lock-menu"
                    aria-label="when device is locked"
                    onClick={handleClickListItem}
                >
                    <ListItemText primary="When device is locked" secondary={options[selectedIndex]} />
                </ListItem>
            </List>
            <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={option}
                        id={123+index}
                        disabled={index === 0}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                        value = {option}
                    >
                        <ListItemIcon>
                            <SendIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={option}/>
                    </MenuItem>
                ))}
            </Menu>

        </Box>
    );
};

export default Menu_For_Vacation;
