import { useAuth } from "../authentication/auth-context"


// import scenes & components
import { tokens } from "../../theme"
import { mockDataContacts } from "../../data/mockData"
import Header from "../../components/Header"
import Sidebar from "../../components/SideBar"

// Material-UI imports
import { useTheme } from "@mui/material"
import { Box } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"

const Social = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const { currentUser } = useAuth()

  const boxStyling = {
    "& .MuiDataGrid-root": {
      border: "none",
    },
    "& .MuiDataGrid-cell": {
      borderBottom: "none",
    },
    "& .name-column--cell": {
      color: colors.greenAccent[300],
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: colors.blueAccent[700],
      borderBottom: "none",
    },
    "& .MuiDataGrid-virtualScroller": {
      backgroundColor: colors.primary[400],
    },
    "& .MuiDataGrid-footerContainer": {
      borderTop: "none",
      backgroundColor: colors.blueAccent[700],
    },
    "& .MuiCheckbox-root": {
      color: `${colors.greenAccent[200]} !important`,
    },
    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
      color: `${colors.grey[100]} !important`,
    },
  }

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "telegramUsername",
      headerName: "Telegram Usernsme",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "major",
      headerName: "Major",
      flex: 1,
    },
  ];

  return (
    <Box display= "flex">
      <Sidebar />
      <Box m="20px" flex="1">

        <Header
          title="SOCIAL"
          subtitle="List of Contacts for Future Reference"
        />
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={boxStyling}
        >
          <DataGrid
            rows={mockDataContacts}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      </Box>
    </ Box>
  );
};

export default Social;