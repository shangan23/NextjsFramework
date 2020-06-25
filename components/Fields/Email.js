import { TextField } from 'mui-rff';

export default function FieldEmail({fieldsToRender, index}) {
  return (<TextField
    label={fieldsToRender[index]['label']}
    type="email"
    name={fieldsToRender[index]['name']}
    margin="none"
    size="small"
    required={fieldsToRender[index]['required']}
  />);
}