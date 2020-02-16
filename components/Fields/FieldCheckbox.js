import { Checkboxes } from 'mui-rff';

export default function FieldCheckbox({ fieldsToRender, index }) {
  return (<Checkboxes
    label={fieldsToRender[index]['label']}
    name={fieldsToRender[index]['name']}
    required={fieldsToRender[index]['required']}
    formControlProps={{ margin: 'none' }}
    data={fieldsToRender[index]['data']}
  />);
}