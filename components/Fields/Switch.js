import { Switches } from 'mui-rff';

export default function FieldSwitch({ fieldsToRender, index }) {
  return (<Switches
    label={fieldsToRender[index]['label']}
    name={fieldsToRender[index]['name']}
    required={fieldsToRender[index]['required']}
    data={fieldsToRender[index]['data']}
  />);
}