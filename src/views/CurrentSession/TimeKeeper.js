import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Stopwatch from "components/Timer/Stopwatch.js"

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));
 



function getStepContent(step) {
    switch (step) {
        case 0:
            return `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`;
        case 1:
            return 'An ad group contains one or more ads which target a shared set of keywords.';
        case 2:
            return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
        default:
            return 'Unknown step';
    }
}

export default function Timekeeper(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [seconds, setSeconds] = React.useState(0)
    const [minutes, setMinutes] = React.useState(0)
    const [hours, setHours] = React.useState(0)

    const [data, setData] = React.useState([{ "id": "1", "name": 'Select campaign settings', "seconds": 0, "minutes": 0, "hours": 0 }, { "id": "2", "name": 'Create an ad group', "seconds": 0, "minutes": 0, "hours": 0 }, { "id": "3", "name": 'Create an ad', "seconds": 0, "minutes": 0, "hours": 0 }])

    const handleNext = (id) => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        let objIndex = data.findIndex(ob => ob.id === id);
        if ((objIndex + 1) < data.length )
            setSeconds(data[objIndex+1].seconds)
    };
    
    const handleBack = (id) => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        let objIndex = data.findIndex(ob => ob.id === id);
        setSeconds(data[objIndex-1].seconds)
    };

    const handleTimer = (id) => {
        let objIndex = data.findIndex(ob => ob.id === id);
        let sec = 0
        let min = 0
        let hour = 0
        if (data[objIndex].seconds < 59) {
            sec = data[objIndex].seconds + 1;
        }
        else {
            if (data[objIndex].minutes < 59) {
                min = data[objIndex].minutes + 1;
                setMinutes(min)
            } else {
                setMinutes(0)
                if (data[objIndex].hours < 23) {
                    hour = data[objIndex].hours + 1;
                    setHours(hour)
                }
            }
        }
            
        setData((prevData) => {
            let objIndex = prevData.findIndex(ob => ob.id === id);
            prevData[objIndex].seconds = sec
            prevData[objIndex].minutes = min
            prevData[objIndex].hours = hour
            return prevData
        });
        setSeconds(sec)
    }

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {data.map((label, index) => (
                    <Step key={label.id}>
                        <StepLabel>{ label.name}</StepLabel>
                        <StepContent>
                             
                                <div style={{ fontSize: '40px' }}>
                                    <span>{hours}</span>:<span>{minutes}</span>:<span >{seconds}</span>

                                </div>
                             
                            <div className={classes.actionsContainer}>
                                <div>
                                    <br/>
                                    <Stopwatch handleTimer={handleTimer} sectionId={label.id} />
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={() => handleBack(label.id)}
                                        className={classes.button}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleNext(label.id)}
                                        className={classes.button}
                                    >
                                        {activeStep === data.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === data.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    
                </Paper>
            )}
        </div>
    );
}