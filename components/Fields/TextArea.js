import { TextField} from 'mui-rff';

export default function FieldTextArea({ fieldsToRender, index }){
  return(<TextField 
    label={fieldsToRender[index]['label']}
    name={fieldsToRender[index]['name']}
    required={fieldsToRender[index]['required']}
    multiline  
    size="small"
    margin="none" />);
}