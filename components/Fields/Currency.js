import { TextField } from 'mui-rff';

export default function FieldCurrency({fieldsToRender, index, source}) {
  return (<TextField
    label={fieldsToRender[index]['label']}
    type="currency"
    name={fieldsToRender[index]['name']}
    margin="none"
    size="small"
    required={(!source)?fieldsToRender[index]['required']:false}
    //variant={(source)?"outlined":"standard"}
  />);
}