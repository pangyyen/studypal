import React from "react";
import SessionCard from "../scenes/sidebar-scenes/studying-jios/SessionCard";
import { Grid } from "@mui/material";
import { useAuth } from "../scenes/authentication/auth-context";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useState, useEffect } from "react";

const StudyJios = (value) => {
    const moduleCode = value.moduleCode;
    const [sessions, setSessions] = useState([]);
    const { currentUser } = useAuth();
    useEffect(() => {
        // Fetch study sessions from Firestore and update state
        const fetchSessionsWithCommonModule = async () => {
            const querySnapshot = await getDocs(
                collection(db, "studySessions")
            );
            const sessionArray = [];

            querySnapshot.forEach((doc) => {
                const sessionData = doc.data();
                const participants = sessionData.participants || [];

                // Check if any participant's modules contain the current user's module
                const hasCommonModule = participants.some((participant) =>
                    participant.modules.includes(moduleCode)
                );

                if (hasCommonModule) {
                    // If there is a common module, add the session data to the array with the sessionId
                    sessionArray.push({ ...sessionData, sessionId: doc.id });
                }
            });
            setSessions(sessionArray);
        };

        fetchSessionsWithCommonModule();
    }, [moduleCode]);

    return (
        <div>
            <div 
                className="text-center text-gray-500 dark:text-gray-400 text-sm mb-2"
            >Those who joined a study session and are also taking {moduleCode} will be shown here</div>
            {/* Study sessions */}
            <Grid container spacing={2} columns={12}>
                {sessions.map((session) => (
                    <SessionCard session={session} joinUser={currentUser} />
                ))}
            </Grid>
        </div>
    );
};

export default StudyJios;
