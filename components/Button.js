import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const styledBy = (property, mapping) => (props) => mapping[props[property]];

const styles = {
  root: {
    background: styledBy('color', {
      default: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      blue: 'linear-gradient(45deg, #2196F3 30%, #1a73e8 90%)',
    }),
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: styledBy('color', {
      default: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      blue: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    }),
  },
};



const StyledButton = withStyles(styles)(({ classes, color, ...other }) => (
  <Button className={classes.root} color={color} {...other} />
));

export default StyledButton;

/*export default function AppButton() {
  const color = 'blue';
  return (<StyledButton color={color} ></StyledButton>);
}*/
