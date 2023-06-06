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
import StudyingJios from "./scenes/sidebar-scenes/StudyingJios";
import Account from "./scenes/sidebar-scenes/account";

// Material UI imports
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import AuthContextProvider from "./scenes/authentication/auth-context";
import Login from "./scenes/authentication/login";
import Register from "./scenes/authentication/register";
import Message from "./scenes/sidebar-scenes/Message";


function App() {
  // MUI color theme
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <AuthContextProvider>
            <div className="app">
            <main className='content'>
              <Topbar />
              <Routes>
              <Route exact path="/" element={<ProtectedRoute element={<StudyingJios />} />}/>
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
        </AuthContextProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
} 

function ProtectedRoute({ element }) {
  const { currentUser } = useAuth();
  const { pathname, state } = useLocation();

  if (pathname === '/login' || pathname === '/register') {
    return currentUser ? <Navigate to={ state?.from ?? '/profile'} /> : element;
  }

  return currentUser ? element : <Navigate to="/login" state={{ from: pathname }} />;
}


export default App;


        {/* { user ? (
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
        )} */}

        // function ProtectedRoute(props) {
//   const { currentUser } = useAuth()
//   const { path } = props
//   // console.log('path', path)
//   const location = useLocation()
//   // console.log('location state', location.state)

//   if (
//     path === '/login' ||
//     path === '/register' 
//     // path === '/forgot-password' ||
//     // path === '/reset-password'
//   ) {
//     return currentUser ? (
//       <Navigate to={location.state?.from ?? '/profile'} />
//     ) : (
//       <Route {...props} />
//     )
//   }

//   return currentUser ? (
//     <Route {...props} />
//   ) : (
//     <Navigate
//       to={{
//         pathname: '/login',
//         state: { from: path },
//       }} 
//     />
//   )
// }