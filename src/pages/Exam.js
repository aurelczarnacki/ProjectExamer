import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  List,
  ListItemButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Center from "../components/Center";
import { useNavigate } from "react-router";
import { createAPIEndpoint, ENDPOINTS } from "../api";

export default function Exam() {
  const navigate = useNavigate();
  const [qns, setQns] = useState([]);
  const [qnIndex, setQnIndex] = useState(0);
  const [points, setPoints] = useState(0);
  var counter = qns.length;
  localStorage.setItem("counter", counter);



  useEffect(() => {

    createAPIEndpoint(ENDPOINTS.getQuestions + localStorage.getItem("EId"))
      .fetch()


      .then((res) => {
        setQns(res.data);
      })


      .catch((err) => {
        console.log(err);
      });
  }, []);


  function updateAnswer(qnId, optionIdx, qnA) {
 



    if (qnIndex < counter - 1) {
      if (optionIdx == qnA - 1) {
        const updatePoints = points + 1;
        setPoints(updatePoints);
      }

      setQnIndex(qnIndex + 1);
    } else {
      if (optionIdx == qnA - 1) {
        const updatePoints = points + 1;
        setPoints(updatePoints);
      }
      localStorage.setItem("Idx", optionIdx);
      localStorage.setItem("futureA", qnA-1);
      localStorage.setItem("points", points);
      navigate("/result");
    }
  }
  

  return qns.length != 0 ? (
    <Center>
      <h1>{localStorage.getItem("ETitle")}</h1>
      <Card sx={{ maxWidth: 640, mx: "auto", mt: 5 }}>

        <CardHeader
          title={"Question " + (qnIndex + 1) + " of " + counter}
        ></CardHeader>

        <CardContent>
          <Typography variant="h6">{qns[qnIndex].qText}</Typography>
          <List>
            {qns[qnIndex].options.map((item, idx) => (

              <ListItemButton
                key={idx}
                onClick={() => {
                  updateAnswer(qns[qnIndex].id, idx, qns[qnIndex].aCorrect);
                }}
              >
                <div>
                  <b>{String.fromCharCode(65 + idx) + ". "}</b> {item}
                </div>
              </ListItemButton>

            ))}
          </List>
        </CardContent>
      </Card>
    </Center>
  ) : null;
}
