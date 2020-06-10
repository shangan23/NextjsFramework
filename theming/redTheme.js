import { createMuiTheme } from '@material-ui/core/styles';
import { purple,green } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    //type: 'dark',
    background: {
      default: '#f7f7f7',
    },
    /*primary: {
      main: '#ffff'
    },*/
    primary:purple,
    secondary: green,
  },
});

export default theme;