import { Radios } from 'mui-rff';

export default function FieldRadio({fieldsToRender, index, source}) {
  return (<Radios
    label={fieldsToRender[index]['label']}
    name={fieldsToRender[index]['name']}
    required={(!source)?fieldsToRender[index]['required']:false}
    //variant={(source)?"outlined":"standard"}
    formControlProps={{ margin: 'none' }}
    radioGroupProps={{ row: true }}
    data={fieldsToRender[index]['data']}
  />);
}