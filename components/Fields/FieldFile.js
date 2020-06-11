import { DropzoneDialog } from 'material-ui-dropzone';
import {
  Button
} from '@material-ui/core';
import React from 'react';
export default function FieldFile({ fieldsToRender, index, onFileUpload }) {
  const [open, setOpen] = React.useState(false);
  let filePreview;
  if (fieldsToRender[index]['value']) {
    filePreview = <img width="200" height="50" src={fieldsToRender[index]['value']}></img>;
  }
  return (<div>
    <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
      {fieldsToRender[index]['label']}
    </Button>
    <br></br>
    {filePreview}
    <DropzoneDialog
      acceptedFiles={fieldsToRender[index]['accepted']}
      maxFileSize={5000000}
      size="small"
      open={open}
      onClose={() => setOpen(false)}
      onSave={(files) => {
        onFileUpload(files);
        setOpen(false);
      }}
      showPreviews={true}
      showFileNamesInPreview={true}
    />
  </div>);
}

