//import CheckIcon from '@material-ui/icons/Check';
//import ClearIcon from '@material-ui/icons/Clear';

function CustomBodyCell(props) {
  console.log('propsss',props);
  return <div>{props.value ? 'Y': 'N'}</div>;
}

export default CustomBodyCell;
