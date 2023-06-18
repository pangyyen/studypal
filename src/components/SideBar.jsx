import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { tokens } from "../theme";
import "react-pro-sidebar/dist/css/styles.css";

// User authentication import
import { useAuth } from "../scenes/authentication/auth-context";

// material UI
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import SendIcon from '@mui/icons-material/Send';

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    );
  };

function Sidebar() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    // user authentication
    const { currentUser } = useAuth();

    return (
        <Box
        // CSS style to override sidebar style
        sx={{
          "& .pro-sidebar-inner": {
            background: `${colors.primary[400]} !important`,
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
          },
          "& .pro-inner-item:hover": {
            color: "#868dfb !important",
          },
          "& .pro-menu-item.active": {
            color: "#6870fa !important",
          },
        }}
      >
        <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
            {/* when it is collapsed */}
            <MenuItem
                onClick={() => setIsCollapsed(!isCollapsed)}
                icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                style={{
                margin: "10px 0px 20px 0",
                color: colors.grey[100],
                }}
            >
                {/* when it is not collapsed */}
                {!isCollapsed && (
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    ml="15px"
                >
                    <Typography variant="h3" color={colors.grey[100]}>
                    Student
                    </Typography>
                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                        <MenuOutlinedIcon />
                    </IconButton>
                </Box>
                )}
            </MenuItem>

            {/* user profile and name */}
            {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.jpg`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>

              <Box textAlign="center">
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {currentUser?.displayName}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {currentUser?.major + " year " + currentUser?.year}
                </Typography>
              </Box>
            </Box>
          )}

          {/* MENU ITEM  */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
          <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Menu
            </Typography>

            <Item
              title="Studying Jios"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Social"
              to="/social"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Account"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* <Item
              title="Message"
              to="/message"
              icon={<SendIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Modules
            </Typography>

            <Item
              title="CS1010E"
              to="/"
              icon={<FiberManualRecordIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>

          </Menu>
        </ProSidebar>
    </Box>
    )
}

export default Sidebar;