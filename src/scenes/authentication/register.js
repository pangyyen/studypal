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
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';

import { mockDataModule } from "../../data/mockData";
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
import { registerUserInfo } from "../../firestoreOps";


const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters")
    .max(20, "Password must not exceed 20 characters")
});

const initialValues ={
  email: "",
  password: "",
  rememberMe: false,
};

export default function Register() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
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

  const handleFormSubmit = async (values) => {
    // e.preventDefault()
    if (!values.email || !values.password) {
      alert("Credentials not valid")
      return;
    }
    // login logic here
    setIsSubmitting(true)
    register(values.email, values.password)
    .then(res => {
      registerUserInfo({...values, modules:selectedModules}, res.user.uid)
      handleRedirectToOrBack()
    })
    .catch(error => {
      console.log(error.message)
      alert("unable to register")
    })
    .finally(() => {
      mounted.current && setIsSubmitting(false)
    })
    console.log({currentUser})    
  };

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  // handle modules selection
  const [selectedModules, setSelectedModules] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState(mockDataModule);

  const handleModuleAdd = (module) => {
    setSelectedModules((prevModules) => [...prevModules.filter((m) => m !== module), module]);
    setDropdownOptions((prevOptions) =>
      prevOptions.filter((option) => option.code !== module)
    );
  };

  const handleModuleRemove = (module) => {
    setSelectedModules((prevModules) =>
      prevModules.filter((m) => m !== module)
    );
    setDropdownOptions((prevOptions) => [...prevOptions, { code: module }]);
  };

  useEffect(() => {
    // Update dropdown options when selectedModules change
    setDropdownOptions((prevOptions) =>
      prevOptions.filter(
        (option) => !selectedModules.includes(option.code)
      )
    );
  }, [selectedModules]);

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
          display = "grid"
          gap="20px"
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

            <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Display Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.displayName}
                name="displayName"
                error={!!touched.displayName && !!errors.displayName}
                helperText={touched.displayName && errors.displayName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Full Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fullName}
                name="fullName"
                error={!!touched.fullName && !!errors.fullName}
                helperText={touched.fullName && errors.fullName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Major(s)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.major}
                name="major"
                error={!!touched.major && !!errors.major}
                helperText={touched.major && errors.major}
                sx={{ gridColumn: "span 3" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Year"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.year}
                name="year"
                error={!!touched.year && !!errors.year}
                helperText={touched.year && errors.year}
                sx={{ gridColumn: "span 1" }}
              />
              
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Telegram Username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.teleName}
                name="teleName"
                error={!!touched.teleName && !!errors.teleName}
                helperText={touched.teleName && errors.teleName}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                select
                variant="filled"
                type="text"
                label="Module"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.mod}
                name="mod"
                error={!!touched.mod && !!errors.mod}
                helperText={touched.mod && errors.mod}
                sx={{ gridColumn: "span 1" }}
              >
                  {dropdownOptions.map((option) => (
                    <MenuItem key={option.code} value={option.code}>
                      {option.code}
                    </MenuItem>
                  ))}
              </TextField>

              <Button
                  type="button"
                  color="primary"
                  variant="contained"
                  onClick={() => handleModuleAdd(values.mod)}
                  sx={{ gridColumn: 'span 1' }}
                >
                  Add
                </Button>

                <Box gridColumn="span 4">
                  {selectedModules.map((module) => (
                    <Chip
                      key={module}
                      label={module}
                      onDelete={() => handleModuleRemove(module)}
                      sx={{ marginRight: '10px' }}
                    />
                  ))}
                </Box>
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" >
                Register
              </Button>
          </Box>
          </form>
        )}
        </Formik>
        </Box>
  );
};