import { Autocomplete } from 'mui-rff';

export default function FieldAutoCompleteSingle({fieldsToRender, index}) {
  return (<Autocomplete
    required={fieldsToRender[index]['required']}
    label={fieldsToRender[index]['label']}
    options={fieldsToRender[index]['data']}
    getOptionValue={option => option.id}
    getOptionLabel={option => option.value}
    size="small"
    name={fieldsToRender[index]['name']}
  />);
}