import { TimePicker } from 'mui-rff';
import DateFnsUtils from '@date-io/date-fns';

export default function FieldDate() {
  return (<TimePicker
    name="alarm"
    margin="normal"
    label="Alarm"
    dateFunsUtils={DateFnsUtils}
  />);
}