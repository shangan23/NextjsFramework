import { TextField} from 'mui-rff';

export default function FieldTextArea({ fieldsToRender, index, source }){
  return(<TextField 
    label={fieldsToRender[index]['label']}
    name={fieldsToRender[index]['name']}
    required={(!source)?fieldsToRender[index]['required']:false}
    //variant={(source)?"outlined":"standard"}
    multiline  
    size="small"
    margin="none" />);
}