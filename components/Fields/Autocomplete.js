import { Autocomplete } from 'mui-rff';

export default function FieldAutoComplete({fieldsToRender, index}) {
  return (<Autocomplete
    required={fieldsToRender[index]['required']}
    size="small"
    label={fieldsToRender[index]['label']}
    options={fieldsToRender[index]['data']}
    getOptionValue={option => option.id}
    getOptionLabel={option => option.value}
    name={fieldsToRender[index]['name']}
    multiple
  />);
}