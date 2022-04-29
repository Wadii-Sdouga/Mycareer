
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Carriere from './pages/Carriere';
import Profil from './pages/Profil';
import PassForgot from './pages/PassForgot';
import SendEmail from './pages/SendEmail';
import Dashboard from './pages/Dashboard';
import AdminUser from './admin/User';
import AdminCarr from './admin/Carr';

function App() {

  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/register" exact element={<SignUp />} />
          <Route path="/carriere" exact element={<Carriere />} />
          <Route path="/profil" exact element={<Profil />} />
          <Route path="/passforgot" exact element={<PassForgot />} />
          <Route path="/sendemail" exact element={<SendEmail />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/admin/user" exact element={<AdminUser />} />
          <Route path="/admin/carrer" exact element={<AdminCarr />} />




        </Routes>

      </div>
    </Router>);
} export default App;
