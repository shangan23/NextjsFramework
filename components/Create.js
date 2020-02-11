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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';

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

  const fieldsToRender = [
    {
      'Type': 'Text',
      'required': true,
      'id': 'standard',
      'label': 'first name'
    },
    {
      'Type': 'Date',
      'required': true,
      'id': 'standard',
      'label': 'first name'
    },
    {
      'Type': 'Select',
      'required': true,
      'id': 'standard',
      'label': 'first name'
    },
    {
      'Type': 'Text',
      'required': true,
      'id': 'standard',
      'label': 'first name'
    },
    {
      'Type': 'Date',
      'required': true,
      'id': 'standard',
      'label': 'first name'
    },
    {
      'Type': 'Select',
      'required': true,
      'id': 'standard',
      'label': 'first name'
    },
    {
      'Type': 'Text',
      'required': true,
      'id': 'standard',
      'label': 'first name'
    },
    {
      'Type': 'Date',
      'required': true,
      'id': 'standard',
      'label': 'first name'
    },
    {
      'Type': 'Select',
      'required': true,
      'id': 'standard',
      'label': 'first name'
    },
    {
      'Type': 'Text',
      'required': true,
      'id': 'standard',
      'label': 'first name'
    },
    {
      'Type': 'Date',
      'required': true,
      'id': 'standard',
      'label': 'first name'
    },
    {
      'Type': 'Select',
      'required': true,
      'id': 'standard',
      'label': 'first name'
    }
  ];

  const renderFields = (
    <Grid container spacing={3}>
      {fieldsToRender.map((data, index) => (
        <Grid item xs={12} md={4}>
          {(fieldsToRender[index]['Type'] == 'Text') &&
            <TextField
              required={fieldsToRender[index]['required']}
              id={fieldsToRender[index]['id']}
              label={fieldsToRender[index]['label']}
              style={{ margin: 8 }}
              fullWidth
            />
            || (fieldsToRender[index]['Type'] == 'Date') &&
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                style={{ margin: 8 }}
                margin="normal"
                id="date-picker-inline"
                fullWidth
                //helperText="e.g. 05/23/1992"
                label="Date of Birth"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
            || (fieldsToRender[index]['Type'] == 'Select') &&
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel id="demo-simple-select-helper-label" >Industry</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Textile</MenuItem>
                <MenuItem value={20}>Service</MenuItem>
                <MenuItem value={30}>Manufacturing</MenuItem>
              </Select>
              <FormHelperText>e.g. Manufacturing</FormHelperText>
            </FormControl>
          }
        </Grid>
      ))}
    </Grid>
  );

  return (
    <div className={classes.root}>
      <Grid container justify="space-around">
        {renderFields}
      </Grid>
      <Grid container justify="space-around">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Cancel
        </Button>
      </Grid>
    </div>
  );
}