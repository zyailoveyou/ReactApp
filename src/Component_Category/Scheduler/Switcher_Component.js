import {ViewSwitcher} from "@devexpress/dx-react-scheduler-material-ui";
import React from "react";

const Switcher_Component = (props) => {
    return (
        (
            <ViewSwitcher.Switcher
                {...props}
                variant="filled"
                color="primary"
                style={{
                    outline: "none",
                }}
            >
            </ViewSwitcher.Switcher>
        )
    )
}

export default Switcher_Component