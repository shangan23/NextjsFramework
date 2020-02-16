import { Checkboxes } from 'mui-rff';

export default function FieldCheckbox() {
  return (<Checkboxes
    name="employed"
    formControlProps={{ margin: 'none' }}
    data={{ label: 'Employed', value: true }}
  />);
}