import React from 'react';
import { Box, Button, TextField, Card, CardContent, Typography, CardActions} from "@mui/material";
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
import RequestComponent from './JoiningRequestComponent';
import { useAuth } from '../../authentication/auth-context';

import dayjs from 'dayjs';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimeField } from '@mui/x-date-pickers/TimeField';

import { createStudyingJio, displayRequest } from '../../../firestoreOps'
import { db } from "../../../config/firebase-config";
import { doc, setDoc, getDoc, addDoc, collection, serverTimestamp, query, where, getDocs } from "firebase/firestore"


// Functions for handling study session requests

  export const JoingRequest = ({currentUser}) => {
    const [open, setOpen] = React.useState(false);
    const [requests, setRequests] = useState([]);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };



    useEffect(() => {
        // Fetch study sessions from Firestore and update state
        const fetchSessions = async () => {
            const querySnapshot = await getDocs(collection(db, "studySessions"), where("hostUid", "==", currentUser.uid));
            const requestsArray = []
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                requestsArray.push(doc.data())
              });
              setRequests(requestsArray);
        }

        fetchSessions();
        requests.forEach((request => {
            console.log(request)
            console.log(request.id, "=> ", request)
        }))
    }, []);

    return (
      <Box>
        <Button variant="contained" color="secondary" onClick={handleClickOpen} endIcon={<AddCircleOutlineIcon />}>
            Joining Request
        </Button>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
          <DialogTitle>Joining Request</DialogTitle>

          <DialogContent>
            <DialogContentText sx={{m:"10px"}}>
                {requests.map(request =>
                            <RequestComponent request={request} currentUser={currentUser}/>
                        )}
            </DialogContentText>

            </DialogContent>
        </Dialog> 
      </Box>
    )
  };

