import { Box, Button, TextField } from "@mui/material";
import Chip from '@mui/material/Chip';
import { useState, useEffect } from "react";
import MenuItem from '@mui/material/MenuItem';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import Sidebar from "../../components/SideBar";
import { useAuth } from "../authentication/auth-context"
import { mockDataModule } from "../../data/mockData";
import { updateUserInfo } from "../../firestoreOps";

/**
 * Account component for updating user profile information.
 */
const Account = () => {
  const { currentUser } = useAuth()
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [selectedModules, setSelectedModules] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState(mockDataModule);

  /**
   * Handles form submission.
   * Updates user information in the database and shows an alert for successful update.
   * @param {Object} values - Form values.
   */
  const handleFormSubmit = (values) => {
    const valuesWithModules = {...values, modules: selectedModules};
    updateUserInfo(valuesWithModules, currentUser.uid)
    .then(res => alert("Update Successful!"))
    .error(error => console.log(error.message))
  };

  /**
   * Handles adding a module to the selected modules list.
   * Removes the module from dropdown options.
   * @param {string} module - Module code.
   */
  const handleModuleAdd = (module) => {
    setSelectedModules((prevModules) => [...prevModules.filter((m) => m !== module), module]);
    setDropdownOptions((prevOptions) =>
      prevOptions.filter((option) => option.code !== module)
    );
  };

  /**
   * Handles removing a module from the selected modules list.
   * Adds the module back to dropdown options.
   * @param {string} module - Module code.
   */
  const handleModuleRemove = (module) => {
    setSelectedModules((prevModules) =>
      prevModules.filter((m) => m !== module)
    );
    setDropdownOptions((prevOptions) => [...prevOptions, { code: module }]);
  };

  useEffect(() => {
    // Update dropdown options when selectedModules change
    setDropdownOptions((prevOptions) =>
      prevOptions.filter(
        (option) => !selectedModules.includes(option.code)
      )
    );
  }, [selectedModules]);

  return (
    <Box display="flex">
      <Sidebar />
    <Box m="20px" flex="1">
      <Header title="PROFILE" subtitle="Update your profile" />
      <Formik 
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={"Display Name: "}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.displayName}
                name="displayName"
                error={!!touched.displayName && !!errors.displayName}
                helperText={touched.displayName && errors.displayName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Full Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fullName}
                name="fullName"
                error={!!touched.fullName && !!errors.fullName}
                helperText={touched.fullName && errors.fullName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Major(s)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.major}
                name="major"
                error={!!touched.major && !!errors.major}
                helperText={touched.major && errors.major}
                sx={{ gridColumn: "span 3" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Year"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.year}
                name="year"
                error={!!touched.year && !!errors.year}
                helperText={touched.year && errors.year}
                sx={{ gridColumn: "span 1" }}
              />
              
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Telegram Username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.teleName}
                name="teleName"
                error={!!touched.teleName && !!errors.teleName}
                helperText={touched.teleName && errors.teleName}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                select
                variant="filled"
                type="text"
                label="Module"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.mod}
                name="mod"
                error={!!touched.mod && !!errors.mod}
                helperText={touched.mod && errors.mod}
                sx={{ gridColumn: "span 1" }}
              >
                  {dropdownOptions.map((option) => (
                    <MenuItem key={option.code} value={option.code}>
                      {option.code}
                    </MenuItem>
                  ))}
              </TextField>

              <Button
                  type="button"
                  color="primary"
                  variant="contained"
                  onClick={() => handleModuleAdd(values.mod)}
                  sx={{ gridColumn: 'span 1' }}
                >
                  Add
                </Button>

                <Box gridColumn="span 4">
                  {selectedModules.map((module) => (
                    <Chip
                      key={module}
                      label={module}
                      onDelete={() => handleModuleRemove(module)}
                      sx={{ marginRight: '10px' }}
                    />
                  ))}
                </Box>


            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" >
                Update Profile
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      </Box>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  // displayName: yup.string().required("required"),
  fullName: yup.string().required("required"),
  // email: yup.string().email("invalid email").required("required"),
  // contact: yup
  //   .string()
  //   .matches(phoneRegExp, "Phone number is not valid")
  //   .required("required"),
//   address1: yup.string().required("required"),
//   address2: yup.string().required("required"),
});

const initialValues = {
  displayName: "",
  fullName: "",
  major: "",
  teleName: "",
};

export default Account;