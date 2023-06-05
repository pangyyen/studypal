import React from "react";
import { Routes, Route } from 'react-router-dom';

// firebase import for user authentication
import AuthPage from "./scenes/authentication/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase-config";

// import scenes
import Topbar from "./components/Topbar";
import Sidebar from "./components/SideBar";
import Team from "./scenes/sidebar-scenes/team";
import Social from "./scenes/sidebar-scenes/social";
import Calendar from "./scenes/sidebar-scenes/calendar";
import StudyingJios from "./scenes/sidebar-scenes/dashboard";
import Account from "./scenes/sidebar-scenes/form";

// Material UI imports
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";


function App() {
  // MUI color theme
  const [theme, colorMode] = useMode();

  // user authentication
  const [user] = useAuthState(auth);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        { user ? (
          <div className="app">
          <Sidebar />
          <main className='content'>
            <Topbar />
            <Routes>
              <Route path="/" element={<StudyingJios />} />
              <Route path="/team" element={<Team />} />
              <Route path="/social" element={<Social />} />
              <Route path="/form" element={<Account />} /> 
              <Route path="/calendar" element={<Calendar />} />
            </Routes>
          </main>
        </div>
        ) : (
          <>     
          <Topbar />
          <AuthPage />
          </>
        )}
          
        
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
} 


export default App;
