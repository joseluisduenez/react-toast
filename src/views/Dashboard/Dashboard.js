import React, { useState, useEffect }   from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Button from '@material-ui/core/Button';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
const useStyles = makeStyles(styles);
//const urlSessions = "http://localhost:8080/session/";
//const urlStartSession = "http://localhost:8080/session/start/";
const urlSessions = "/session/";
const urlStartSession = "session/start/";

export default function Dashboard(props) {
    const classes = useStyles();
    const [sessions, setSessions] = useState("");
    const [flag, setFlag] = useState("");


    const loadSesions = () => {
        let usertemp = JSON.parse(localStorage.getItem('TOAST_USER'))
        console.log(usertemp.token)
        axios.defaults.headers.common["Authorization"] = "Bearer " + usertemp.token
        axios({
            method: 'get',
            url: urlSessions
        })
            .then(function (response) {
                let v = JSON.stringify(response.data)
                setSessions(JSON.parse(v))
                setFlag(true)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const startSesions = (id) => {
        let usertemp = JSON.parse(localStorage.getItem('TOAST_USER'))
        console.log(usertemp.token)
        axios.defaults.headers.common["Authorization"] = "Bearer " + usertemp.token
        axios({
            method: 'patch',
            url: urlStartSession + id
        })
            .then(function (response) {
                let v = JSON.stringify(response.data)
                
            })
            .catch(function (error) {
                console.log(error);
            });
    }



    const parseSession = () => {
        let items = []
        for (let i = 0; i < sessions.length; i++) {
            var o = { id: sessions[i].id, title: sessions[i].title, status: sessions[i].status, clubName: sessions[i].clubName, startDate: sessions[i].startDate }
            items.push(o);
        }
        return items;
    }

    const renderTableData = () => {
        let items = parseSession()
        return items.map((ob, index) => {
            const { id, title, status, clubName, startDate } = ob 
            return (
                <TableRow key={id}>
                    <TableCell>{title}</TableCell>
                    <TableCell>{status}</TableCell>
                    <TableCell>{clubName}</TableCell>
                    <TableCell>{startDate}</TableCell>
                    <TableCell align="center">
                        <Button aria-label="edit" onClick={() => startSesions(id)}>
                            Start
                        </Button>
                    </TableCell>
                </TableRow>
            )
        })
    }

    useEffect(() => {
         //axios.defaults.headers.common["authorization"] = "Bearer " + "valuefake"
        
        //let p = JSON.parse(usertemp)
        //console.log("HOME COMPONENT: " +p)
        if (!flag)
            loadSesions();
    });

                return (
                    <TableContainer component = { Paper }>
                        <Table id='students'>
                            <TableHead>
                                <TableRow>
                                    <TableCell >Title</TableCell >
                                    <TableCell >Status</TableCell >
                                    <TableCell >Club Name</TableCell >
                                    <TableCell >Date</TableCell >
                                    <TableCell >Start Session</TableCell >
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {renderTableData()}
                            </TableBody>
                        </Table>
                    </TableContainer>
    );
}
