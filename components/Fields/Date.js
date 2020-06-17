import { DatePicker } from 'mui-rff';
import DateFnsUtils from '@date-io/date-fns';

export default function FieldDate({fieldsToRender, index}) {
  return (<DatePicker
    required={fieldsToRender[index]['required']}
    name={fieldsToRender[index]['name']}
    margin="normal"
    label={fieldsToRender[index]['label']}
    dateFunsUtils={DateFnsUtils}
  />);
}