import { TextField } from 'mui-rff';

export default function FieldText({fieldsToRender, index, source}) {
  return (<TextField
    type="password"
    label={fieldsToRender[index]['label']}
    name={fieldsToRender[index]['name']}
    id={fieldsToRender[index]['id']}
    margin="none"
    required={(!source)?fieldsToRender[index]['required']:false}
    //variant={(source)?"outlined":"standard"}
  />);
}