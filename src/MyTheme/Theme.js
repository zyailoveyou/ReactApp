import {unstable_createMuiStrictModeTheme as createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#F0501F',
        },
        secondary: {
            main: '#004EC2',
            dark: '#293F96',
        },
        grey: {
            A100: '#2c2c2c'
        },
        text: {}
    },
});

export default theme;