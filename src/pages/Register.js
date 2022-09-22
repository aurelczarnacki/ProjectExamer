import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Center from "../components/Center";
import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import { useNavigate } from "react-router";

const getFreshModelObject = () => ({
  name: "",
  lastName: "",
  email: "",
  password: "",
  role: "user",
});

export default function Register() {
  const navigate = useNavigate();

  const { values, setValues, errors, setErrors, handleInputChange } =
    useForm(getFreshModelObject);

  const Register = (e) => {
    e.preventDefault();

    if (validate()) {
      createAPIEndpoint(ENDPOINTS.user)
        .post(values)

        .then(() => {
          navigate("/");
        })

        .catch((err) => console.log(err));
      
    }
  };

  const validate = () => {
    let temp = {};
    temp.name = values.name !== "" ? "" : "This field cannot be empty.";
    temp.lastName = values.lastName !== "" ? "" : "This field cannot be empty.";
    temp.email = /\S+@\S+\.\S+/.test(values.email) ? "" : "Invalid E-mail.";
    temp.password = values.password !== "" ? "" : "This field cannot be empty.";
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  return (
    <Center>
      <Card sx={{ width: "700" }} style={{ display: "inline-block" }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h4" sx={{ my: 3 }}>
            Create account
          </Typography>
          <Box
            sx={{
              "& .MuiTextField-root": {
                margin: 1,
                width: "70%",
              },
            }}
          >
            <form noValidate onSubmit={Register}>
              <TextField
                id="outlined=basic"
                label="Name"
                name="name"
                value={values.name}
                onChange={handleInputChange}
                variant="outlined"
                {...(errors.name && {
                  error: true,
                  helperText: errors.name,
                })}
              />
              <TextField
                id="outlined=basic"
                label="Last Name"
                name="lastName"
                value={values.lastName}
                onChange={handleInputChange}
                variant="outlined"
                {...(errors.lastName && {
                  error: true,
                  helperText: errors.lastName,
                })}
              />

              <TextField
                id="outlined=basic"
                label="E-mail"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                variant="outlined"
                {...(errors.email && {
                  error: true,
                  helperText: errors.email,
                })}
              />

              <TextField
                id="outlined-password-input"
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={values.password}
                onChange={handleInputChange}
                {...(errors.password && {
                  error: true,
                  helperText: errors.password,
                })}
              />

              <Button
                variant="contained"
                type="submit"
                size="large"
                sx={{ width: "70%" }}
              >
                Register
              </Button>
            </form>


            <Link to="/">
              <Button
                type="button"
                size="small"
                sx={{ marginTop: 2, width: "70%" }}
              >
                Already have an account
              </Button>
            </Link>


          </Box>
        </CardContent>
      </Card>
    </Center>
  );
}
