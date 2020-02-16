import { DatePicker } from 'mui-rff';
import DateFnsUtils from '@date-io/date-fns';

export default function FieldDate() {
  return (<DatePicker
    name="rendez-vous"
    margin="normal"
    label="Rendez-vous"
    dateFunsUtils={DateFnsUtils}
  />);
}