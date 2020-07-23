import React from 'react';
import initialize from '../../../utils/initialize';
import DynamicForm from '../../../components/Forms/UserDynamicForm';
import { connect } from 'react-redux';
import absoluteUrl from "next-absolute-url";
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = (theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
});

function getSteps() {
  return ['Order Information', 'Add Items', 'Place Order'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Step 1: Select campaign settings...';
    case 1:
      return 'Step 2: What is an ad group anyways?';
    case 2:
      return 'Step 3: This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
}

const frameURL = async (req) => {
  let host, urlObj;
  host = absoluteUrl(req, req.headers.host);
  urlObj = new URL(`${host.origin}${req.url}`);
  let module;
  console.log(urlObj);
  let { pathname } = urlObj;
  module = pathname.replace('/app/', '');
  return { module }
};



class DynamicCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeStep: 0, completed: {} };
  }

  static async getInitialProps(ctx) {
    await initialize(ctx);
    const { req } = ctx;
    if (!req) {
      let module = ctx.query.appId;
      console.log('iClient Router module', module);
      console.log('iClient ctx', ctx.query.appId);
      return { module: module };
    } else {
      const { module } = await frameURL(req);
      return { module };
    }
  }

  render() {

    const steps = getSteps();
    const { classes } = this.props;

    const totalSteps = () => {
      return steps.length;
    };

    const completedSteps = () => {
      return Object.keys(this.state.completed).length;
    };

    const isLastStep = () => {
      return this.state.activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
      return completedSteps() === totalSteps();
    };

    const handleNext = () => {
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in this.state.completed))
          : this.state.activeStep + 1;
      this.setState({ activeStep: newActiveStep })

    };

    const handleBack = () => {
      this.setState({ activeStep: (prevActiveStep) => prevActiveStep - 1 })
      //setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
      //setActiveStep(step);
      this.setState({ activeStep: step})
    };

    const handleComplete = () => {
      const newCompleted = this.state.completed;
      newCompleted[this.state.activeStep] = true;
      this.setState({completed:newCompleted});
      //setCompleted(newCompleted);
      handleNext();
    };

    const handleReset = () => {
      this.setState({ activeStep: 0,completed:{}})
    };

    const stepper = (
      <div className={classes.root}>
        <Stepper nonLinear activeStep={this.state.activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton onClick={handleStep(index)} completed={this.state.completed[index]}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {allStepsCompleted() ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
            </Typography>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
              <div>
                <Typography className={classes.instructions}>{getStepContent(this.state.activeStep)}</Typography>
                <div>
                  <Button disabled={ this.state.activeStep === 0} onClick={handleBack} className={classes.button}>
                    Back
              </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    Next
              </Button>
                  {this.state.activeStep !== steps.length &&
                    (this.state.completed[this.state.activeStep] ? (
                      <Typography variant="caption" className={classes.completed}>
                        Step {this.state.activeStep + 1} already completed
                  </Typography>
                    ) : (
                        <Button variant="contained" color="primary" onClick={handleComplete}>
                          {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                        </Button>
                      ))}
                </div>
              </div>
            )}
        </div>
      </div>
    );


    const settingsData = {};
    const onSubmit = async values => {
      window.alert(JSON.stringify(values, 0, 2));
    };

    let module = this.props.module;

    return (
      <React.Fragment>
        {stepper}
       {/*} <DynamicForm
          listLink={''}
          formTitle={'create'}
          module={module}
          action="new"
          defaultValue={settingsData}
          onSubmit={onSubmit}
          buttonCancelText="Cancel"
          buttonSubmitText="Save"
    />*/}
      </React.Fragment>
    );
  }

}

function mapStateToProps(state) {
  return {
    siteInfo: state.siteSettings.settings,
  };
}

export default connect(
  mapStateToProps
)(withStyles(useStyles)(DynamicCreate));
