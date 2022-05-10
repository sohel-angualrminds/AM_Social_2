import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './Components/LoginSignup/Login';
import Signup from './Components/LoginSignup/Signup';
import Parent from './Components/Parent/Parent';
import "./app.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/" element={<Parent />} />
      </Routes>
    </Router>
  );
}

export default App;