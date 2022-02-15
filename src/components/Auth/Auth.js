import React, {useState} from 'react';
import {Button, FormControl, FormHelperText, Input, InputLabel} from "@material-ui/core";
import { useHistory } from 'react-router-dom';

function Auth() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();


    const handleUsername = (value) => {
        setUsername(value);
    }
    const handlePassword = (value) => {
        setPassword(value);
    }

    const sendRequest = (path) => {
        fetch("/auth/" + path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then((res) => res.json())
            .then((result) => {localStorage.setItem("tokenKey",result.message);
                            localStorage.setItem("currentUser", result.userId);
                            localStorage.setItem("username",username)})
            .catch((err) => console.log(err))

    }

    const handleButton = (path) => {
        sendRequest(path)
        setUsername("")
        setPassword("")
        history.go("/auth")
    }



    return (
        <FormControl>
            <InputLabel>Username</InputLabel>
            <Input
                onChange={(i) => handleUsername(i.target.value)}
            />
            <InputLabel style={{top: 80}}>Password</InputLabel>
            <Input style={{top: 40}}
                   onChange={(i) => handlePassword(i.target.value)}
            />
            <Button variant="contained"
                    style={{
                        marginTop: 60,
                        background: 'linear-gradient(45deg,#2196F3 30%, #21CBF3 90%)',
                        color: 'white'
                    }}
                    onClick={() => handleButton("register")}
            >Register</Button>
            <FormHelperText> Are you already registered?</FormHelperText>
            <Button variant="contained"
                    style={{
                        marginTop: 20,
                        background: 'linear-gradient(45deg,#2196F3 30%, #21CBF3 90%)',
                        color: 'white'
                    }}
                    onClick={() => handleButton("login")}
            >Login</Button>
        </FormControl>
    );
};

export default Auth;