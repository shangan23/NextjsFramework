import { TimePicker } from 'mui-rff';
import DateFnsUtils from '@date-io/date-fns';

export default function FieldDate({ fieldsToRender, index,source}) {
  return (<TimePicker
    label={fieldsToRender[index]['label']}
    name={fieldsToRender[index]['name']}
    required={(!source)?fieldsToRender[index]['required']:false}
    //variant={(source)?"outlined":"standard"}
    dateFunsUtils={DateFnsUtils}
  />);
}