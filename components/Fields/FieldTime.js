import { TimePicker } from 'mui-rff';
import DateFnsUtils from '@date-io/date-fns';

export default function FieldDate({ fieldsToRender, index }) {
  return (<TimePicker
    label={fieldsToRender[index]['label']}
    name={fieldsToRender[index]['name']}
    required={fieldsToRender[index]['required']}
    dateFunsUtils={DateFnsUtils}
  />);
}