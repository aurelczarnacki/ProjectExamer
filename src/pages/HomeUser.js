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
  import useForm from "../hooks/useForm";
  import { createAPIEndpoint, ENDPOINTS } from "../api";
  import { useNavigate } from "react-router";
  
  const getFreshModelObject = () => ({
    code: ""
  });
  
  export default function Login() {
    const navigate = useNavigate();
  
    const { values, errors, setErrors, handleInputChange } =
      useForm(getFreshModelObject);
  
  
  
    const enter = (e) => {
      e.preventDefault();
      if (validate()) {
        createAPIEndpoint(ENDPOINTS.examEnter)
        .post(values)


        .then((res) => {
          localStorage.setItem("ETitle", res.data.title);
          localStorage.setItem("EId", res.data.id)
          navigate("/exam");
          console.log(res)})


        .catch(() => {
          let temp = {};
          temp.code = "Invalid code";
          setErrors(temp);
        })
      }
  
    };

    const validate = () => {
      let temp = {};
      temp.code = values.code !== "" ? "" : "This field cannot be empty";
      setErrors(temp);
  
      return Object.values(temp).every((x) => x === "");
    };
  
  
    return (
      <Center>
        <Card sx={{ width: "700px" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={{ my: 3 }}>
              Insert code to join an Exam:
            </Typography>
            <Box
              sx={{
                "& .MuiTextField-root": {
                  margin: 1,
                  width: "90%",
                },
              }}
            >
              <form noValidate onSubmit={enter}>
                <TextField
                  id="outlined=basic"
                  label="Code"
                  name="code"
                  value={values.code}
                  onChange={handleInputChange}
                  variant="outlined"
                  {...(errors.code && {
                    error: true,
                    helperText: errors.code,
                  })}
                />
  
                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  sx={{ width: "90%" }}
                >
                  Join
                </Button>
              </form>
            </Box>
          </CardContent>
        </Card>
      </Center>
    );
  }
  