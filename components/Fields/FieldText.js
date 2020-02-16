import { TextField } from 'mui-rff';

export default function FieldText({fieldsToRender, index}) {
  return (<TextField
    label={fieldsToRender[index]['label']}
    name="firstName"
    margin="none"
    required={true}
  />);
}