import React from "react";
import { Routes, Route, redirect, useLocation, Navigate } from 'react-router-dom';

// firebase import for user authentication
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase-config";
import { useAuth } from "./scenes/authentication/auth-context";

// import scenes & components
import Topbar from "./components/Topbar";
import Sidebar from "./components/SideBar";
import Team from "./scenes/sidebar-scenes/Team";
import Social from "./scenes/sidebar-scenes/Social";
import Calendar from "./scenes/sidebar-scenes/CalendarMain";
import StudyingJios from "./scenes/sidebar-scenes/studying-jios/StudyingJios";
import Account from "./scenes/sidebar-scenes/account";

// Material UI imports
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import AuthContextProvider from "./scenes/authentication/auth-context";
import Login from "./scenes/authentication/login";
import Register from "./scenes/authentication/register";
import Message from "./scenes/sidebar-scenes/Message";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

/**
 * Root component of the application.
 */
function App() {
  // MUI color theme
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <AuthContextProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="app">
              <main className='content'>
                <Topbar />
                <Routes>
                  <Route exact path="/" element={<ProtectedRoute element={<StudyingJios />} />}/>
                  <Route exact path="/*" element={<ProtectedRoute element={<StudyingJios />} />}/>
                  <Route exact path='/login' element={<ProtectedRoute element={<Login />} />} />
                  <Route exact path='/register' element={<ProtectedRoute element={<Register />} />} />
                  <Route exact path="/team" element={<ProtectedRoute element={<Team />} />} />
                  <Route exact path="/social" element={<ProtectedRoute element={<Social />} />} />
                  <Route exact path="/form" element={<ProtectedRoute element={<Account />} />} /> 
                  <Route exact path="/calendar" element={<ProtectedRoute element={<Calendar />} />} />
                  <Route exact path="/message" element={<ProtectedRoute element={<Message />} />} />
                </Routes>
              </main>
            </div>
            </LocalizationProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
} 

/**
 * Protected route component that checks authentication status before rendering the route element.
 * If the user is authenticated, it renders the given element; otherwise, it redirects to the login page.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.element - The element to be rendered if the user is authenticated.
 * @returns {React.ReactNode} - Protected route element.
 */
function ProtectedRoute({ element }) {
  const { currentUser } = useAuth();
  const { pathname, state } = useLocation();

  if (pathname === '/login' || pathname === '/register') {
    // If the user is already authenticated, redirect to the previous page or the home page.
    return currentUser ? <Navigate to={state?.from ?? '/'} /> : element;
  }

  // If the user is not authenticated, redirect to the login page with the current path as the 'from' state.
  return currentUser ? element : <Navigate to="/login" state={{ from: pathname }} />;
}


export default App;