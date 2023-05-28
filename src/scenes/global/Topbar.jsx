import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";

// User authentication import
import AuthPage from "../authentication/auth";
import { auth } from "../../config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

// Material UI imports
import { Box, IconButton, useTheme , InputBase} from "@mui/material"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";  
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";  
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";  
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";  
import SearchIcon from "@mui/icons-material/Search";  
import LogoutIcon from '@mui/icons-material/Logout';

const  Topbar = () => { 
    const theme = useTheme();  // theme object, came from ThemeProvider in App.js
    const colors = tokens(theme.palette.mode); // mui color object
    const colorMode = useContext(ColorModeContext) // object containing toggle function

    // User Authentication
    const [user] = useAuthState(auth);

    const signUserOut = async () => {
      await signOut(auth);
    };

    // Box allows CSS props to be written directly in the compoenent 
    return (
    <Box display="flex" justifyContent="space-between" p={2}> 
        {/* SEARCH BAR*/ }
        <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />

        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        {/* <IconButton>
          <NotificationsOutlinedIcon /> 
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton> */}
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
        <IconButton>
          <LogoutIcon onClick={signUserOut} />
        </IconButton>
      </Box>
    </Box>
    );
};

export default Topbar;