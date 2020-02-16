import { Radios } from 'mui-rff';

export default function FieldRadio() {
  return (<Radios
    label="Best Stooge"
    name="stooge"
    formControlProps={{ margin: 'none' }}
    radioGroupProps={{ row: true }}
    data={[
      { label: 'Larry', value: 'larry' },
      { label: 'Moe', value: 'moe' },
      { label: 'Curly', value: 'curly' },
    ]}
  />);
}