import {unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#FF5722'
        },
        secondary: {
            main: '#5722FF'
        },

    },
});

export default theme;