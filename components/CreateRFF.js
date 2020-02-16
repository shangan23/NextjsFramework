//import React from 'react';
//import ReactDOM from 'react-dom';
import { Form } from 'react-final-form';
import { Autocomplete } from 'mui-rff';
import {
  TextField,
  Checkboxes,
  Radios,
  Select,
  DatePicker,
  TimePicker,
  //Autocomplete,
} from 'mui-rff';
import {
  Grid,
  Button,
  MenuItem,
} from '@material-ui/core';
// Picker
import DateFnsUtils from '@date-io/date-fns';
import { Switches } from 'mui-rff';

const onSubmit = async values => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
/*const top100Films = [
  { title: 'Memento', year: 2000 },
  { title: 'The Prestige', year: 2006 },
  { title: 'The Lion King', year: 1994 },
  { title: 'Apocalypse Now', year: 1979 },
 
];*/

//const planet = ['neptune','earth','mars'];
const planet = [{'id':1,value:'Neptune'},{'id':2,value:'Mars'},{'id':3,value:'Pluto'}];

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.best) {
    errors.best = 'Required';
  }
  if (values.planet.length <= 0) {
    errors.planet = 'Required';
  }

  return errors;
};

const SwitchData = [
  { label: 'Item 1', value: 'item1' },
  { label: 'Item 2', value: 'item2' }
];

const formFields = [
  {
    size: 6,
    field: (
      <TextField
        label="First Name"
        name="firstName"
        margin="none"
        required={true}
      />
    ),
  },
  {
    size: 6,
    field: (
      <TextField
        label="Last Name"
        name="lastName"
        margin="none"
        required={true}
      />
    ),
  },
  {
    size: 12,
    field: (
      <TextField
        type="email"
        label="Email"
        name="email"
        margin="none"
        required={true}
      />
    ),
  },
  {
    size: 12,
    field: (
      <Checkboxes
        name="employed"
        formControlProps={{ margin: 'none' }}
        data={{ label: 'Employed', value: true }}
      />
    ),
  },
  {
    size: 12,
    field: (
      <Radios
        label="Best Stooge"
        name="stooge"
        formControlProps={{ margin: 'none' }}
        radioGroupProps={{ row: true }}
        data={[
          { label: 'Larry', value: 'larry' },
          { label: 'Moe', value: 'moe' },
          { label: 'Curly', value: 'curly' },
        ]}
      />
    ),
  },
  {
    size: 12,
    field: (
      <Checkboxes
        label="Sauces"
        name="sauces"
        formControlProps={{ margin: 'none' }}
        formGroupProps={{ row: true }}
        data={[
          { label: 'Ketchup', value: 'ketchup' },
          { label: 'Mustard', value: 'mustard' },
          { label: 'Salsa', value: 'salsa' },
          { label: 'Guacamole 🥑', value: 'guacamole' },
        ]}
      />
    ),
  },
  {
    size: 12,
    field: <TextField name="notes" multiline label="Notes" margin="none" />,
  },
  {
    size: 12,
    field: (
      <Select
        name="city"
        label="Select a City"
        formControlProps={{ margin: 'none' }}
      >
        <MenuItem value="London">London</MenuItem>
        <MenuItem value="Paris">Paris</MenuItem>
        <MenuItem value="Budapest">A city with a very long Name</MenuItem>
      </Select>
    ),
  },
  {
    size: 6,
    field: (
      <DatePicker
        name="rendez-vous"
        margin="normal"
        label="Rendez-vous"
        dateFunsUtils={DateFnsUtils}
      />
    ),
  },
  {
    size: 6,
    field: (
      <TimePicker
        name="alarm"
        margin="normal"
        label="Alarm"
        dateFunsUtils={DateFnsUtils}
      />
    ),
  },
  {
    size: 6,
    field: (<Switches
      label="Check at least one..."
      name="best"
      required={true}
      data={SwitchData}
    />),
  },
  {
    size: 6,
    field: (<Autocomplete
      required={true}
      label="Pick at least one planet"
      options={planet}
      getOptionValue={option => option.id}
      getOptionLabel={option => option.value}
      name="planet"
      multiple
    />),
  }
];

function CreateLayout() {
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{ employed: true, stooge: 'larry',planet }}
      validate={validate}
      render={({ handleSubmit, reset, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Grid container alignItems="flex-start" spacing={2}>
            {formFields.map((item, idx) => (
              <Grid item xs={item.size} key={idx}>
                {item.field}
              </Grid>
            ))}
            <Grid item style={{ marginTop: 16 }}>
              <Button
                type="button"
                variant="contained"
                onClick={reset}
                disabled={submitting || pristine}
              >
                Reset
              </Button>
            </Grid>
            <Grid item style={{ marginTop: 16 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={submitting}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
          <pre>{JSON.stringify(values, 0, 2)}</pre>
        </form>
      )}
    />
  );
}

export default CreateLayout;