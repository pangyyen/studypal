import { useAuth } from "../authentication/auth-context"


// import scenes & components
import Header from "../../components/Header";
import Sidebar from "../../components/SideBar";

// Materia-UI imports
import { Box } from "@mui/material";

const  StudyingJios = () => {
    const { currentUser } = useAuth()
    return (
        <Box display="flex">
            <Sidebar />
            <Box m="20px" flex="1">             
                {/* HEADER */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
                </Box>
            </Box>
        </Box>
    )
}

export default StudyingJios;