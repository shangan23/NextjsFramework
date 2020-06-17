import { TextField } from 'mui-rff';

export default function FieldText({fieldsToRender, index}) {
  return (<TextField
    type="password"
    label={fieldsToRender[index]['label']}
    name={fieldsToRender[index]['name']}
    id={fieldsToRender[index]['id']}
    margin="none"
    required={fieldsToRender[index]['required']}
  />);
}