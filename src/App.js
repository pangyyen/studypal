import React from "react";
import { Routes, Route } from 'react-router-dom';

// firebase import for user authentication
import AuthPage from "./scenes/authentication/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase-config";

// import scenes
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/SideBar";
import Team from "./scenes/sidebar-scenes/team";
import Contacts from "./scenes/sidebar-scenes/contacts";
import Calendar from "./scenes/sidebar-scenes/calendar";
import Dashboard from "./scenes/sidebar-scenes/dashboard";
import Form from "./scenes/sidebar-scenes/form";

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
            {console.log(user)}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/form" element={<Form />} /> 
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
