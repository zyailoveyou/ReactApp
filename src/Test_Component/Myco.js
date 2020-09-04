import React, {useState,useContext} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {makeStyles} from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import theme from "../MyTheme/Theme";
import Grid from "@material-ui/core/Grid";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import {blue, pink} from "@material-ui/core/colors";
import {Corporation_Context} from "../Context/Corporation_Context";
import List_Component from "../Component_Category/Menu_List/List_Component";
import Myco2 from "./Myco2";
import Myco3 from "./Myco3";
import menu2 from "../Accordion_Component/Panel/menu";

// const context = React.createContext();

const Myco = (props) => {

    const context = useContext(Corporation_Context)
    return (
        <List_Component Menu = {menu2}  Accordion = {true}/>
    )
}

export default Myco;
