import {unstable_createMuiStrictModeTheme as createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#F0501F',
            light: '#FF450D',
        },
        secondary: {
            main: '#004EC2',
            light:'#087CFF',
            dark: '#293F96',
        },
        grey: {
            A100: '#2c2c2c',
            A200: '#262626',
            A400: '#212121',
            A700: '#1A1A1A',
        },
        text: {}
    },
});

export default theme;