import { Autocomplete } from 'mui-rff';

export default function FieldAutoComplete({fieldsToRender, index}) {
  return (<Autocomplete
    required={true}
    label="Pick at least one planet"
    options={fieldsToRender[index]['data']}
    getOptionValue={option => option.id}
    getOptionLabel={option => option.value}
    name={fieldsToRender[index]['name']}
    multiple
  />);
}