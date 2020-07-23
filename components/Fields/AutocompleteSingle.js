import { Autocomplete } from 'mui-rff';

export default function FieldAutoCompleteSingle({fieldsToRender, index, source}) {
  return (<Autocomplete
    required={(!source)?fieldsToRender[index]['required']:false}
    //variant={(source)?"outlined":"standard"}
    label={fieldsToRender[index]['label']}
    options={fieldsToRender[index]['data']}
    getOptionValue={option => option.id}
    getOptionLabel={option => option.value}
    size="small"
    name={fieldsToRender[index]['name']}
  />);
}