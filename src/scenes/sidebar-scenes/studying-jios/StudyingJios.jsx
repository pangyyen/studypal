import { useAuth } from "../../authentication/auth-context"
import { collection, getDocs } from "firebase/firestore";

// import scenes & components
import Header from "../../../components/Header";
import Sidebar from "../../../components/SideBar";

// Materia-UI imports
import { Box } from "@mui/material";

import React, { useState, useEffect } from 'react';
import { Chip, Grid, IconButton, Paper, ButtonBase } from '@mui/material';
import { Card, CardContent, Typography, Button, styled } from "@mui/material";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import { db } from "../../../config/firebase-config"; // Assuming you have initialized and exported the Firebase Firestore instance as 'db'
import { InitiateSession } from './InitiateSessionWindow';
import { mockFilteredSessions } from "../../../data/mockData";
import SessionCard from "./SessionCard";


/**
 * Components that display the studying jios dashboard
 */
function  StudyingJios() {
    const { currentUser } = useAuth()

    const [sessions, setSessions] = useState([]);
    const [participated, setParticipated] = useState(false);
    const [filteredSessions, setFilteredSessions] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState('');


    useEffect(() => {
        // Fetch study sessions from Firestore and update state
        const fetchSessions = async () => {
            const querySnapshot = await getDocs(collection(db, "studySessions"));
            const sessionArray = []
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                sessionArray.push({...doc.data(), sessionId: doc.id})
              });
            setSessions(sessionArray);
        }

        fetchSessions();
    }, []);

    // useEffect(() => {
    //     // Apply filters whenever selectedDate or selectedPlace changes
    //     const filtered = filterByPlace(filterByDate(sessions, selectedDate), selectedPlace);
    //     setFilteredSessions(filtered);
    // }, [sessions, selectedDate, selectedPlace]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
      };
    
      const handlePlaceChange = (event) => {
        setSelectedPlace(event.target.value);
      };
    
    //   const handleJoinSession = (session) => {
    //     joinSessionRequest(session, currentUser);
    //   };
    
    //   const handleAcceptRequest = (session, request) => {
    //     acceptSessionRequest(session, request);
    //   };



    return (
        <Box display="flex">
            <Sidebar />
            <Box m="15px" flex="1">             
                {/* HEADER */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
                </Box>

                <Box>
                    {/* Top bar */}
                    <Grid container m="5px" direction="row" justifyContent="space-between">

                        <Grid item mt="10px">
                            {/* Implement filter chips */}
                            <Chip label="Filter by Date" sx={{m:"5px"}}/>
                            <Chip label="Filter by Place" />
                        </Grid>

                        {/* joining and initiating */}
                        <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        >
                            {/* <JoingRequest currentUser={currentUser} /> */}
                            <InitiateSession currentUser={currentUser}/>
                        </Grid>
                    </Grid>

                    {/* Study sessions */}
                    <Grid container spacing={2} columns={12}>
                        
                        {sessions.map(session =>
                            <SessionCard session={session} joinUser={currentUser}/>
                        )}
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

export default StudyingJios;