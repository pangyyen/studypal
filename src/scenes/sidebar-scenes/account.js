import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import Sidebar from "../../components/SideBar";
import { useAuth } from "../authentication/auth-context"


const Account = () => {
  const { currentUser } = useAuth()
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

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
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
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
                value={values.telename}
                name="telename"
                error={!!touched.telename && !!errors.telename}
                helperText={touched.telename && errors.telename}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Module 1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.mod1}
                name="mod1"
                error={!!touched.mod1 && !!errors.mod1}
                helperText={touched.mod1 && errors.mod1}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Module 2"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.mod2}
                name="mod2"
                error={!!touched.mod2 && !!errors.mod2}
                helperText={touched.mod2 && errors.mod2}
                sx={{ gridColumn: "span 1" }}
              />

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
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  // email: yup.string().email("invalid email").required("required"),
  // contact: yup
  //   .string()
  //   .matches(phoneRegExp, "Phone number is not valid")
  //   .required("required"),
//   address1: yup.string().required("required"),
//   address2: yup.string().required("required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  major: "",
  telename: "",
  mod1: "",
  mod2: "",
};

export default Account;