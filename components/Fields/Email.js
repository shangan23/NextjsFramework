import { TextField } from 'mui-rff';

export default function FieldEmail({fieldsToRender, index, source}) {
  return (<TextField
    label={fieldsToRender[index]['label']}
    type="email"
    name={fieldsToRender[index]['name']}
    margin="none"
    size="small"
    required={(!source)?fieldsToRender[index]['required']:false}
    //variant={(source)?"outlined":"standard"}
  />);
}