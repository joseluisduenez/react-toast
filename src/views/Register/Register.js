import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
export default function Register(props) {
    const classes = useStyles();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [fname, setFname] = useState("");
    const [pwd, setPwd] = useState("");
    //const url = "http://40.80.211.16:8080/api/auth/signup";//user
    const url = "/api/auth/signup";

    const handleSubmit = (evt) => {
        evt.preventDefault();

        axios({
            method: 'post',
            url,
            data: {
                "userName": username,
                "password": pwd,
                "fullName": fname,
                "email": email,
                "roles": ["ROLE_USER"]
            }
        })
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                props.history.push("/login");
            })
            .catch(function (error) {
                console.log(error);
                alert(error);
            });
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                
                <Typography component="h1" variant="h5">
                    Register User
        </Typography>
                <form onSubmit={handleSubmit} className={classes.form} noValidate>
                    
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="Email"
                        autoComplete="Email"
                        autoFocus
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="fname"
                        label="Full Name"
                        name="Full Name"
                        autoComplete="Full Name"
                        autoFocus
                        value={fname}
                        onChange={e => setFname(e.target.value)}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={pwd}
                        onChange={e => setPwd(e.target.value)}
                    />

                    
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