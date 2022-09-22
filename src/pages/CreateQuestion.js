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
    qText: "",
    a1: "",
    a2: "",
    a3: "",
    a4: "",
    aCorrect: "",
    ExamId: ""
  });
  
  
  
  export default function Create() {
    const navigate = useNavigate();
  
    const { values, errors, setErrors, handleInputChange } =
      useForm(getFreshModelObject);
    values.ExamId = localStorage.getItem("ExamId");

    const Create = (e) => {
      e.preventDefault();
      if (validate()){
        createAPIEndpoint(ENDPOINTS.question)
        .post(values)
        .then((res) => {
          console.log(res)
          navigate("/details")
        })
        .catch((err) => console.log(err));
        
      }
    };
  
    const validate = () => {
      let temp = {};
      temp.qText = values.qText != "" ? "" : "This field cannot be empty.";
      temp.a1 = values.a1 != "" ? "" : "This field cannot be empty.";
      temp.a2 = values.a2 != "" ? "" : "This field cannot be empty.";
      temp.a3 = values.a3 != "" ? "" : "This field cannot be empty.";
      temp.a4 = values.a4 != "" ? "" : "This field cannot be empty.";
      if (values.aCorrect > 4 || values.aCorrect < 1) {
        temp.aCorrect = "Insert a value between 1 and 4"
      }
      else
      temp.aCorrect = values.aCorrect != "" ? "" : "This field cannot be empty.";

      setErrors(temp);
  
      return Object.values(temp).every((x) => x == "");
    };


    return (
      <Center>
        <Card sx={{ width: 600 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h3" sx={{ my: 3 }}>
              New Question
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
                  label="Question:"
                  name="qText"
                  value={values.qText}
                  onChange={handleInputChange}
                  variant="outlined"
                  {...(errors.qText && {
                    error: true,
                    helperText: errors.qText,
                  })}
                />

<TextField
                  id="outlined=basic"
                  label="Answer 1:"
                  name="a1"
                  value={values.a1}
                  onChange={handleInputChange}
                  variant="outlined"
                  {...(errors.a1 && {
                    error: true,
                    helperText: errors.a1,
                  })}
                />

<TextField
                  id="outlined=basic"
                  label="Answer 2:"
                  name="a2"
                  value={values.a2}
                  onChange={handleInputChange}
                  variant="outlined"
                  {...(errors.a2 && {
                    error: true,
                    helperText: errors.a2,
                  })}
                />

<TextField
                  id="outlined=basic"
                  label="Answer 3:"
                  name="a3"
                  value={values.a3}
                  onChange={handleInputChange}
                  variant="outlined"
                  {...(errors.a3 && {
                    error: true,
                    helperText: errors.a3,
                  })}
                />

<TextField
                  id="outlined=basic"
                  label="Answer 4:"
                  name="a4"
                  value={values.a4}
                  onChange={handleInputChange}
                  variant="outlined"
                  {...(errors.a4 && {
                    error: true,
                    helperText: errors.a4,
                  })}
                />

<TextField
                  id="outlined=basic"
                  label="Correct Answer:"
                  name="aCorrect"
                  type="number"
                  value={values.aCorrect}
                  onChange={handleInputChange}
                  variant="outlined"
                  {...(errors.aCorrect && {
                    error: true,
                    helperText: errors.aCorrect,
                  })}
                />
  
                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  sx={{ width: "90%" }}
                >
                  Submit
                </Button>
              </form>
            </Box>
          </CardContent>
        </Card>
      </Center>
    );
  }
  