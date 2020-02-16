import { Radios } from 'mui-rff';

export default function FieldRadio({fieldsToRender, index}) {
  return (<Radios
    label={fieldsToRender[index]['label']}
    name={fieldsToRender[index]['name']}
    required={fieldsToRender[index]['required']}
    formControlProps={{ margin: 'none' }}
    radioGroupProps={{ row: true }}
    data={fieldsToRender[index]['data']}
  />);
}