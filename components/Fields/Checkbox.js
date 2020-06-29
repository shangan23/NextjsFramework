import { Checkboxes } from 'mui-rff';

export default function FieldCheckbox({ fieldsToRender, index, source }) {
  return (<Checkboxes
    label={fieldsToRender[index]['label']}
    name={fieldsToRender[index]['name']}
    size="small"
    required={(!source)?fieldsToRender[index]['required']:false}
    //variant={(source)?"outlined":"standard"}
    formControlProps={{ margin: 'none' }}
    data={fieldsToRender[index]['data']}
  />);
}