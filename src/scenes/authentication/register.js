import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useAuth } from "./auth-context";
import useMounted from "../../hooks/useMounted";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

import { useEffect } from "react";
import { useState } from "react";
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  IconButton,
  Button,
  Input,
  Checkbox,
  Alert,
  Stack,
  Card,
  Paper,
  Box,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import Sidebar from "../../components/SideBar";
import { useLocation, useNavigate } from "react-router";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters")
    .max(20, "Password must not exceed 20 characters"),
});

const initialValues ={
  email: "",
  password: "",
  rememberMe: false,
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();

  const { currentUser, register } = useAuth()
  const mounted = useMounted();
  const navigate = useNavigate();

  // handle password show or hide
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  function handleRedirectToOrBack() {
    navigate(location.state?.from ?? '/', {replace : true})
  }

  

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    // e.preventDefault()
    if (!values.email || !values.password) {
      alert("Credentials not valid")
      return;
    }

    console.log(values)

    // login logic here
    setIsSubmitting(true)
    register(values.email, values.password)
    .then(res => handleRedirectToOrBack())
    .catch(error => {
      console.log(error.message)
      alert("unable to register")
    })
    .finally(() => {
      mounted.current && setIsSubmitting(false)
    })
    console.log({currentUser})    
  };

  // const handleFormSubmit = (values) => {
  //   console.log(values);
  // };

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  return (
      <Box m="20px">
        <Header title ="REGISTER" subtitle="register an account and start seeking for studypal!" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
          <Box 
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={!!touched.email && !!errors.email}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 2"}}
              margin="normal" 
            />

            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="password"
              onBlur={handleBlur}
              onChange={(handleChange)}
              value={values.password}
              name="password"
              error={!!touched.password && !!errors.password}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 2" }}

              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained" isLoading={isSubmitting}>
              Register
            </Button>
          </Box>
          </form>
        )}
        </Formik>
        </Box>
  );
};