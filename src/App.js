import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import GlobalStyle from "./components/Normalize"

import Login from "./components/Login"
import Register from "./components/Register"
import Home from "./components/Home"
import Balance from "./components/Balance"

import UserContext from "./contexts/UserContext"

export default function App() {
    const [userInfo, setUserInfo] = React.useState({
        name: "",
        token: ""
    })

    const totalInfo = {userInfo, setUserInfo};
    
    return (
        <UserContext.Provider value={totalInfo}>
            <BrowserRouter>
                <GlobalStyle />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/balance" element={<Balance />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}