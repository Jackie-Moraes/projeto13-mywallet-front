import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import GlobalStyle from "./components/Normalize"

import Login from "./components/Login"
// import Register from "./components/Register"
// import Home from "./components/Home"
// import CashIn from "./components/CashIn"
// import CashOut from "./components/Cashout"

// import UserContext from "./contexts/UserContext"

export default function App() {
    const [userInfo, setUserInfo] = React.useState({
        name: "",
        image: "",
        email: "",
        token: "",
        percentage: "",
    })

    const totalInfo = {userInfo, setUserInfo};
    
    return (
        // <UserContext.Provider value={totalInfo}>
            <BrowserRouter>
                <GlobalStyle />
                <Routes>
                    <Route path="/" element={<Login />} />
                    {/* <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/cashin" element={<CashIn />} />
                    <Route path="/cashout" element={<CashOut />} /> */}
                </Routes>
            </BrowserRouter>
        // </UserContext.Provider>
    )
}