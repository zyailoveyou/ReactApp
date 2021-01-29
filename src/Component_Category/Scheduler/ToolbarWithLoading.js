import React, {createContext, useContext} from "react";
import Box from "@material-ui/core/Box";
import {Toolbar} from "@devexpress/dx-react-scheduler-material-ui";
import LinearProgress from "@material-ui/core/LinearProgress";
import Scheduler_Context from "../../Context/Context_Info/Scheduler_Context";

const ToolbarWithLoading = (props) => {
    // const testcontext = createContext()
     const Scheduler_Context= useContext(Scheduler_Context)
    console.log(Scheduler_Context)
    return (
        <Box>
            <LinearProgress/>
        </Box>
    )
}

export default ToolbarWithLoading