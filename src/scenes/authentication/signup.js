import React, { useState } from "react";
import {
    createUserWithEmailAndPassword
  } from "firebase/auth";
  import { auth } from "../../config/firebase-config";

// Material UI Imports
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Button,
  Input,
  Checkbox,
  Alert,
  Stack,
} from "@mui/material";

import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';

export default function SignUp() {

    //Password field
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    // Inputs
    const [usernameInput, setUsernameInput] = useState();
    const [emailInput, setEmailInput] = useState();
    const [passwordInput, setPasswordInput] = useState();

    // Input Error
    const [usernameError, setUserNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    // Form Validity
    const [formValid, setFormValid] = useState(null);
    const [signUpSuccess, setSignUpSuccess] = useState(false);

    // Validation for onBlur Username
    const handleUsername = () => {
        if(!usernameInput || usernameInput.length < 5 || usernameInput.length > 20) {
            setUserNameError(true);
            return;
        }
        setUserNameError(false);
    }

    // Validation for onBlur email
    const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    const handleEmail = () => {
        if(!isEmail(emailInput)) {
            setEmailError(true);
            return;
        }
        setEmailError(false);
    }

    // Validation for onBlur Password
    const handlePassword = () => {
        if(!passwordInput || passwordInput.length < 5 || passwordInput.length > 20) {
            setPasswordError(true);
            return;
        }

        setPasswordError(false);
    }

    // register function
    const register = async () => {
        try {
          const user = await createUserWithEmailAndPassword(
            auth,
            emailInput,
            passwordInput
          );
        } catch (error) {
          alert("error " + error.message);
        }
      };

    // Submission of sign up form
    const handleSubmit = (event) => {
        event.preventDefault();
        
        
        let errorMessages = [];
        if (usernameError || !usernameInput) {
          errorMessages.push("Username must be between 5 - 20 characters long");
        }
        if (emailError || !emailInput) {
          errorMessages.push("Email is invalid");
        }     
        if (passwordError || !passwordInput) {
          errorMessages.push("Password must be between 5 - 20 characters long");
        }

        if (errorMessages.length !== 0 ) {
            setFormValid(errorMessages.join("; ") + ". Please re-enter");
            setSignUpSuccess(false);
            return;
        } else {
            setFormValid(null);
            setSignUpSuccess(true);

            console.log(usernameInput);
            console.log(emailInput);
            console.log(passwordInput);
            register();
            return;
        }
    }

    return (
        <div>   
            <p>
                <TextField
                id="standard-username"
                label="Username"
                value={usernameInput}
                onChange={(event) => {
                    setUsernameInput(event.target.value);
                  }}
                error={usernameError}
                onBlur={handleUsername}
                variant="standard"
                fullWidth
                size="small"
                />
            </p>

            <p>
                <TextField
                id="standard-email"
                label="Email"
                value={emailInput}
                onChange={(event) => {
                    setEmailInput(event.target.value);
                  }}
                error={emailError}
                onBlur={handleEmail}
                variant="standard"
                fullWidth
                size="small"
                />
            </p>

            <p>
                <FormControl sx={{ m: 0, width: '100%' }} variant="standard">
                    <InputLabel error={passwordError} htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        fullWidth
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={passwordInput}
                        onChange={(event) => {
                            setPasswordInput(event.target.value);
                        }}
                        error={passwordError}
                        onBlur={handlePassword}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                </FormControl>
            </p>

            <p> 
                <Button onClick={handleSubmit} fullWidth variant="contained" startIcon={<LoginIcon />}>
                    Sign Up
                </Button>

                <p>
                    {formValid && <Alert severity="error">{formValid}</Alert>}
                </p>
                <p>
                    {signUpSuccess && <Alert severity="success">Form Submitted Successfully</Alert>}
                </p>
            </p>
        </div>
    )
}
