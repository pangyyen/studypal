import React from "react";
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";

// Material UI imports
import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";
import Paper from "@mui/material/Paper";
import LockIcon from "@mui/icons-material/Lock";

import Switch from "@mui/material/Switch";
import { useState } from "react";
import Login from "./login";
import SignUp from "./signup";


function AuthPage() {
    const [theme, colorMode] = useMode();
    const [checked, setChecked] = useState(false);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };


    return (
        <div className="App">
            <Paper elevation={3} style={{ padding: "10px", paddingBottom: "50px" }}>
                <div align="center">
                {checked ? (
                    <Chip
                    icon={<LockIcon />}
                    label="Log In"
                    variant="outlined"
                    color="info"
                    />
                ) : (
                    <Chip
                    icon={<FaceIcon />}
                    label="Sign Up"
                    variant="outlined"
                    color="info"
                    />
                )}
                <br />

                <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                />
                </div>

                {checked ? <Login /> : <SignUp />}
            </Paper>
        </div>
    );
  } 

  export default AuthPage;