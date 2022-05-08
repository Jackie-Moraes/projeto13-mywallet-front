import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from "react";

export default function Register() {
    const URL = "https://projeto13-mywallet-back.herokuapp.com/sign-up"

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [disabled, setDisabled] = useState(false);

    const navigator = useNavigate();

    function blockForValidation(e) {
        e.preventDefault();
        setDisabled(true);
        if(password !== passwordConfirmation) {
            alert("As senhas devem ser iguais! Tente novamente.")
            setDisabled(false);
        } else {
            console.log(password, passwordConfirmation)
            validateRegister();
        }
    }

    function validateRegister() {
        const promise = axios.post(URL, {
            name,
            email,
            password,
            passwordConfirmation
        });

        promise.catch(e => {
            alert("Algo deu errado! Tente novamente mais tarde.");
            setDisabled(false)
        });

        promise.then(() => {
            alert("Sucesso ao criar a conta!")
            setDisabled(false)
            navigator("/");
        })
    }


    return (
        <Menu>
            <h1>MyWallet</h1>

            <form onSubmit={blockForValidation} style={disabled ? {opacity: '0.5'} : {}} disabled={disabled ? "disabled" : ""}>
                <input required placeholder="Nome" type="text" onChange={e => setName(e.target.value)}></input>
                <input required placeholder="E-mail" type="email" onChange={e => setEmail(e.target.value)}></input>
                <input required placeholder="Senha" type="password" onChange={e => setPassword(e.target.value)}></input>
                <input required placeholder="Confirme a senha" type="password" onChange={e => setPasswordConfirmation(e.target.value)}></input>
                <button type="submit">Cadastrar</button>
            </form>

            <Link to="/">Já tem uma conta? Entre agora!</Link>
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