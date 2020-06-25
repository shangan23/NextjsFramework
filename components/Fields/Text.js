import { TextField } from 'mui-rff';

export default function FieldText({fieldsToRender, index}) {
  return (<TextField
    label={fieldsToRender[index]['label']}
    size="small"
    id={fieldsToRender[index]['id']}
    name={fieldsToRender[index]['name']}
    required={fieldsToRender[index]['required']}
  />);
}