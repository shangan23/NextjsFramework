import { Select } from 'mui-rff';
import { MenuItem } from '@material-ui/core';

export default function FieldSelect({ fieldsToRender, index }) {
  const data = fieldsToRender[index]['data'];
  return (<Select
    label={fieldsToRender[index]['label']}
    name={fieldsToRender[index]['name']}
    required={fieldsToRender[index]['required']}
    formControlProps={{ margin: 'none' }}
    value={fieldsToRender[index]['value']}
  > {data.map((item, idx) => (
      <MenuItem value={data[idx]['id']}>{data[idx]['value']}</MenuItem>
    ))}
  </Select>);
}