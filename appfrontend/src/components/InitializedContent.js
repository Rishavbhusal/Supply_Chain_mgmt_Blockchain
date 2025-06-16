import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import HomeWrapper from "./wrapper/HomeWrapper";
import Marketplace from "./Marketplace";

import Register from "./Register";
import ConfirmRegistration from "./ConfirmRegistration";

import Header from "./static/Header";
import Footer from "./static/Footer";
import { CircularPageLoader } from "./static/CircularPageLoader";
import NotFound from "./static/NotFound";
import NewUser from "./static/NewUser";
import RegistrationSuccess from "./static/RegistrationSuccess";
import RegistrationFailure from "./static/RegistrationFailure";

import { USER_TYPES } from "./enum/UsersEnum";

import "../css/App.css";

/**
 * Includes conditional application routing and user registration logic after app initialization.
 * 
 * @author syuki
 */
export const InitializedContent = ({contract, currentAddress}) => {
    const [isAuth, setIsAuth] = useState();
    const [userType, setUserType] = useState();

    useEffect(() => {
        async function checkUserType() {
            if(contract) {
                try {
                    const isProducer = await contract.isProducer();
                    const isDistributor = await contract.isDistributor();
                    const isRetailer = await contract.isRetailer();
                    
                    if(isProducer) {
                        setUserType(USER_TYPES[0]);
                        setIsAuth(true);
                    } else if(isDistributor) {
                        setUserType(USER_TYPES[1]);
                        setIsAuth(true);
                    } else if(isRetailer) {
                        setUserType(USER_TYPES[2]);
                        setIsAuth(true);
                    } else {
                        setIsAuth(false);
                    }
                } catch (error) {
                    console.error("Error checking user type:", error);
                    setIsAuth(false);
                }
            }
        }
        checkUserType();
    }, [contract, currentAddress]);

    function updateIsAuth(auth) {
        setIsAuth(auth);
    }

    function updateUserType(type) {
        setUserType(type);
    }

    if(isAuth != undefined) {
        return (
            <Router>
                <Header isAuthenticated={isAuth} userType={userType} contract={contract} currentAddress={currentAddress} /> 
                <div>
                    <Routes>
                        <Route exact path="/" element={
                            <Marketplace 
                                contract={contract} 
                                currentAddress={currentAddress} 
                                isAuthenticated={isAuth} 
                            />
                        } />
                        <Route exact path="/dashboard" element={
                            isAuth ? (
                                <HomeWrapper 
                                    contract={contract} 
                                    currentAddress={currentAddress} 
                                    isAuthenticated={isAuth} 
                                    userType={userType} 
                                    updateAuth={updateIsAuth} 
                                    updateUserType={updateUserType} 
                                />
                            ) : (
                                <Navigate to="/" replace />
                            )
                        } />
                        <Route exact path="/new-user" element={<NewUser isAuthenticated={isAuth} />} /> 
                        <Route exact path="/register" element={<Register contract={contract} currentAddress={currentAddress} isAuthenticated={isAuth} />} /> 
                        <Route exact path="/confirm-registration" element={<ConfirmRegistration contract={contract} currentAddress={currentAddress} isAuthenticated={isAuth} />} />   
                        <Route exact path="/registration-success" element={
                            <RegistrationSuccess 
                                isAuthenticated={isAuth} 
                                updateAuth={updateIsAuth}
                            />
                        } />   
                        <Route exact path="/registration-failure" element={<RegistrationFailure isAuthenticated={isAuth} />} />   
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
                <Footer isAuthenticated={isAuth} />
            </Router>
        );
    } else {
        return (<CircularPageLoader open = {true} />);
    }
}
