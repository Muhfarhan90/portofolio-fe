import { Route, Routes } from "react-router";
import "./App.css";
import Homepage from "./pages/Homepage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLayout from "./layouts/AdminLayout";
import ProjectPage from "./pages/admin/ProjectPage";
import SkillPage from "./pages/admin/SkillPage";
import ExperiencePage from "./pages/admin/ExperiencePage";
import CertificatePage from "./pages/admin/CertificatePage";
import EducationPage from "./pages/admin/EducationPage";
import ContactMessagesPage from "./pages/admin/ContactMessagePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="projects" element={<ProjectPage />} />
          <Route path="skills" element={<SkillPage />} />
          <Route path="experiences" element={<ExperiencePage />} />
          <Route path="certificates" element={<CertificatePage />} />
          <Route path="educations" element={<EducationPage />} />
          <Route path="contacts" element={<ContactMessagesPage />} />
        </Route>
        
      </Routes>
    </div>
  );
}

export default App;
