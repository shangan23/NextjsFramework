import { Select } from 'mui-rff';
import { MenuItem } from '@material-ui/core';

export default function FieldSelect({ fieldsToRender, index, source }) {
  const data = fieldsToRender[index]['data'];
  return (<Select
    label={fieldsToRender[index]['label']}
    name={fieldsToRender[index]['name']}
    required={(!source)?fieldsToRender[index]['required']:false}
    //variant={(source)?"outlined":"standard"}
    formControlProps={{ margin: 'none' }}
  > {data.map((item, idx) => (
      <MenuItem value={data[idx]['id']}>{data[idx]['value']}</MenuItem>
    ))}
  </Select>);
}