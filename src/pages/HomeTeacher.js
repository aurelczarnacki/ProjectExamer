import { Card, CardContent, Typography, Grid } from "@mui/material";
import React from "react";
import Center from "../components/Center";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Center>
      <Grid container spacing={3}>

        <Grid item xs>
          <Card sx={{ width: "350px" }} onClick={() => navigate("/createexam")}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" sx={{ my: 3 }}>
                Create new Exam
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs>
          <Card sx={{ width: "350px" }} onClick={() => navigate("/myexams")}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" sx={{ my: 3 }}>
                My Exams
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
      </Grid>
    </Center>
  );
}
