import { Form } from 'react-final-form';
import FieldAutocomplete from './Fields/FieldAutocomplete';
import FieldCheckbox from './Fields/FieldCheckbox';
import FieldDate from './Fields/FieldDate';
import FieldRadio from './Fields/FieldRadio';
import FieldSelect from './Fields/FieldSelect';
import FieldText from './Fields/FieldText';
import FieldTextArea from './Fields/FieldTextArea';
import FieldTime from './Fields/FieldTime';
import {
  Grid,
  Button,
} from '@material-ui/core';

const onSubmit = async values => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const planet = [{ 'id': 1, value: 'Neptune' }, { 'id': 2, value: 'Mars' }, { 'id': 3, value: 'Pluto' }];

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

const fieldsToRender = [
  {
    'Type': 'Text',
    'required': true,
    'id': 'standard',
    'label': 'First Name'
  },
  {
    'Type': 'Autocomplete',
    'required': true,
    'id': 'standard',
    'label': 'First Name',
    'name': 'planet',
    'data': planet
  },
  {
    'Type': 'Date',
    'required': true,
    'id': 'standard',
    'label': 'First Name'
  },
  {
    'Type': 'Radio',
    'required': true,
    'id': 'standard',
    'label': 'First Name'
  },
  {
    'Type': 'Select',
    'required': true,
    'id': 'standard',
    'label': 'first name'
  },
  {
    'Type': 'Switch',
    'required': true,
    'id': 'standard',
    'label': 'first name',
    'data': SwitchData
  },
  {
    'Type': 'TextArea',
    'required': true,
    'id': 'standard',
    'label': 'first name'
  },
  {
    'Type': 'Time',
    'required': true,
    'id': 'standard',
    'label': 'first name'
  },
  {
    'Type': 'Checkbox',
    'required': true,
    'id': 'standard',
    'label': 'first name'
  }
];


const renderFields = (
  <Grid container spacing={2}>
    {fieldsToRender.map((data, index) => (
      <Grid item xs={12} md={4} key={index}>
        {(fieldsToRender[index]['Type'] == 'Text') &&
          <FieldText index={index} fieldsToRender={fieldsToRender} />
          || (fieldsToRender[index]['Type'] == 'Date') &&
          <FieldDate index={index} fieldsToRender={fieldsToRender} />
          || (fieldsToRender[index]['Type'] == 'Select') &&
          <FieldSelect index={index} fieldsToRender={fieldsToRender} />
          || (fieldsToRender[index]['Type'] == 'Checkbox') &&
          <FieldCheckbox index={index} fieldsToRender={fieldsToRender} />
          || (fieldsToRender[index]['Type'] == 'Time') &&
          <FieldTime index={index} fieldsToRender={fieldsToRender} />
          || (fieldsToRender[index]['Type'] == 'TextArea') &&
          <FieldTextArea index={index} fieldsToRender={fieldsToRender} />
          || (fieldsToRender[index]['Type'] == 'Radio') &&
          <FieldRadio index={index} fieldsToRender={fieldsToRender} />
          || (fieldsToRender[index]['Type'] == 'Autocomplete') &&
          <FieldAutocomplete index={index} fieldsToRender={fieldsToRender} />
        }
      </Grid>
    ))}
  </Grid>
);

function CreateLayout() {
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{ employed: true, stooge: 'larry', planet }}
      validate={validate}
      render={({ handleSubmit, reset, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Grid container alignItems="flex-start" spacing={2}>
            {renderFields}
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