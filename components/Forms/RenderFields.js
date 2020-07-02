import { connect } from 'react-redux';
import { dynamicSort } from '../../utils/helper';
import Autocomplete from '../Fields/Autocomplete';
import Checkbox from '../Fields/Checkbox';
import Date from '../Fields/Date';
import Radio from '../Fields/Radio';
import Select from '../Fields/Select';
import Text from '../Fields/Text';
import TextArea from '../Fields/TextArea';
import Time from '../Fields/Time';
import Email from '../Fields/Email';
import Password from '../Fields/Password';
import Switch from '../Fields/Switch';
import AutoCompleteSingle from '../Fields/AutocompleteSingle';
import Currency from '../Fields/Currency';
import File from '../Fields/File';
import Lookup from '../Fields/Lookup';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const fieldsStyle = (theme) => ({
	Section: {
		backgroundColor: '#FAFAFA',
		paddingTop: '0px !important',
		paddingBottom: '0px !important',
	},
});


class RenderFields extends React.Component {

	constructor(props) {
		super(props);
		//this.state = {};
	}

	render() {
		const { classes } = this.props;
		let fieldsToRender = [];
		fieldsToRender = this.props.fieldsToRender;
		fieldsToRender.sort(dynamicSort('section'));

		const renderFields = (
			<Grid container spacing={2} style={{ margin: 4 }} key={`grid-dialog${Math.random()}`}>
				{
					fieldsToRender.map((data, index) => (
						<React.Fragment key={`fragment-dialog${Math.random()}`} >
							{
								(
									(index === 0) ?
										<Grid className={classes.Section} item xs={12} md={12}>
											<Typography color="secondary" variant="overline">{fieldsToRender[index]['section']}</Typography>
										</Grid> :
										(fieldsToRender[index]['section'] != fieldsToRender[(index - 1)]['section'] && !fieldsToRender[index]['disabled']) ?
											<React.Fragment>
												<Grid item xs={12} md={12}></Grid>
												<Grid className={classes.Section} item xs={12} md={12}>
													<Typography color="secondary" variant="overline">{fieldsToRender[index]['section']}</Typography>
												</Grid></React.Fragment> :
											''
								)
							}
							{
								(fieldsToRender[index]['type'] == 'Text') &&
								<Grid item xs={6} md={6} key={index}>
									<Text index={index} fieldsToRender={fieldsToRender} />
								</Grid>
								|| (fieldsToRender[index]['type'] == 'Date') &&
								<Grid item xs={6} md={6} key={index}>
									<Date index={index} fieldsToRender={fieldsToRender} />
								</Grid>
								|| (fieldsToRender[index]['type'] == 'Select') &&
								<Grid item xs={6} md={6} key={index}>
									<Select index={index} fieldsToRender={fieldsToRender} />
								</Grid>
								|| (fieldsToRender[index]['type'] == 'Checkbox') &&
								<Grid item xs={6} md={6} key={index}>
									<Checkbox index={index} fieldsToRender={fieldsToRender} />
								</Grid>
								|| (fieldsToRender[index]['type'] == 'Time') &&
								<Grid item xs={6} md={6} key={index}>
									<Time index={index} fieldsToRender={fieldsToRender} />
								</Grid>
								|| (fieldsToRender[index]['type'] == 'TextArea') &&
								<Grid item xs={6} md={6} key={index}>
									<TextArea index={index} fieldsToRender={fieldsToRender} />
								</Grid>
								|| (fieldsToRender[index]['type'] == 'Radio') &&
								<Grid item xs={6} md={6} key={index}>
									<Radio index={index} fieldsToRender={fieldsToRender} />
								</Grid>
								|| (fieldsToRender[index]['type'] == 'Autocomplete') &&
								<Grid item xs={6} md={6} key={index}>
									<Autocomplete index={index} fieldsToRender={fieldsToRender} />
								</Grid>
								|| (fieldsToRender[index]['type'] == 'Email') &&
								<Grid item xs={6} md={6} key={index}>
									<Email index={index} fieldsToRender={fieldsToRender} />
								</Grid>
								|| (fieldsToRender[index]['type'] == 'Password') &&
								<Grid item xs={6} md={6} key={index}>
									<Password index={index} fieldsToRender={fieldsToRender} />
								</Grid>
								|| (fieldsToRender[index]['type'] == 'Switch') &&
								<Grid item xs={6} md={6} key={index}>
									<Switch index={index} fieldsToRender={fieldsToRender} />
								</Grid>
								|| (fieldsToRender[index]['type'] == 'AutocompleteSingle') &&
								<Grid item xs={6} md={6} key={index}>
									<AutoCompleteSingle index={index} fieldsToRender={fieldsToRender} />
								</Grid>
								|| (fieldsToRender[index]['type'] == 'Upload') &&
								<Grid item xs={6} md={6} key={index}>
									<File index={index} fieldsToRender={fieldsToRender} onFileUpload={onFileUpload} />
								</Grid>
								|| (fieldsToRender[index]['type'] == 'Lookup') &&
								<Grid item xs={6} md={6} key={index}>
									<Lookup index={index} fieldsToRender={fieldsToRender} />
								</Grid>
								|| (fieldsToRender[index]['type'] == 'Currency') &&
								<Grid item xs={12} md={4} key={index}>
									<Currency index={index} fieldsToRender={fieldsToRender} />
								</Grid>
							}
						</React.Fragment>
					))
				}
			</Grid>
		);

		return <React.Fragment>{renderFields}</React.Fragment>;

	}
}

function mapStateToProps(state) {
	return {
		siteDetails: state.siteSettings.settings,
	};
}

export default connect(
	mapStateToProps
)(withStyles(fieldsStyle, { name: 'RenderFields' })(RenderFields));