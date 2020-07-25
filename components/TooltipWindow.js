import { connect } from 'react-redux';
import Moment from 'react-moment';
import {
  Grid,
  Typography, LinearProgress, Divider
} from '@material-ui/core';
import { dynamicSort } from '../utils/helper';
import moduleController from '../modules/controller';


class TooltipWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { objData: null, inventoryData: null };
  }

  componentDidMount = async () => {
    const fullUrl = `${window.location.protocol}//${window.location.hostname}${(window.location.port ?
      ':' + window.location.port :
      '')}`;
    let module = this.props.module;
    let object = this.props.id;
    let filterArray = [], filter;
    if (module == 'items') {
      filterArray.push({ k: 'fk_itemId', o: 'is', v: object, lo: 'AND' })
      filter = `?filter=${JSON.stringify(filterArray)}`
      const inventoryData = await fetch(`${fullUrl}/api/app/inventory/${filter}`);
      const invData = await inventoryData.json();
      await this.setState({ inventoryData: invData.rows[0] });
    }
    const objData = await fetch(`${fullUrl}/api/app/${module}/${object}`)
    const objJson = await objData.json();
    await this.setState({ objData: objJson });
  }

  render() {
    const fieldsToRender = moduleController(this.props.module, this.props.siteDetails);
    let object, inventoryObject, renderFields = <LinearProgress color="secondary" />;
    object = this.state.objData;
    inventoryObject = this.state.inventoryData;
    fieldsToRender.sort(dynamicSort('section')); // Gropu/rearrange fields by Sections
    if (object) {
      renderFields = (
        <Grid container spacing={1} key={`grid-form${Math.random()}`}>
          {
            (
              (inventoryObject) ?
                <React.Fragment>
                  <Grid item xs={12} md={12}>
                    <Typography color="secondary" variant="overline">inventory details</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="caption"> On Available:</Typography>
                    <Typography variant="subtitle2">{inventoryObject.onAvailable}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="caption"> on Hand:</Typography>
                    <Typography variant="subtitle2">{inventoryObject.onHand}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="caption"> On Order:</Typography>
                    <Typography variant="subtitle2">{inventoryObject.onOrder}</Typography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Divider />
                  </Grid>
                </React.Fragment>
                :
                ''
            )
          }
          {
            fieldsToRender.map((data, index) => (
              <React.Fragment key={`layout-frag${Math.random()}`}>
                {
                  (
                    (fieldsToRender[index]['type'] == 'Date' && fieldsToRender[index]['section'] != 'System Information') &&
                    <Grid item xs={12} md={4} key={index}>
                      <Typography variant="caption">{fieldsToRender[index]['label']}:</Typography><Typography variant="subtitle2"><Moment format={this.props.siteDetails.dateFormat}>{object[fieldsToRender[index]['id']]}</Moment></Typography>
                    </Grid>
                    || (fieldsToRender[index]['type'] == 'DynamicSet' && fieldsToRender[index]['section'] != 'System Information') &&
                    <Grid item xs={12} md={4} key={index}>
                      <Typography variant="caption"> {fieldsToRender[index]['label']}:</Typography>
                      <DynamicSetTable columns={fieldsToRender[index]['fields'][0]} list={object[fieldsToRender[index]['id']]} />
                    </Grid>
                    || (fieldsToRender[index]['type'] == 'Currency' && fieldsToRender[index]['section'] != 'System Information') &&
                    <Grid item xs={12} md={4} key={index}>
                      <Typography variant="caption"> {fieldsToRender[index]['label']}:</Typography><Typography variant="subtitle2">&#8377;&nbsp;{object[fieldsToRender[index]['id']].toLocaleString('en-IN')}</Typography>
                    </Grid>
                    || (fieldsToRender[index]['type'] == 'Lookup' && fieldsToRender[index]['section'] != 'System Information') &&
                    <Grid item xs={12} md={4} key={index}>
                      <Typography variant="caption">{fieldsToRender[index]['label']}:</Typography>
                      <Typography variant="body2">
                        {object[fieldsToRender[index]['id']][fieldsToRender[index]['moduleField']]}
                      </Typography>
                    </Grid>
                    || (fieldsToRender[index]['id'] != 'action' && fieldsToRender[index]['section'] != 'System Information') &&
                    <Grid item xs={12} md={4} key={index}>
                      <Typography variant="caption"> {fieldsToRender[index]['label']}:</Typography><Typography variant="subtitle2">{object[fieldsToRender[index]['id']]}</Typography>
                    </Grid>
                  )
                }
              </React.Fragment>
            ))
          }
        </Grid>
      );
    }
    return renderFields;
  }
}

function mapStateToProps(state) {
  return {
    siteDetails: state.siteSettings.settings,
  };
}

export default connect(
  mapStateToProps
)(TooltipWindow);
