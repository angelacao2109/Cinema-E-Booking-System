import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './Admin.css'
import AdminDash from "./Components/AdminPage/Dash/AdminDash";
import EditMovies from "./Components/AdminPage/EditMovies/EditMovies";
import AdminNavBar from "./Components/AdminPage/AdminNav/AdminNavBar";
import EditPromo from "./Components/AdminPage/EditPromo/EditPromo";
import EditUser from "./Components/AdminPage/EditUser/EditUser";


function Admin() {
  return (
    <div className="Admin">
     <Router>
      <AdminNavBar />
      <Routes>
        <Route path="/" element={<AdminDash/>} />
        <Route path="/editpromo" element={<EditPromo/>} />
        <Route path="/editmovies" element={<EditMovies/>} />
        <Route path="/edituser" element={<EditUser/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default Admin;
