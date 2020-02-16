import { TextField } from 'mui-rff';

export default function FieldText({fieldsToRender, index}) {
  return (<TextField
    type="password"
    label={fieldsToRender[index]['label']}
    name={fieldsToRender[index]['name']}
    margin="none"
    required={fieldsToRender[index]['required']}
  />);
}