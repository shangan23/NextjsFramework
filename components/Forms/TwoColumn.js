import { Form } from 'react-final-form';
import {
  Grid,
  Button
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import FieldAutocomplete from '../Fields/FieldAutocomplete';
import FieldCheckbox from '../Fields/FieldCheckbox';
import FieldDate from '../Fields/FieldDate';
import FieldRadio from '../Fields/FieldRadio';
import FieldSelect from '../Fields/FieldSelect';
import FieldText from '../Fields/FieldText';
import FieldTextArea from '../Fields/FieldTextArea';
import FieldTime from '../Fields/FieldTime';
import FieldEmail from '../Fields/FieldEmail';
import FieldPassword from '../Fields/FieldPassword';
import FieldSwitch from '../Fields/FieldSwitch';
import FieldAutoCompleteSingle from '../Fields/FieldAutocompleteSingle';
import FieldFile from '../Fields/FieldFile';
import Breadcrumb from '../Breadcrumb';

export default function TwoColumn({ fieldsToRender, onSubmit, showBreadcrumb, buttonCancelText, buttonSubmitText, onFileUpload }) {

  const validate = values => {
    const errors = {};
    var regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    fieldsToRender.map((data, index) => {
      let name = (fieldsToRender[index]['name']).toString();
      let label = (fieldsToRender[index]['label']).toString();
      let type = (fieldsToRender[index]['type']).toString();
      let required = (fieldsToRender[index]['required']);
      switch (type) {
      case 'Autocomplete':
        if ((values[name].length == 0) && required)
          errors[name] = label + ' required';
        break;
      case 'Email':
        if ((!values[name]) && required)
          errors[name] = label + ' required';
        else {
          if (!regex.test(values[name]) && values[name])
            errors[name] = label + ' invalid';
        }
        break;
      default:
        if (!values[name] && required)
          errors[name] = label + ' required';
        break;
      }
    }
    );
    return errors;
  };

  const renderFields = (
    <Grid container spacing={2} style={{ margin: 4 }}>
      {fieldsToRender.map((data, index) => (
        <Grid item xs={6} md={6} key={index}>
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
            || (fieldsToRender[index]['type'] == 'Switch') &&
            <FieldSwitch index={index} fieldsToRender={fieldsToRender} />
            || (fieldsToRender[index]['type'] == 'AutocompleteSingle') &&
            <FieldAutoCompleteSingle index={index} fieldsToRender={fieldsToRender} />
            || (fieldsToRender[index]['type'] == 'Upload') &&
            <FieldFile index={index} fieldsToRender={fieldsToRender} onFileUpload={onFileUpload} />
          }
        </Grid>
      ))}
    </Grid>
  );

  let bcrumb;
  if (showBreadcrumb) {
    bcrumb = <Breadcrumb />;
  }

  return (
    <div>
      {bcrumb}
      <Paper elevation={1} style={{ padding: 5 }}>
        <Form
          onSubmit={onSubmit} style={{ marginTop: 16 }}
          validate={validate}
          render={({ handleSubmit, reset, submitting, pristine }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Grid container alignItems="flex-end" spacing={1}>
                {renderFields}
                <Grid container
                  direction="row"
                  justify="flex-end"
                  alignItems="flex-end"
                  item style={{ marginTop: 16 }}>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={reset}
                    disabled={submitting || pristine}
                  >
                    {buttonCancelText}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    {buttonSubmitText}
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        />
      </Paper>
    </div>
  );
}