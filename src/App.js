import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomeUser from "./pages/HomeUser";
import HomeTeacher from "./pages/HomeTeacher";
import CreateExam from "./pages/CreateExam";
import MyExams from "./pages/MyExams";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Details from "./pages/Details";
import DetailsQ from "./pages/DetailsQ";
import Exam from "./pages/Exam";
import CreateQuestion from "./pages/CreateQuestion";
import Result from "./pages/Result";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/homeuser" element={<HomeUser />} />
          <Route path="/hometeacher" element={<HomeTeacher />} />
          <Route path="/createexam" element={<CreateExam />} />
          <Route path="/myexams" element={<MyExams />} />
          <Route path="/details" element={<Details />} />
          <Route path="createquestion" element={<CreateQuestion />} />
          <Route path="/detailsq" element={<DetailsQ />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
