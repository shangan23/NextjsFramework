import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    background: {
      default: '#f7f7f7',
    },
    primary: {
      main: '#ff0000'
    }
  },
});

export default theme;