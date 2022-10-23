import React from "react";
// import {GoogleLogin, googleLogout} from '@react-oauth/google';
import { GoogleLogin } from "@react-oauth/google";

import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";

import { GoogleOAuthProvider } from "@react-oauth/google";

import { client } from "../client";

const Login = () => {
    const navigate = useNavigate();

    // const credentialResponse = (response) => {
    //     localStorage.setItem("user", JSON.stringify(response));
    //     console.log(response);
    //     const { name, clientId, imageUrl } = response;

    //     const doc = {
    //         _id: clientId,
    //         _type: "user",
    //         userName: clientId,
    //         image: imageUrl,
    //     };

    //     client.createIfNotExists(doc).then(() => {
    //         navigate("/", { replace: true });
    //     });
    // };

    const responseGoogle = (response) => {
        const base64Url = response.credential.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        window
        .atob(base64)
        .split('')
        .map((c) => {
            return `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`;
        })
        .join(''),
        );
        const { name, sub, picture } = JSON.parse(jsonPayload);
        localStorage.setItem('user', sub);
        
    const doc = {
        _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    }

    client.createIfNotExists(doc).then(() => {
        navigate('/', { replace: true });
      });
    }

    return (
        <div className="flex justify-start items-center flex-col h-screen">
            <div className="relative w-full h-full">
                <video
                    src={shareVideo}
                    type="video/mp4"
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className="w-full h-full obejct-cover"
                />

                <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
                    <div className="p-5">
                        <img src={logo} width="130px" alt="logo" />
                    </div>

                    <div className="shadow-2xl">
                        {/* <GoogleLogin 
                        clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                        render={(renderProps) => (
                            <button type="button" className='bg-mainColor flex justify-center item-center p-3 rounded-lg cursor-pointer outline-none'
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            >
                                <FcGoogle className='mr-4' /> 
                            </button>
                        )}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                    /> */}
                        <GoogleLogin
                            // onSuccess={credentialResponse}
                            // onError={() => {
                            //     console.log("Login Failed");
                            // }}
                            // cookiePolicy="single_host_origin"   
                        
                            onSuccess={(codeResponse) => responseGoogle(codeResponse)}
                            onError={() => {
                              console.log('Login Failed');
                            }}
                            size="large"
                            text="Sign in with Google"
                            shape="square"
                            width="12px"
                        
                        />
                        ;
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
