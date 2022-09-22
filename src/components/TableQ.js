import React, { Component } from "react";
import { Card, CardContent, Grid, Button } from "@mui/material";
import Center from "../components/Center";
import { createAPIEndpoint } from "../api";
import { Link } from "react-router-dom";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qnas: [],
      isLoading: false,
      isError: false,
    };
  }
  async componentDidMount() {
    this.setState({ isLoading: true });
    const response = await fetch("https://localhost:44354/api/qnas");

    if (response.ok) {
      const qnas = await response.json();
      console.log(qnas);
      this.setState({ qnas, isLoading: false });
    } else {
      this.setState({ isLoading: false });
      this.setState({ isError: true });
    }
  }

  render() {
    const { qnas, isLoading, isError } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    } else if (isError) {
      return <div>Error</div>;
    }
    return qnas.length > 0 ? (
      <Center>
        <Grid
          container
          direction="column"
          alignItems="center"
          sx={{ minHeight: "100vh" }}
          spacing={0}
        >
          {qnas.map((curElem) => {
            if(curElem.examId == localStorage.getItem("ExamId")) {
            return (
              <Grid item xs={12}>
                <Card sx={{ width: 700 }}>
                  <CardContent>
                    <div className="card_item" key={curElem.id}>
                      <div className="card_inner">
                        <div className="QText">{curElem.qText}</div>
                        <Link to="/detailsq">
                          <Button
                            className="details"
                            sx={{ marginTop: 2, marginRight: 1 }}
                            onClick={() => {
                               localStorage.setItem("QuestionId", curElem.id);
                               localStorage.setItem("QText", curElem.qText);
                               localStorage.setItem("A1", curElem.a1);
                               localStorage.setItem("A2", curElem.a2);
                               localStorage.setItem("A3", curElem.a3);
                               localStorage.setItem("A4", curElem.a4);
                               localStorage.setItem("ACorrect", curElem.aCorrect);
                              console.log(localStorage.getItem("QuestionId"));
                              console.log(localStorage.getItem("QText"));
                            }}
                            variant="outlined"
                          >
                            Details
                          </Button>
                        </Link>
                        
                        <Button
                          className="delete"
                          sx={{ marginTop: 2, marginLeft: 1 }}
                          onClick={() => {
                            createAPIEndpoint("QnAs").delete(curElem.id);
                            window.location.reload(true);
                            console.log(localStorage.getItem("ExamId"));
                          }}
                          variant="outlined"
                        >
                          Delete
                        </Button>
                        
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            );}
          })}
        </Grid>
      </Center>
    ) : (
      <div/>
    );
  }
}

export default Table;
