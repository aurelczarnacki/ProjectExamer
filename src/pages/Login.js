import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from 'react'
import Center from "../components/Center";
import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import { useNavigate } from "react-router";

const getFreshModelObject = () => ({
  email: "",
  password: "",
});

export default function Login() {

  const navigate = useNavigate();

  const { values, errors, setErrors, handleInputChange } =
    useForm(getFreshModelObject);


  const login = (e) => {
    e.preventDefault();
    if (validate()) {
      createAPIEndpoint(ENDPOINTS.userLogin)
      .post(values)

      .then((res) => {
        localStorage.setItem("Id", res.data.id)
        localStorage.setItem("UName", res.data.name)
        localStorage.setItem("ULast", res.data.lastName)

        if(res.data.role === "user"){          
          navigate("/homeuser");
        }
        else{
          navigate("/hometeacher");
        }

        console.log(res)})

      .catch((err) => console.log(err));

    }
  };

  const validate = () => {
    let temp = {};
    temp.email = /\S+@\S+\.\S+/.test(values.email) ? "" : "Invalid E-mail.";
    temp.password = values.password !== "" ? "" : "This field cannot be empty.";
    setErrors(temp);

    return Object.values(temp).every((x) => x === "");
  };

  return (
    <Center>
      <Card sx={{ width: "30" }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h3" sx={{ my: 3 }}>
            Examer
          </Typography>
          <Box
            sx={{
              "& .MuiTextField-root": {
                margin: 1,
                width: "90%",
              },
            }}
          >
            <form noValidate onSubmit={login}>
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
                value={values.password}
                onChange={handleInputChange}
                type="password"
                autoComplete="current-password"
                {...(errors.password && {
                  error: true,
                  helperText: errors.password,
                })}
              />

              <Button
                variant="contained"
                type="submit"
                size="large"
                sx={{ width: "90%" }}
              >
                Login
              </Button>
            </form>

  
            <Link to="/Register">
              <Button type="button" size="small" sx={{ marginTop: 2 }}>
                Create account
              </Button>
            </Link>
            
          </Box>
        </CardContent>
      </Card>
    </Center>
  );
}
