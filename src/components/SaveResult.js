import { Card, CardContent } from "@mui/material";
  import React, { useEffect } from "react";
  import Center from "../components/Center";
  import useForm from "../hooks/useForm";
  import { createAPIEndpoint, ENDPOINTS } from "../api";


  const getFreshModelObject = () => ({
    userId: "",
    userName: "",
    userLastName: "",
    max: "",
    points: "",
    examId: ""
  });
  
  
  export default function Create() {

    const { values } = useForm(getFreshModelObject);
    values.userId = localStorage.getItem("Id");
    values.userName = localStorage.getItem("UName");
    values.userLastName = localStorage.getItem("ULast");
    values.max = localStorage.getItem("counter");
    values.points = localStorage.getItem("points");
    values.examId = localStorage.getItem("EId");
  
    useEffect(() => {

        createAPIEndpoint(ENDPOINTS.score)
        .post(values)

        .then((res) => 
          console.log(res))
          
        .catch((err) => console.log(err));
  
      }, [])
  
    return (
        <Center>
        <Card sx={{width: 500}}>
        <CardContent>
        <div><h1>You scored {localStorage.getItem("points")} on {localStorage.getItem("counter")}</h1></div>
        </CardContent>
    </Card>
    </Center>
    );
  }
  