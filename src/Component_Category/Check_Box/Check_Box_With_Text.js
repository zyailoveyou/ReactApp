import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import theme from "../../MyTheme/Theme";
import Box from "@material-ui/core/Box";


const useStyles = makeStyles({

    helper_text: {
        color: theme.palette.grey["500"],
        fontSize: '0.75rem',
        marginLeft: (props => {
                let len = 0;
                for (let i = 0; i < props.Title.length; i++) {
                    let a = props.Title.charAt(i);
                    if (a.match(/[^\x00-\xff]/ig) != null) {
                        len += 1;
                    } else {
                        len += 0.5;
                    }
                }
                return len + 1 + 'rem'
            }
        )
    },

    box_Container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: props => {
            return props.Padding
        }
    },
    box_Title: {},
    box_Textfield: {
        flex: 1
    },

    root_checkBox: {
        // marginLeft: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        // marginRight:0,
        '&$checked': {
            color: theme.palette.success.main,
        },

    },

    checked: {},
});

const Check_Box_With_Text = (props) => {

    const classes = useStyles(props);
    const [checked, setChecked] = React.useState(false);
    const onHandleChange = (e) => {
        setChecked(e.target.checked);
    }

    useEffect(() => {
        props.Data_Set_Function(props.Data_Set_Name, checked);
    }, [checked])

    const onLinkClicked = (e) => {
        e.preventDefault();
        console.log('Link clicked');
        const win = window.open('https://www.baidu.com/', '_blank');
        win.focus();
    }

    return (
        <Box className={classes.box_Container}>
            <Checkbox
                color={"secondary"}
                classes={{
                    root: classes.root_checkBox,
                    checked:classes.checked
                }}
                checked={checked}
                onChange={(e) => onHandleChange(e)}
            />
            <Typography>请认真阅读</Typography>
            <Link href='#' onClick={(e) => onLinkClicked(e)} style={{color: theme.palette.primary.light}}>此协议</Link>
        </Box>
    );
};

export default Check_Box_With_Text;
