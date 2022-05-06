import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from "react";

import UserContext from "../contexts/UserContext";

export default function Login() {
    const URL = "http://localhost:5000/sign-in"

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {userInfo, setUserInfo} = useContext(UserContext);
    const [disabled, setDisabled] = useState(false);

    const navigator = useNavigate();

    function blockForValidation(e) {
        e.preventDefault();
        setDisabled(true);
        validateLogin();
    }

    function validateLogin() {
        const promise = axios.post(URL, {
            email,
            password
        });

        promise.catch(e => {
            alert("Algo deu errado! Tente novamente mais tarde.");
            setDisabled(false)
        });

        promise.then(response => {
            console.log(response);
            const {name, token} = response.data
            setUserInfo({name, token});
            setDisabled(false)
            navigator("/home");
        })
    }


    return (
        <Menu>
            <h1>MyWallet</h1>

            <form onSubmit={blockForValidation} style={disabled ? {opacity: '0.5'} : {}} disabled={disabled ? "disabled" : ""}>
                <input required placeholder="E-mail" type="email" onChange={e => setEmail(e.target.value)}></input>
                <input required placeholder="Senha" type="password" onChange={e => setPassword(e.target.value)}></input>
                <button type="submit">Entrar</button>
            </form>

            <Link to="/register">Primeira vez? Cadastre-se!</Link>
        </Menu>
    )
}

const Menu = styled.main`
width: 100vw;
height: 100vh;

background: #8C11BE;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;

h1 {
    font-family: 'Saira Stencil One', cursive;
    color: #FFFFFF;
    font-size: 32px;
    font-weight: 400;
    margin-bottom: 35px;
}

a {
    color: #FFFFFF;
    font-size: 15px;
    font-weight: bold;
    text-decoration: none;
}

form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

input {
    margin-bottom: 15px;
    width: 326px;
    height: 58px;
    border: 1px solid #FFFFFF;
    border-radius: 5px;
    padding: 10px;
    background: #FFFFFF;
    font-size: 20px;
    
    :focus {
        outline:none;
    }
}

input::placeholder {
    color: #808080;
}

button {
    width: 326px;
    height: 46px;
    border: none;
    background: #A328D6;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 35px;
    color: #FFFFFF;
    font-size: 20px;
}
`