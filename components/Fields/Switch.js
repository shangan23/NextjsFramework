import { Switches } from 'mui-rff';

export default function FieldSwitch({ fieldsToRender, index,source }) {
  return (<Switches
    label={fieldsToRender[index]['label']}
    name={fieldsToRender[index]['name']}
    required={(!source)?fieldsToRender[index]['required']:false}
    //variant={(source)?"outlined":"standard"}
    data={fieldsToRender[index]['data']}
  />);
}