import {
  Grid,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Button,
} from "@mui/material";
import React from "react";
import { createAPIEndpoint } from "../api/index";
import Center from "../components/Center";
import TableQ from "../components/TableQ";
import TableS from "../components/TableS";
import { Link } from "react-router-dom";

export default function Details() {
  createAPIEndpoint("exams/" + localStorage.getItem("ExamId"))
    .fetch()
    .then((res) => {
      console.log(res.data.title);
      localStorage.setItem("Title", res.data.title);
    });
  console.log(localStorage.getItem("Id"));



  return (
    <Center>
      <Card sx={{ width: 800 }}>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={1}>
              <Link to="/myexams">
                <Button className="back" variant="outlined">
                  Back
                </Button>
              </Link>
            </Grid>
            <Grid item xs={11} />
            <Grid item xs={3}>
              <h1>{localStorage.getItem("Title")}</h1>
            </Grid>
            <Grid item xs={5} />
            <Grid item xs={4}>
              <FormControlLabel
                value="top"
                control={<Switch color="primary" />}
                label="Open Exam"
                labelPlacement="bottom"
              />
            </Grid>
            <Grid item xs={12}>
              <h3>{localStorage.getItem("Code")}</h3>
            </Grid>
            <Grid item xs={3}>
              <h3>Questions:</h3>
            </Grid>
            <Grid item xs={5} />
            <Grid item xs={4}>
              <Link to="/createquestion">
                <Button
                  className="addQuestion"
                  sx={{ marginTop: 2, marginLeft: 1 }}
                  variant="outlined"
                >
                  Add Question
                </Button>
              </Link>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 0 }}>
              <TableQ />
            </Grid>
            <Grid item xs={3} sx={{ marginTop: 0 }}>
              <h3>Scores:</h3>
              <TableS />
            </Grid>
            <Grid item xs={9} />
          </Grid>
        </CardContent>
      </Card>
    </Center>
  );
}
