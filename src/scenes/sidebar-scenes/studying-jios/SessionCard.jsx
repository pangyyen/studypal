import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Box, Grid,  Paper, ButtonBase, styled} from "@mui/material";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import { useAuth } from "../../authentication/auth-context";
import { joinStudyingJio, leaveStudyingJio } from "../../../firestoreOps";
import { Navigate } from 'react-router';

// const useStyles = makeStyles({
//   card: {
//     marginBottom: "10px",
//   },
//   participantsContainer: {
//     marginTop: "10px",
//   },
//   participantInfo: {
//     marginBottom: "5px",
//   },
// });

const StudySessionCard = ({session, joinUser}) => {
    const { currentUser } = useAuth()
    const [participated, setParticipated] = useState(false);
    // console.log("current user uid: ", currentUser.uid)
    // console.log("join user uid", joinUser.uid)

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      });

      const handleJoin = () => {
        console.log("joinUser: ", joinUser.uid)
        console.log("session.id: ", session.sessionId)
        joinStudyingJio(joinUser, session)
        setParticipated(true)
        
      }

      const handleLeave = () => {
        // console.log("joinUser: ", joinUser.uid)
        // console.log("session.id: ", session.sessionId)
        leaveStudyingJio(joinUser, session)
        setParticipated(true)
        
      }


      return (
        <Grid item xs={6}>
          <Paper
            sx={{
              p: 2,
              margin: 'auto',
              height: 'auto',
              flexGrow: 1,
              backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
          >
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase sx={{ width: 128, height: 128 }}>
                  <Img alt="venue" src="../../../../assets/sessionTheStudy.jpg" />
                </ButtonBase>
              </Grid>

              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography  variant="subtitle1" >
                      {session.date}, {session.time}   @{session.venue}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                     description
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {session.participants.map((participant, i) => (
                        <Typography> 
                            {i+1}. {participant.displayName}, {participant.major} 
                        </Typography>
                      ))}
                    </Typography>
                  </Grid>
                  
                  <Grid container direction="row">
                    <Grid item sx={{m:"5px"}}>
                      <Button variant="contained" color="secondary" onClick={handleJoin} endIcon={<ForwardToInboxIcon />}>
                          Join 
                      </Button>
                    </Grid>

                    <Grid item sx={{m:"5px"}}>
                      <Button variant="contained" color="secondary" onClick={handleLeave} endIcon={<ForwardToInboxIcon />} >
                          Leave 
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Typography variant="subtitle1" component="div">
                    capacity: {session.participants.length}/{session.capacity}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>)
};

export default StudySessionCard;
