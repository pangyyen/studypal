
import {
  Box,
} from "@mui/material";
import Header from "../../components/Header"
import { tokens } from "../../theme"
import Sidebar from "../../components/SideBar"
import { useAuth } from "../authentication/auth-context"

export default function Message() {
  const { currentUser } = useAuth()

  return (
    <Box display="flex">
      <Sidebar />
      <Box m="20px">
        <Header title="Message" subtitle="Contact your studypals" />

        <Box display="flex" justifyContent="space-between">
            Main Content
        </Box>
      </Box>
    </Box>
  )
}

