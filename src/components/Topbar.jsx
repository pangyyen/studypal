import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";

// User authentication import
import { auth } from "../config/firebase-config";
import { signOut } from "firebase/auth";
import { useAuth } from "../scenes/authentication/auth-context";

// Material UI imports
import { Box, IconButton, useTheme , InputBase, Button} from "@mui/material"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";  
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SearchIcon from "@mui/icons-material/Search";  
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const  Topbar = () => { 
    const theme = useTheme();  // theme object, came from ThemeProvider in App.js
    const colors = tokens(theme.palette.mode); // mui color object
    const colorMode = useContext(ColorModeContext) // object containing toggle function

    // User Authentication
    const { currentUser, logout } = useAuth()

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
        {/* <IconButton>
          <NotificationsOutlinedIcon /> 
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton> */}

        {!currentUser && <Button 
          variant="contained" color="secondary" endIcon={<PersonAddIcon />}
            href='/register'>
            Register
          </Button>}

        {!currentUser && <Button 
          variant="contained" color="secondary" endIcon={<LoginIcon />}
          href='/login'>
            Login
          </Button>}

      
        {currentUser && <Button 
        variant="contained" color="secondary" endIcon={<LogoutIcon />} onClick={logout}>
          Log Out
        </Button> }

        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        
      </Box>
    </Box>
    );
};

export default Topbar;