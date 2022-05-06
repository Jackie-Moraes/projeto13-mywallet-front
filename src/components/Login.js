import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from "react";

export default function Login() {
    const URL = "INSIRA URL AQUI"

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const {userInfo, setUserInfo} = useContext(UserContext);
    const [disabled, setDisabled] = useState(false);

    const navigator = useNavigate();

    function blockForValidation(e) {
        e.preventDefault();
        setDisabled(true);
        validateLogin();
    }

    function validateLogin() {

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
flex-direction: column;

h1 {
    font-family: 'Saira Stencil One', cursive;
    color: #126BA5;
    font-size: 32px;
    font-weight: 400;
}

a {
    color: #FFFFFF;
    font-size: 15px;
}

form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

input {
    margin-bottom: 10px;
    width: 326px;
    height: 60px;
    border: 1px solid #FFFFFF;
    border-radius: 5px;
    padding: 10px;
    background: #FFFFFF;
}

input::placeholder {
    color: #000000;
}

button {
    width: 326px;
    height: 60px;
    border: none;
    background: #A328D6;
    border-radius: 5px;
    padding: 5px;

    color: #FFFFFF;
}
`