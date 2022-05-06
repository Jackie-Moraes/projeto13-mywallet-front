import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useContext, useEffect } from "react";

import UserContext from "../contexts/UserContext";

export default function Balance() {
    const URL = "http://localhost:5000/balance"
    
    const {userInfo, setUserInfo} = useContext(UserContext);
    const {token, operation} = userInfo;
    const [value, setValue] = useState(0);
    const [description, setDescription] = useState("");
    const [disabled, setDisabled] = useState(false);
    const navigator = useNavigate();
    let entry = "";
    
    const userConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    
    if (operation === "cashIn") {
        entry = "entrada"
    } else {
        entry = "saída";
    }

    useEffect(() => {
        if (!token) {
            alert('Session timed out. Please login again.');
            navigator('/');
        }
    }, [])
    

    function blockForValidation(e) {
        e.preventDefault();
        setDisabled(true);
        validateEntry();
    }

    function validateEntry() {
        const promise = axios.post(URL, 
            {
            value,
            description,
            operation
            }, 
        userConfig);

        promise.catch(e => {
            alert('Something went wrong, please try again later.');
            setDisabled(false)
        });

        promise.then(response => {
            console.log(response.data)
            setUserInfo({...userInfo, balance: response.data});
            setDisabled(false)
            alert("New entry created! Redirecting...")
            navigator("/home");
        })
    }

    return (
        <BalanceContainer>
            <Entry>
                <h1>Nova {entry}</h1>
            </Entry>

            <form onSubmit={blockForValidation} style={disabled ? {opacity: '0.5'} : {}} disabled={disabled ? "disabled" : ""}>
                <input required placeholder="Valor" type="number" min="0.01" step="any" onChange={e => setValue(e.target.value)}></input>
                <input required placeholder="Descrição" type="text" onChange={e => setDescription(e.target.value)}></input>
                <button type="submit">Salvar {entry}</button>
            </form>
        </BalanceContainer>
    )
}

const BalanceContainer = styled.main`
width: 100vw;
height: 100vh;

background: #8C11BE;
display: flex;
align-items: center;
flex-direction: column;
padding: 0 25px;

form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

input {
    margin-bottom: 10px;
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

const Entry = styled.section`
width: 100%;
display: flex;
margin: 25px 0 30px;

h1 {
    color: #FFFFFF;
    font-size: 26px;
    margin: 0px;
}
`