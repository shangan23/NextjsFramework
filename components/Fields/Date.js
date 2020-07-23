import { DatePicker } from 'mui-rff';
import DateFnsUtils from '@date-io/date-fns';
import { connect } from 'react-redux';
import Hidden from '@material-ui/core/Hidden';

class FieldDate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const fieldsToRender = this.props.fieldsToRender;
    const index = this.props.index;
    const source = this.props.source;
    let format = this.props.siteDetails.dateFormat;
    format = format.replace('DD', 'dd');
    format = format.replace('YYYY', 'yyyy');

    const field = (<DatePicker
      required={(!source) ? fieldsToRender[index]['required'] : false}
      name={fieldsToRender[index]['name']}
      format={format}
      label={fieldsToRender[index]['label']}
      dateFunsUtils={DateFnsUtils}
    />);

    if (fieldsToRender[index]['disabled'] && !source)
      return <Hidden mdDown smDown lgDown xlDown xsDown>{field}</Hidden>;

    return <React.Fragment>{field}</React.Fragment>;

  }
}

function mapStateToProps(state) {
  return {
    siteDetails: state.siteSettings.settings,
  };
}

export default connect(
  mapStateToProps
)(FieldDate);
