import React from 'react';
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Button from "@material-ui/core/Button";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    label_focused: {},
    label: {},
    Dialog: {
        borderRadius: '1rem !important',
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
})

const Input_Captcha_Component = () => {
    const classes = useStyles()

    return (

        <TextField
            label={'请输入验证码'}
            fullWidth
            InputProps={{
                classes: {
                    underline: classes.input_underline
                },
                startAdornment: (
                    <InputAdornment position="start">
                        <VpnKeyIcon color={"primary"}/>
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position={'end'}>
                        <Button
                            variant={"outlined"}
                            size={"small"}
                            color={"secondary"}
                            className={classes.Button}
                        >
                            获取验证码
                        </Button>
                    </InputAdornment>
                ),
                // inputRef:Confirm_Ref
            }}
            inputProps={{
                className: classes.Input_Text
            }
            }
            // onChange={e =>checkConfirm(e.target.value)}
            // onBlur={e =>checkConfirm(e.target.value)}
            // helperText={function () {
            //     switch (confirmState) {
            //         case -1:
            //             return null
            //         case 0:
            //             return null
            //         case 1:
            //             return '验证码不能为空'
            //     }
            // }()}
            // error={function () {
            //     if (confirmState === 0||confirmState===-1){
            //         return false
            //     }
            //     else{
            //         return true
            //     }
            //
            // }()}
        >
        </TextField>

    );
};

export default Input_Captcha_Component;
