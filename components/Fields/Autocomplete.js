import { Autocomplete } from 'mui-rff';

export default function FieldAutoComplete({fieldsToRender, index, source}) {
  return (<Autocomplete
    required={(!source)?fieldsToRender[index]['required']:false}
    //variant={(source)?"outlined":"standard"}
    size="small"
    label={fieldsToRender[index]['label']}
    options={fieldsToRender[index]['data']}
    getOptionValue={option => option.id}
    getOptionLabel={option => option.value}
    name={fieldsToRender[index]['name']}
    multiple
  />);
}