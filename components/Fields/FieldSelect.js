import { Select } from 'mui-rff';
import { MenuItem} from '@material-ui/core';

export default function FieldSelect() {
  return (<Select
    name="city"
    label="Select a City"
    formControlProps={{ margin: 'none' }}
  >
    <MenuItem value="London">London</MenuItem>
    <MenuItem value="Paris">Paris</MenuItem>
    <MenuItem value="Budapest">A city with a very long Name</MenuItem>
  </Select>);
}