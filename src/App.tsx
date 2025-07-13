import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Courses from "./pages/Courses";
import EmailOtpLogin from "./pages/Login";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";
import CourseDetails from "./pages/CourseDetails";
import AuthProvider from "./context/AuthProvider";

const App = () => {
  console.log("Render");

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<EmailOtpLogin />} />

          {/* Redirect base path to /courses */}
          <Route path="/" element={<Navigate to="/courses" replace />} />

          {/* Main layout for authenticated routes */}
          <Route path="/courses" element={<Layout />}>
            <Route index element={<Courses />} />
            <Route path=":id" element={<CourseDetails />} />
          </Route>

          {/* Fallback for unmatched routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
