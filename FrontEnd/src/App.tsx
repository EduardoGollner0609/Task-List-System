import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./routes/HomePage";
import ListTasks from "./routes/ListTasks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list-tasks" element={<ListTasks />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
