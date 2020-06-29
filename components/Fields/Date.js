import { DatePicker } from 'mui-rff';
import DateFnsUtils from '@date-io/date-fns';

export default function FieldDate({fieldsToRender, index, source}) {
  return (<DatePicker
    required={(!source)?fieldsToRender[index]['required']:false}
    name={fieldsToRender[index]['name']}
    margin="normal"
    label={fieldsToRender[index]['label']}
    dateFunsUtils={DateFnsUtils}
  />);
}