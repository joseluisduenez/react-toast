import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import { format } from "date-fns";
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 280,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));



export default function ScheduleSession(props) {
    const classes = useStyles();
    const [sessionTitle, setSessionTitle] = useState("");
    const [sessionStatus, setSessionStatus] = useState("");
    const [clubName, setClubName] = useState('');
    const [sessionStartDate, setSessionStartDate] = useState('');
    const [sessionStartDateFormatted, setSessionStartDateFormatted] = useState('');
    const [phraseOfTheDay, setPhraseOfTheDay] = useState('');
    const [wordOfTheDay, setWordOfTheDay] = useState('');
    const [didYouKnow, setDidYouKnow] = useState('');
    const [president, setPresident] = useState('');
    const [toastmaster, setToastmaster] = useState('');
    const [topicDirector, setTopicDirector] = useState('');
    const [timeKeeper, setTimeKeeper] = useState('');
    const [grammarEvaluator, setGrammarEvaluator] = useState('');
    const [generalEvaluator, setGeneralEvaluator] = useState('');
    const [host, setHost] = useState('');
    const [projectEvaluator, setProjectEvaluator] = useState('');
    const [userItems, setUserItems] = useState('');
    const [users, setUsers] = useState('');
    //const urlSession = "http://localhost:3007/register/";
    //const urlUsers = "http://40.80.211.16:8080/user";//user
    //const urlSession = "http://40.80.211.16:8080/session";//session
    const urlUsers = "/user";//user
    const urlSession = "/session";//SESSION

    const [assemblyOfficial, setAssemblyOfficial] = useState("");
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        let usertemp = JSON.parse(localStorage.getItem('TOAST_USER'))
        let id = usertemp.id
        axios.defaults.headers.common["Authorization"] = "Bearer " + usertemp.token
        axios({
            method: 'post',
            url: urlSession,
            data: {
                "title": sessionTitle,
                "status": sessionStatus,
                "clubName": clubName,
                "startDate": sessionStartDateFormatted,
                "phraseOfTheDay": phraseOfTheDay,
                "wordOfTheDay": wordOfTheDay,
                "didYouKnow": didYouKnow,
                "assemblyOfficial": { "id": assemblyOfficial },
                "president": { "id": president },
                "toastmaster": { "id": toastmaster },
                "topicDirector": { "id": topicDirector },
                "timeKeeper": { "id": timeKeeper },
                "grammarEvaluator": { "id": grammarEvaluator },
                "generalEvaluator": { "id": generalEvaluator },
                "host": { "id": host },
                "projectEvaluator": { "id": projectEvaluator },
                "createdBy": { "id": id }
                }
        })
            .then(function (response) {
               
                alert("Session Scheduled Successfully")
            })
            .catch(function (error) {
                console.log(error);
                alert(error);
            });
    }
    const loadUsers = () => {
        let usertemp = JSON.parse(localStorage.getItem('TOAST_USER'))
        axios.defaults.headers.common["Authorization"] = "Bearer " + usertemp.token
        axios({
            method: 'get',
            url: urlUsers
        })
            .then(function (response) {
                createUserItems(response.data);
                setUsers(response.data)
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
      
        if (userItems.length == 0)
            loadUsers();
    });

    const setSessionStartDateFormat = (data) => {
        var date = new Date(data);
        var formattedDate = format(date, "hh:mm: dd/MM/yyyy");
        setSessionStartDate(data);
        setSessionStartDateFormatted(formattedDate);
    }

    const createUserItems = (data) => {
        let items = [];
        for (let i = 0; i < data.length; i++) {
            items.push(<MenuItem key={i} value={data[i].id}>{data[i].fullName}</MenuItem>); 
        }
        setUserItems(items);
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                    Schedule a session
                </Typography>
                <form onSubmit={handleSubmit} className={classes.form} noValidate>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="Session Title"
                        label="Session Title"
                        name="Session Title"
                        autoComplete="Session Title"
                        autoFocus
                        value={sessionTitle}
                        onChange={e => setSessionTitle(e.target.value)}
                    />

                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Session Status</InputLabel>
                        <Select
                            labelId="session-status-label"
                            id="session-status"
                            value={sessionStatus}
                            onChange={e => setSessionStatus(e.target.value)}
                        >
                            <MenuItem value={"NOT-STARTED"}>NOT-STARTED</MenuItem>
                            
                        </Select>
                    </FormControl>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="Club Name"
                        label="Club Name"
                        id="clubName"
                        autoComplete="Club Name"
                        value={clubName}
                        onChange={e => setClubName(e.target.value)}
                    />

                    <TextField
                        id="sessionStartSateid"
                        label="Session Start Date"
                        type="date"
                        
                        className={classes.textField}
                        value={sessionStartDate}
                        onChange={e => setSessionStartDateFormat(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="Phrase Of The Day"
                        label="Phrase Of The Day"
                        id="poftheday"
                        autoComplete="Phrase Of The Day"
                        value={phraseOfTheDay}
                        onChange={e => setPhraseOfTheDay(e.target.value)}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="Word Of The Day"
                        label="Word Of The Day"
                        id="wordOfTheDay"
                        autoComplete="Word Of The Day"
                        value={wordOfTheDay}
                        onChange={e => setWordOfTheDay(e.target.value)}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="Did You Know"
                        label="Did You Know"
                        id="didYouKnow"
                        autoComplete="Did You Know"
                        value={didYouKnow}
                        onChange={e => setDidYouKnow(e.target.value)}
                    />

                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Assembly Official Role</InputLabel>
                        <Select
                            labelId="aorlabel"
                            id="aor-select"
                            value={assemblyOfficial}
                            onChange={e => setAssemblyOfficial(e.target.value)}

                        >
                            {userItems}
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-president-select-label">President</InputLabel>
                        <Select
                            labelId="president-label"
                            id="president-select"
                            value={president}
                            onChange={e => setPresident(e.target.value)}

                        >
                            {userItems}
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-toastmaster-select-label">Toastmaster</InputLabel>
                        <Select
                            labelId="demo-toastmaster-select-label"
                            id="demo-toastmaster-select"
                            value={toastmaster}
                            onChange={e => setToastmaster(e.target.value)}

                        >
                            {userItems}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-topicDirector-select-label">Topic Director</InputLabel>
                        <Select
                            labelId="demo-topicDirector-select-label"
                            id="demo-topicDirector-select"
                            value={topicDirector}
                            onChange={e => setTopicDirector(e.target.value)}

                        >
                            {userItems}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-timeKeeper-select-label">Time Keeper</InputLabel>
                        <Select
                            labelId="demo-timeKeeper-select-label"
                            id="demo-timeKeeper-select"
                            value={timeKeeper}
                            onChange={e => setTimeKeeper(e.target.value)}

                        >
                            {userItems}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-grammarEvaluator-select-label">Grammar Evaluator</InputLabel>
                        <Select
                            labelId="demo-grammarEvaluator-select-label"
                            id="demo-grammarEvaluator-select"
                            value={grammarEvaluator}
                            onChange={e => setGrammarEvaluator(e.target.value)}

                        >
                            {userItems}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-generalEvaluator-select-label">General Evaluator</InputLabel>
                        <Select
                            labelId="demo-generalEvaluator-select-label"
                            id="demo-generalEvaluator-select"
                            value={generalEvaluator}
                            onChange={e => setGeneralEvaluator(e.target.value)}

                        >
                            {userItems}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-host-select-label">Host</InputLabel>
                        <Select
                            labelId="demo-host-select-label"
                            id="demo-host-select"
                            value={host}
                            onChange={e => setHost(e.target.value)}

                        >
                            {userItems}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-projectEvaluator-select-label">Project Evaluator</InputLabel>
                        <Select
                            labelId="demo-projectEvaluator-select-label"
                            id="demo-projectEvaluator-select"
                            value={projectEvaluator}
                            onChange={e => setProjectEvaluator(e.target.value)}

                        >
                            {userItems}
                        </Select>
                    </FormControl>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Submit
                    </Button>
                    
                </form>
            </div>

        </Container>
    );
}
