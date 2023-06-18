import React from 'react';
import { Box, Button, TextField } from "@mui/material";
import Chip from '@mui/material/Chip';
import { useState, useEffect } from "react";
import MenuItem from '@mui/material/MenuItem';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import StudySessionCard from '../SessionCard';
import { useAuth } from '../../../authentication/auth-context';

import dayjs from 'dayjs';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimeField } from '@mui/x-date-pickers/TimeField';

import { createStudyingJio } from '../../../../firestoreOps'

// Functions for handling study session requests

export const joinSessionRequest = (session, currentUser) => {
    // Implement logic to send a join session request
  };


  export const InitiateSession = ({currentUser}) => {
    const [open, setOpen] = React.useState(false);
    const [startDate, setStartDate] = useState(dayjs(new Date()));
    const [startTime, setStartTime] = useState(dayjs(new Date()));

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleFormSubmit = (values) => {
      const sessionDetails = {...values, date:startDate.format('DD MMM YYYY'), time:startTime.format('h:mmA')}
      // console.log(sessionDetails.date.format('DD MMM YYYY'))

      // const testDate = sessionDetails.date.format('DD MMM YYYY')
      // console.log(dayjs(testDate).format('DD MMM YYYY'))

      // const testTime = sessionDetails.time.format('h:mmA')
      // console.log(testDate + ' ' + testTime)
      // console.log(dayjs(testDate + ' ' + testTime).format('DD MMM YYYY h m a'))

      createStudyingJio(sessionDetails)
      handleClose()
    };

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dropdownOptions = ["ERC", "The Study", "CAPT"]

    const checkoutSchema = yup.object().shape({
      venue: yup.string().required("required"),
      capacity: yup.string().required("required"),
      description: yup.string().required("required"),
      // email: yup.string().email("invalid email").required("required"),
      // contact: yup
      //   .string()
      //   .matches(phoneRegExp, "Phone number is not valid")
      //   .required("required"),
    });
    
    const initialValues = {
      venue: "",
      capacity: "",
      description: "",
      participants: [currentUser],
    };

    return (
      <Box>
        <Button variant="contained" color="secondary" onClick={handleClickOpen} endIcon={<AddCircleOutlineIcon />}>
          Initiate new Session
        </Button>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
          <DialogTitle>New Studying Jio</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{m:"10px"}}>
              please enter your jio's details
            </DialogContentText>
            <Formik 
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={checkoutSchema}
              
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
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(12, minmax(0, 1fr))"
                    sx={{
                      "& > div": { gridColumn: isNonMobile ? undefined : "span 6" },
                    }}
                  >
                    

                <Box sx={{ gridColumn: "span 5" }}>
                
                  <DatePicker label="Date" type="text"
                      value={startDate} sx={{ width:"48%", m:"1%"}}
                       onChange={(newValue) => setStartDate(newValue)}/>
                  <TimeField label="Date" type="text" 
                      value={startTime} sx={{ width:"48%" , m:"1%"}}
                       onChange={(newValue) => setStartTime(newValue)}/>
                
                </Box>


                    <TextField
                      fullWidth
                      select
                      variant="filled"
                      type="text"
                      label="Venue"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.venue}
                      name="venue"
                      error={!!touched.venue && !!errors.venue}
                      helperText={touched.venue && errors.venue}
                      sx={{ gridColumn: "span 5" }}
                    >
                        {dropdownOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Capacity"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.capacity}
                      name="capacity"
                      error={!!touched.capacity && !!errors.capacity}
                      helperText={touched.capacity && errors.capacity}
                      sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                      multiline
                      fullWidth
                      variant="filled"
                      type="text"
                      label="description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.description}
                      name="description"
                      error={!!touched.description && !!errors.description}
                      helperText={touched.description && errors.description}
                      sx={{ gridColumn: "span 12" }}
                    />


                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px">
                    <Button type="submit" color="secondary" variant="contained" onClick={handleClose} sx={{m:"5px"}}>
                      cancel
                    </Button>
                    <Button type="submit" color="secondary" variant="contained" sx={{m:"5px"}}>
                      initiate
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
            </DialogContent>
        </Dialog> 
      </Box>
    )
  };

