import { Form } from 'react-final-form';
import {
  Grid, Button
} from '@material-ui/core';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Autocomplete from '../Fields/Autocomplete';
import Checkbox from '../Fields/Checkbox';
import Date from '../Fields/Date';
import Radio from '../Fields/Radio';
import Select from '../Fields/Select';
import Text from '../Fields/Text';
import TextArea from '../Fields/TextArea';
import Time from '../Fields/Time';
import Email from '../Fields/Email';
import Password from '../Fields/Password';
import Switch from '../Fields/Switch';
import AutoCompleteSingle from '../Fields/AutocompleteSingle';
import File from '../Fields/File';
import Lookup from '../Fields/Lookup';

export default function DynamicForm({ fieldsToRender, onSubmit, buttonCancelText, buttonSubmitText, onFileUpload, defaultValue }) {
  const [submittedValues, setSubmittedValues] = React.useState(undefined);

  const onSubmitForm = (values) => {
    setSubmittedValues(values);
    onSubmit(values);
  };

  const validate = values => {
    const errors = {};
    var regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    fieldsToRender.map((data, index) => {
      if (fieldsToRender[index]['type']) {
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
    }
    );
    return errors;
  };

  const renderFields = (
    <Grid container spacing={2} style={{ margin: 4 }} key={`grid-form${Math.random()}`}>
      {fieldsToRender.map((data, index) => (
        <React.Fragment key={`layout-frag${Math.random()}`}>
          {(fieldsToRender[index]['type'] == 'Text' && !fieldsToRender[index]['options']['display']) &&
            <Grid item xs={6} md={6} key={index}>
              <Text index={index} fieldsToRender={fieldsToRender} />
            </Grid>
            || (fieldsToRender[index]['type'] == 'Date' && !fieldsToRender[index]['options']['display']) &&
            <Grid item xs={6} md={6} key={index}>
              <Date index={index} fieldsToRender={fieldsToRender} />
            </Grid>
            || (fieldsToRender[index]['type'] == 'Select' && !fieldsToRender[index]['options']['display']) &&
            <Grid item xs={6} md={6} key={index}>
              <Select index={index} fieldsToRender={fieldsToRender} />
            </Grid>
            || (fieldsToRender[index]['type'] == 'Checkbox' && !fieldsToRender[index]['options']['display']) &&
            <Grid item xs={6} md={6} key={index}>
              <Checkbox index={index} fieldsToRender={fieldsToRender} />
            </Grid>
            || (fieldsToRender[index]['type'] == 'Time' && !fieldsToRender[index]['options']['display']) &&
            <Grid item xs={6} md={6} key={index}>
              <Time index={index} fieldsToRender={fieldsToRender} />
            </Grid>
            || (fieldsToRender[index]['type'] == 'TextArea' && !fieldsToRender[index]['options']['display']) &&
            <Grid item xs={6} md={6} key={index}>
              <TextArea index={index} fieldsToRender={fieldsToRender} />
            </Grid>
            || (fieldsToRender[index]['type'] == 'Radio' && !fieldsToRender[index]['options']['display']) &&
            <Grid item xs={6} md={6} key={index}>
              <Radio index={index} fieldsToRender={fieldsToRender} />
            </Grid>
            || (fieldsToRender[index]['type'] == 'Autocomplete' && !fieldsToRender[index]['options']['display']) &&
            <Grid item xs={6} md={6} key={index}>
              <Autocomplete index={index} fieldsToRender={fieldsToRender} />
            </Grid>
            || (fieldsToRender[index]['type'] == 'Email' && !fieldsToRender[index]['options']['display']) &&
            <Grid item xs={6} md={6} key={index}>
              <Email index={index} fieldsToRender={fieldsToRender} />
            </Grid>
            || (fieldsToRender[index]['type'] == 'Password' && !fieldsToRender[index]['options']['display']) &&
            <Grid item xs={6} md={6} key={index}>
              <Password index={index} fieldsToRender={fieldsToRender} />
            </Grid>
            || (fieldsToRender[index]['type'] == 'Switch' && !fieldsToRender[index]['options']['display']) &&
            <Grid item xs={6} md={6} key={index}>
              <Switch index={index} fieldsToRender={fieldsToRender} />
            </Grid>
            || (fieldsToRender[index]['type'] == 'AutocompleteSingle' && !fieldsToRender[index]['options']['display']) &&
            <Grid item xs={6} md={6} key={index}>
              <AutoCompleteSingle index={index} fieldsToRender={fieldsToRender} />
            </Grid>
            || (fieldsToRender[index]['type'] == 'Upload' && !fieldsToRender[index]['options']['display']) &&
            <Grid item xs={6} md={6} key={index}>
              <File index={index} fieldsToRender={fieldsToRender} onFileUpload={onFileUpload} />
            </Grid>
            || (fieldsToRender[index]['type'] == 'Lookup' && !fieldsToRender[index]['options']['display']) &&
            <Grid item xs={6} md={6} key={index}>
              <Lookup index={index} fieldsToRender={fieldsToRender} />
            </Grid>
          }
        </React.Fragment>
      ))}
    </Grid>
  );

  return (
    <div>
      <Paper elevation={1} style={{ padding: 5 }}>
        <Form
          onSubmit={onSubmitForm} style={{ marginTop: 16 }}
          initialValues={submittedValues ? submittedValues : defaultValue}
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
                    size="small"
                    variant="contained"
                    onClick={reset}
                    disabled={submitting || pristine}
                  >
                    {buttonCancelText}
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
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