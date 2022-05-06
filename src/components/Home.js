import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import LogOffImage from "./../assets/LogOff.svg";
import PlusSymbol from "./../assets/plus.svg";
import MinusSymbol from "./../assets/minus.svg";
import UserContext from "../contexts/UserContext";

export default function Home() {
    const {userInfo, setUserInfo} = useContext(UserContext);
    const {name, balance, token} = userInfo;
    const [refresh, setRefresh] = useState(0);
    const [userEntries, setUserEntries] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        if (!token) {
            alert('Session timed out. Please login again.');
            navigator('/');
        }
        setUserEntries(balance);
    }, [refresh]);

    function balanceRedirect(type) {
        if (!type || type !== 'cashIn' && type !== 'cashOut') {
            return alert("Algo de errado aconteceu, e a culpa é do estagiário.");
        }

        setUserInfo({...userInfo, operation: type});
        navigator('/balance');
    }

    return (
        <HomeContainer>
            <User>
                <h1>Olá, {name}</h1>
                <img src={LogOffImage}></img>
            </User>

            <Entries style={userEntries.length > 0 ? {} : {display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center"}}>
                {userEntries.length > 0 ? "" : <h2>Não há registros de entrada ou saída</h2>}
            </Entries>
            
            <NewEntriesContainer>
                <NewEntry>
                    <img src={PlusSymbol} onClick={() => {
                        balanceRedirect('cashIn');
                    }} />
                    <h3>Nova<br/> entrada</h3>
                </NewEntry>

                <NewEntry>
                    <img src={MinusSymbol} onClick={() => {
                        balanceRedirect('cashOut');
                    }} />
                    <h3>Nova<br/> saída</h3>
                </NewEntry>
            </NewEntriesContainer>
        </HomeContainer>
    )
}

const HomeContainer = styled.main`
width: 100vw;
height: 100vh;

background: #8C11BE;
display: flex;
align-items: center;
flex-direction: column;
padding: 0 25px;
`

const User = styled.section`
width: 100%;

display: flex;
justify-content: space-between;

margin: 25px 0 20px;

h1 {
    color: #FFFFFF;
    font-size: 26px;
    margin: 0px;
}

img {
    width: 20px;
}
`

const Entries = styled.section`
width: 100%;
height: 446px;
background: #FFFFFF;
border-radius: 5px;

h2 { 
    max-width: 180px;
    font-size: 15px;
    color: #868686;
}
`

const NewEntriesContainer = styled.section`  
    width: 100%;
    margin-top: 14px;
    display: flex;
    justify-content: space-between;
`

const NewEntry = styled.div`
width: 155px;
height: 114px;
background: #A328D6;
border-radius: 5px;
padding: 10px;

h3 {
    margin: 26px 0;
    font-size: 17px;
    color: #FFFFFF;
}
`