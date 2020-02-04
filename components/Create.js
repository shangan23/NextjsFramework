import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function CreateLayout() {
  const classes = useStyles();
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState();

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <div className={classes.root}>
      <Grid container justify="space-around">
        <TextField
          id="standard-full-width"
          label="First Name"
          style={{ margin: 8 }}
          placeholder="Your First Name"
          helperText="e.g. Shankar"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="standard-full-width"
          label="Middle Name"
          style={{ margin: 8 }}
          placeholder="Your Middle Name"
          helperText="e.g. Ganesh"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="standard-full-width"
          label="Last Name"
          style={{ margin: 8 }}
          placeholder="Your Last Name"
          helperText="e.g. Jayaraman"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            style={{ margin: 8 }}
            margin="normal"
            id="date-picker-inline"
            helperText="e.g. 05/23/1992"
            label="Date of Birth"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </Grid>
    </div>
  );
}