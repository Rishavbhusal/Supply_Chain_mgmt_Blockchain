import React, { useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";
import Backdrop from '@mui/material/Backdrop';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import Divider from '@mui/material/Divider';

import "../../css/NewUser.css";

/**
 * Renders upon successful registration. 
 * Redirects to the dashboard after delay.
 * 
 * @author syuki
 */
const RegistrationSuccess = ({isAuthenticated, updateAuth}) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Update authentication state immediately
        if (updateAuth) {
            updateAuth(true);
        }
        
        // Navigate to dashboard after a short delay
        const timer = setTimeout(() => {
            navigate('/dashboard', {
                state: {
                    auth: true,
                    userType: location.state.userType
                }
            });
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate, location.state, updateAuth]);

    return (
        <div className="new-user-body">
            <Backdrop open className="backdrop-design">
                <Paper elevation={0} className="new-user-paper">
                    <center>
                        <Typography style={{ paddingTop: 30, fontWeight: "500" }} component="h1" variant="h5">Successfully Registered!</Typography>
                        <CheckCircleOutlineOutlinedIcon style = {{ paddingTop: 40, fontSize: 200, color: "#2D323F"}} 
                            aria-label="success tick" />
                        <p style={{ paddingBottom: "0" }}>Redirecting to dashboard...</p>
                        <p style={{ fontSize: 12, paddingTop: 0 }}>Please <Link className="ModalLink" href="/dashboard">click here</Link> if you're not redirected automatically.</p>
                        <Divider style={{ marginBottom: 20 }} />
                        {/* social media */}
                        <Grid container justifyContent="center">
                            <Grid item xs={2}>
                                <Link className="ModalLink" href="https://github.com/Shira98" target="_blank" >{" "}<GitHubIcon /></Link>
                            </Grid>
                            <Grid item xs={1}> 
                                <Link className="ModalLink" href="https://twitter.com/d_praneetha" target="_blank" >{" "}<TwitterIcon /></Link>
                            </Grid>
                            <Grid item xs={2}>
                                <Link className="ModalLink" href="https://www.linkedin.com/in/praneetha-d-13996517a/" target="_blank">{"   "}
                                    <LinkedInIcon />
                                </Link>
                            </Grid>
                        </Grid>
                        <br/>
                        Powered by <Link className="ModalLink" href="https://mui.com/" target="_blank" >material-ui</Link> and 
                        <Link className="ModalLink" href="https://reactjs.org/" target="_blank" 
                        > {" "}React</Link> &copy; {new Date().getFullYear()} 
                    </center>
                </Paper>
            </Backdrop>
        </div>
    );
};

export default RegistrationSuccess;