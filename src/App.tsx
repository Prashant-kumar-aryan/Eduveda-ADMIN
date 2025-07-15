import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Courses from "./pages/Courses";
import EmailOtpLogin from "./pages/Login";
import Layout from "./Layouts/Layout";
import NotFound from "./pages/NotFound";
import AuthProvider from "./context/AuthProvider";
import CourseDetailsLayout from "./Layouts/CourseDetailsLayout";
import ContentLayout from "./Layouts/ContentLayout"; // ✅ import missing layout
import Details from "./components/classroom/Details";
import Content from "./components/classroom/Content";
import Stream from "./components/classroom/Stream";
import Comments from "./components/classroom/Comments";
import Chapters from "./components/classroom/Chapters.tsx"; // ✅ import missing
import ChapterContents from "./components/classroom/ChapterContents.tsx"; // ✅ import missing

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public login route */}
          <Route path="/login" element={<EmailOtpLogin />} />

          {/* Redirect base path to /courses */}
          <Route path="/" element={<Navigate to="/courses" replace />} />

          {/* Main layout for course-related pages */}
          <Route path="/courses" element={<Layout />}>
            {/* List of all courses */}
            <Route index element={<Courses />} />

            {/* Course details routes */}
            <Route path=":courseId" element={<CourseDetailsLayout />}>
              <Route index element={<Details />} />

              {/* Content layout routes */}
              <Route path="content" element={<ContentLayout />}>
                <Route index element={<Content />} />
                <Route path=":subjectId" element={<Chapters />} />
                <Route
                  path=":subjectId/:chapterId"
                  element={<ChapterContents />}
                />
              </Route>

              {/* Stream & Comments directly under course */}
              <Route path="stream" element={<Stream />} />
              <Route path="comments" element={<Comments />} />
            </Route>
          </Route>

          {/* 404 fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
