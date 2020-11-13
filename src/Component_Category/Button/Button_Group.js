import React from "react";
import Button_Component from "./Button_Component";
import {Grid} from "@material-ui/core";

const Button_Group = (props) => {
    return (
        <Grid container spacing={1} direction="row">
            <Grid item>
                <Button_Component Class='Login_Button' Name='登录' OnClick={props.OnClickLogin}/>
            </Grid>
            <Grid item>
                <Button_Component Class='Register_Button' Name='注册' OnClick={props.OnClickRegister}/>
            </Grid>
        </Grid>
    );
}
export default Button_Group;
