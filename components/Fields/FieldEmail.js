import { TextField } from 'mui-rff';

export default function FieldEmail({fieldsToRender, index}) {
  return (<TextField
    label={fieldsToRender[index]['label']}
    type="email"
    name={fieldsToRender[index]['name']}
    margin="none"
    required={fieldsToRender[index]['required']}
    value={fieldsToRender[index]['value']}
  />);
}