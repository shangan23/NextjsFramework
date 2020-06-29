import { TextField } from 'mui-rff';

export default function FieldText({fieldsToRender, index, source}) {
  return (<TextField
    label={fieldsToRender[index]['label']}
    size="small"
    dense
    id={fieldsToRender[index]['id']}
    name={fieldsToRender[index]['name']}
    required={(!source)?fieldsToRender[index]['required']:false}
    //variant={(source)?"outlined":"standard"}
  />);
}