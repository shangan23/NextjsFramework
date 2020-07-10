import { TextField } from 'mui-rff';
import Hidden from '@material-ui/core/Hidden';

export default function FieldText({ fieldsToRender, index, source  }) {
  const field = (<TextField
    label={fieldsToRender[index]['label']}
    size="small"
    disabled={fieldsToRender[index]['disabled']}
    id={fieldsToRender[index]['id']}
    name={fieldsToRender[index]['name']}
    required={(!source) ? fieldsToRender[index]['required'] : false}
  //variant={(source)?"outlined":"standard"}
  />);

  if (fieldsToRender[index]['disabled'] && !source)
    return <Hidden mdDown smDown lgDown xlDown xsDown>{field}</Hidden>;

  return <React.Fragment>{field}</React.Fragment>;
}