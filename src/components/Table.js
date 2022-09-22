import React, { Component } from "react";
import { Card, CardContent, Grid, Button } from "@mui/material";
import Center from "../components/Center";
import { createAPIEndpoint } from "../api";
import { Link } from "react-router-dom";

class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      exams: [],
      isLoading: false,
      isError: false,
    };
  }
  
  async componentDidMount() {
    this.setState({ isLoading: true });
    const response = await fetch("https://localhost:44354/api/exams");

    if (response.ok) {
      const exams = await response.json();
      console.log(exams);
      this.setState({ exams, isLoading: false });
    } else {
      this.setState({ isLoading: false });
      this.setState({ isError: true });
    }
  }

  render() {
    const { exams, isLoading, isError } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    } else if (isError) {
      return <div>Error</div>;
    }
    return exams.length > 0 ? (
      <Center>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh" }}
          spacing={3}
        >
          {
          exams.map((curElem) => {
            if(curElem.userId == localStorage.getItem("Id")){
            return (
              <Grid item xs={1}>
                <Card sx={{ width: 400 }}>
                  <CardContent>
                    <div className="card_item" key={curElem.id}>
                      <div className="card_inner">
                        <div className="title">
                          <h3>{curElem.title}</h3>
                        </div>
                        <div className="code">{curElem.code}</div>
                        <div classname="isOn">{curElem.isOn}</div>
                        <Link to="/details">
                          <Button
                            className="details"
                            sx={{ marginTop: 2, marginRight: 1 }}
                            onClick={() => {
                               localStorage.setItem("ExamId", curElem.id);
                               localStorage.setItem("Title", curElem.title);
                               localStorage.setItem("Open", curElem.isOn);
                               localStorage.setItem("Code", curElem.code);
                              console.log(localStorage.getItem("ExamId"));
                            }}
                            variant="outlined"
                          >
                            Details
                          </Button>
                        </Link>
                        <Button
                          className="delete"
                          sx={{ marginTop: 2, marginLeft: 1 }}
                          onClick={() =>
                            createAPIEndpoint("exams").delete(curElem.id)
                          }
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
