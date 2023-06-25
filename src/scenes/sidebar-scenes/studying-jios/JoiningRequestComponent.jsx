import React from "react";
import { Card, CardContent, Typography, Button, Grid, Paper} from "@mui/material";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import { requestToJoinSession } from "../../../firestoreOps";

const handleAcceptButton = (request) => {
    console.log(request)
}

const handleRejectButton = (request) => {
    console.log(request)
}

const RequestComponent = ({request}) => {
    return (
        <Paper>
            <Grid container m="5px" direction="row" justifyContent="space-between">
                <Grid item mt="10px">
                    <Typography variant="body1" component="p">
                        {request.session.date}
                    </Typography>
                </Grid>

                {/* joining and initiating */}
                <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                >
                <Button color="secondary" onClick={() => handleAcceptButton(request)}>
                    Accept
                </Button>
                <Button color="secondary" onClick={() => handleRejectButton(request)}>
                    Reject
                </Button>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default RequestComponent;