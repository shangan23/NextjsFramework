import { TextField } from 'mui-rff';

export default function FieldText({fieldsToRender, index}) {
  return (<TextField
    label={fieldsToRender[index]['label']}
    id={fieldsToRender[index]['id']}
    name={fieldsToRender[index]['name']}
    margin="none"
    required={fieldsToRender[index]['required']}
  />);
}