import React, { useState, useEffect } from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';

const FileDownload = require('js-file-download');

// @material-ui/icons
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 280,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


export default function GenerateAgenda(props) {
    const classes = useStyles();
    const [session, setSession] = useState("");
    const [sessionItems, setSessionItems] = useState("");
    const [sessions, setSessions] = useState("");
    const [urlAgenda, setUrlAgenda] = useState("");
    const [language, setLanguage] = useState("");
    //const urlSessions = "http://40.80.211.16:8080/session/";
    //const urlGenerateAgenda = "http://40.80.211.16:8080/agenda/";//agenda
    const urlSessions = "/session/";
    const urlGenerateAgenda = "/agenda/";

    const loadSesions = () => {
        let usertemp = JSON.parse(localStorage.getItem('TOAST_USER'))
        console.log(usertemp.token)
        axios.defaults.headers.common["Authorization"] = "Bearer " + usertemp.token
        axios({
            method: 'get',
            url: urlSessions
        })
            .then(function (response) {
                createSessionItems(response.data);
                setSessions(response.data)
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        if (sessionItems.length ===0)
            loadSesions();
    });

    const setSessionAgenda = (data) => {
        let ur = urlGenerateAgenda + "" + data;
        setUrlAgenda(ur)
        setSession(data)
    }

    const callDownload = (data) => {
        let usertemp = JSON.parse(localStorage.getItem('TOAST_USER'))
        console.log(usertemp.token)
        axios.defaults.headers.common["Authorization"] = "Bearer " + usertemp.token
        axios.defaults.headers.common["Accept-Language"] = language
        console.log("Lenguaje"+language)
         console.log(urlAgenda)
        axios({
            method: 'get',
            url: urlAgenda
        })
            .then(function (response) {
                FileDownload(response.data, 'report.txt');
            })
            .catch(function (error) {
                console.log(error);
                alert(error);
            });
        
    }

    const createSessionItems = (data) => {
        let items = [];
        for (let i = 0; i < data.length; i++) {
            items.push(<MenuItem key={i} value={data[i].id}>{data[i].title}</MenuItem>);
        }
        setSessionItems(items);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <table>
            <tr>
            <td >
            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                    Generate Agenda
        </Typography>
                
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Select Session</InputLabel>
                        <Select
                            labelId="aorlabel"
                            id="aor-select"
                            value={session}
                            onChange={e => setSessionAgenda(e.target.value)}
                        >
                            {sessionItems}
                        </Select>
                    </FormControl>
                   
                </div>
                </td>
                <td className={classes.td}>
                    <div onChange={e =>setLanguage(e.target.value)} >     
                        <InputLabel id="demo-simple-select-label" className={classes.formControl} >Select Language</InputLabel>
                                <input type="radio" class ="radio"  name="language" value="US"  defaultChecked/>US
                                <input type="radio" class ="radio"  name="language" value="ES" />ES
               
            </div>
            </td>
                </tr>
            </table>
            <div>   

                <Button 
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    className={classes.submit}
                    onClick={e => callDownload(e.target.value)}
                    >
                        Download
                    </Button>

                 
            </div>

        </Container>
    );
}
