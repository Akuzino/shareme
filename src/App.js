import React, {useEffect} from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./container/Home";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { fetchUser } from "./utils/fetchUser";

const App = () => {
    // const navigate = useNavigate();

    // useEffect(() => {
    //     const user = fetchUser();

    //     if(!user) navigate('/login') 
    // }, []);

    return (
        <GoogleOAuthProvider clientId="938038087085-ocq7m5ncf7o3cadsdvmbejcbgfsh3o5r.apps.googleusercontent.com">
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="/*" element={<Home />} />
        </Routes>
        </GoogleOAuthProvider>
    );
};

export default App;
