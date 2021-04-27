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
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import theme from "../../MyTheme/Theme";


const useStyles = makeStyles({

    Icon: {
        minWidth:0,
        marginRight:5,

    },

    MenuList:{
        paddingBottom:0,
        paddingTop:0,
    }
})

const Menu_For_Vacation = () => {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);




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
        <Box style={{
            width:'100%'

        }}>{
            function () {
                switch (selectedIndex) {
                    case 0 :
                        return (
                            <Button
                                onClick={handleClickListItem}
                                color="primary"
                                variant="contained"
                                size={"medium"}

                                style={{
                                    background:theme.palette.error.main,
                                    color:theme.palette.primary.contrastText
                                }}
                            >拒绝
                            </Button>
                        )
                    case 1:
                        return (
                            <Button
                                onClick={handleClickListItem}
                                color="primary"
                                variant="contained"
                                size={"medium"}

                                style={{
                                    background:theme.palette.success.main,
                                    color:theme.palette.primary.contrastText
                                }}
                            >同意
                            </Button>
                        )

                }
            }()
        }

            <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                classes={{
                    list:classes.MenuList
                }}
            >
                    <MenuItem
                        selected={1 === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, 1)}
                        value = {'同意'}
                        style={{
                            background:theme.palette.success.main,

                        }}
                    >
                        <ListItemText primary={'同意'} style={{
                            color:theme.palette.primary.contrastText,
                        }}/>
                    </MenuItem>
                <MenuItem
                    selected={0 === selectedIndex}
                    onClick={(event) => handleMenuItemClick(event, 0)}
                    value = {'拒绝'}
                    style={{
                        background:theme.palette.error.main
                    }}
                >
                    <ListItemText primary={'拒绝'} style={{
                        color:theme.palette.primary.contrastText,
                    }}/>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default Menu_For_Vacation;
