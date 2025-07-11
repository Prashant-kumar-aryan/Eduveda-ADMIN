import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import EmailOtpLogin from "./pages/login";
import AuthProvider, { AuthContext } from "./context/AuthProvider";
import { useContext } from "react";

const AppContent = () => {
  const auth = useContext(AuthContext);
  return auth.isLoggedin ? <Home /> : <EmailOtpLogin />;
};

const App = () => {
  return (
    <AuthProvider>
      <Toaster />
      <AppContent />
    </AuthProvider>
  );
};

export default App;
