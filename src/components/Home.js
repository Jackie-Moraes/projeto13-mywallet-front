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
    const URL = "http://localhost:5000/balance";

    const {userInfo, setUserInfo} = useContext(UserContext);
    const {name, balance, token} = userInfo;
    const [userEntries, setUserEntries] = useState([]);
    const [refresh, setRefresh] = useState(0);
    let totalValue = 0;

    const navigator = useNavigate();

    const anyInfo = userEntries.length > 0;

    const userConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    useEffect(() => {
        if (!token) {
            alert('Session timed out. Please login again.');
            navigator('/');
        }
        const promise = axios.get(URL, userConfig);
        promise.catch(() => {
            alert('Session timed out. Please login again.');
            navigator('/');
        });

        promise.then((response) => {
            setUserInfo({...userInfo, balance: response.data})
            console.log(response.data);
            setUserEntries(response.data);
        })
    }, [refresh]);

    function balanceRedirect(type) {
        if (!type || type !== 'cashIn' && type !== 'cashOut') {
            return alert("Algo de errado aconteceu, e a culpa é do estagiário.");
        }

        setUserInfo({...userInfo, operation: type});
        navigator('/balance');
    }

    function logOff() {
        setUserInfo({});
        navigator('/')
    }

    return (
        <HomeContainer>
            <User>
                <h1>Olá, {name}</h1>
                <img onClick={logOff} src={LogOffImage}></img>
            </User>

            <EntriesContainer>
                <Entries style={anyInfo ? {} : {display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center"}}>
                    {anyInfo ? userEntries.map((entry, keyid) => {
                        const {description, value, operation} = entry;
                        const actualValue = value.replace(".", ",");
                        totalValue += parseFloat(value);
                        return (
                            <Entry key={keyid}>
                                <EntryContainer>
                                <Date>10/10</Date>
                                    <EntrySeparator>
                                        <Info>{description}</Info>
                                        <Value style={operation === "cashIn" ? {color: "#03AC00"} : {color: "#C70000"}}>{actualValue}{value % 1 == 0 ? ",00" : ""}</Value>
                                    </EntrySeparator>
                                </EntryContainer>
                            </Entry>
                        )
                    }) : <h2>Não há registros de entrada ou saída</h2>}
                </Entries>
                {anyInfo ? 
                <Saldo>
                    <h4>SALDO</h4>
                    <h4 style={{color: "#03AC00"}}>{totalValue.toString().replace(".", ",")}</h4>
                </Saldo> : ""}

            </EntriesContainer>
            
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

const EntriesContainer = styled.section`
    position: relative;
    width: 100%;
    height: 446px;
    background: #FFFFFF;
    border-radius: 5px;
    padding: 23px 11px;

    h2 { 
        max-width: 180px;
        font-size: 15px;
        color: #868686;
    }

    h4 {
        margin: 0px;
        font-size: 17px;
        font-weight: 700;
    }
`
const Entries = styled.section`
width: 100%;
height: 90%;

overflow: scroll;
`

const EntryContainer = styled.div`
width: 100%;
display: flex;
`

const EntrySeparator = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
`

const Entry = styled.div`
    width: 100%;
    margin-bottom: 10px;
    span {
        font-size: 16px;
    }
`

const Date = styled.span`
    color: #C6C6C6;
    margin-right: 10px;
`

const Info = styled.span`
    color: #000000;
    font-weight: 600;
`

const Value = styled.span`
margin-left: 60px;
`

const Saldo = styled.section`
    width: 93%;
    position: absolute;
    bottom: 10px;
    display: flex;
    justify-content: space-between;
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