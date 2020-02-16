import { Form } from 'react-final-form';
import FieldAutocomplete from './Fields/FieldAutocomplete';
import FieldCheckbox from './Fields/FieldCheckbox';
import FieldDate from './Fields/FieldDate';
import FieldRadio from './Fields/FieldRadio';
import FieldSelect from './Fields/FieldSelect';
import FieldText from './Fields/FieldText';
import FieldTextArea from './Fields/FieldTextArea';
import FieldTime from './Fields/FieldTime';
import FieldEmail from './Fields/FieldEmail';
import FieldPassword from './Fields/FieldPassword';
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

/*const SwitchData = [
  { label: 'Item 1', value: 'item1' },
  { label: 'Item 2', value: 'item2' }
];*/

const fieldsToRender = [
  {
    'type': 'Text',
    'required': true,
    'id': 'standard',
    'label': 'First Name',
    'name': 'firstName'
  },
  {
    'type': 'Email',
    'required': true,
    'id': 'standard',
    'name': 'email',
    'label': 'Email'
  },
  {
    'type': 'Password',
    'required': true,
    'id': 'standard',
    'name': 'password',
    'label': 'Password'
  },
  {
    'type': 'Autocomplete',
    'required': true,
    'id': 'standard',
    'label': 'User Details',
    'name': 'planet',
    'data': planet
  },
  {
    'type': 'Date',
    'required': true,
    'id': 'standard',
    'name': 'dob',
    'label': 'Date Of Birth'
  },
  {
    'type': 'Radio',
    'required': true,
    'id': 'gender',
    'name': 'gender',
    'label': 'Gender',
    'data': [
      { label: 'Male', value: 'M' },
      { label: 'Female', value: 'F' },
      { label: 'Other', value: 'O' },
    ]
  },
  {
    'type': 'Select',
    'required': true,
    'id': 'role',
    'name': 'role',
    'label': 'Role',
    'data': [
      { id: 'CallcenterHead', value: 'Callcenter Head' },
      { id: 'MarkettingHead', value: 'Marketting Head' },
      { id: 'SalesHead', value: 'Sales Head' }
    ]
  },
  /*{
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
  }*/
];

const validate = values => {
  const errors = {};
  fieldsToRender.map((data, index) => {
    let name = (fieldsToRender[index]['name']).toString();
    let type = (fieldsToRender[index]['type']).toString();
    switch (type) {
    case 'Autocomplete':
      if (values[name].length == 0)
        errors[name] = 'Required';
      break;
    default:
      if (!values[name])
        errors[name] = 'Required';
      break;
    }
  }
  );
  return errors;
};

const renderFields = (
  <Grid container spacing={2}>
    {fieldsToRender.map((data, index) => (
      <Grid item xs={12} md={4} key={index}>
        {(fieldsToRender[index]['type'] == 'Text') &&
          <FieldText index={index} fieldsToRender={fieldsToRender} />
          || (fieldsToRender[index]['type'] == 'Date') &&
          <FieldDate index={index} fieldsToRender={fieldsToRender} />
          || (fieldsToRender[index]['type'] == 'Select') &&
          <FieldSelect index={index} fieldsToRender={fieldsToRender} />
          || (fieldsToRender[index]['type'] == 'Checkbox') &&
          <FieldCheckbox index={index} fieldsToRender={fieldsToRender} />
          || (fieldsToRender[index]['type'] == 'Time') &&
          <FieldTime index={index} fieldsToRender={fieldsToRender} />
          || (fieldsToRender[index]['type'] == 'TextArea') &&
          <FieldTextArea index={index} fieldsToRender={fieldsToRender} />
          || (fieldsToRender[index]['type'] == 'Radio') &&
          <FieldRadio index={index} fieldsToRender={fieldsToRender} />
          || (fieldsToRender[index]['type'] == 'Autocomplete') &&
          <FieldAutocomplete index={index} fieldsToRender={fieldsToRender} />
          || (fieldsToRender[index]['type'] == 'Email') &&
          <FieldEmail index={index} fieldsToRender={fieldsToRender} />
          || (fieldsToRender[index]['type'] == 'Password') &&
          <FieldPassword index={index} fieldsToRender={fieldsToRender} />
        }
      </Grid>
    ))}
  </Grid>
);

function CreateLayout() {
  return (
    <Form
      onSubmit={onSubmit} style={{ marginTop: 16 }}
      initialValues={{ planet: [] }}
      validate={validate}
      render={({ handleSubmit, reset, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Grid container alignItems="flex-start" spacing={2} style={{ margin: 4 }}>
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