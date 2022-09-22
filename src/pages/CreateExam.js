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
  import { v4 as uuidv4 } from 'uuid';
  import { useNavigate } from "react-router";

  const getFreshModelObject = () => ({
    title: "",
    code: "",
    UserId: ""
  });
  


  export default function Create() {

    const navigate = useNavigate();
    const { values, errors, setErrors, handleInputChange } =
      useForm(getFreshModelObject);
    values.UserId = localStorage.getItem("Id")
    values.Code = uuidv4();
  
    const Create = (e) => {
      e.preventDefault();
      if (validate()) {
        createAPIEndpoint(ENDPOINTS.exam)
        .post(values)
        .then((res) => {
          console.log(res)
          navigate("/myexams")
        })
        .catch((err) => console.log(err));
  
      }
    };
  
    const validate = () => {
      let temp = {};
      temp.title = values.title != "" ? "" : "This field cannot be empty.";
      setErrors(temp);
  
      return Object.values(temp).every((x) => x == "");
    };
  
    return (
      <Center>
        <Card sx={{ width: "30" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h3" sx={{ my: 3 }}>
              New Exam
            </Typography>
            <Box
              sx={{
                "& .MuiTextField-root": {
                  margin: 1,
                  width: "90%",
                },
              }}
            >
              <form noValidate onSubmit={Create}>
                <TextField
                  id="outlined=basic"
                  label="Title"
                  name="title"
                  value={values.title}
                  onChange={handleInputChange}
                  variant="outlined"
                  {...(errors.title && {
                    error: true,
                    helperText: errors.title,
                  })}
                />
  
                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  sx={{ width: "90%" }}
                >
                  Create
                </Button>
              </form>
            </Box>
          </CardContent>
        </Card>
      </Center>
    );
  }
  