import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { BASE_URL } from "../BASE_URL";

// Define the shape of your JWT payload
interface JWTPayload {
  exp: number;
  name: string;
  role: string;
  email?: string;
  phone?: string;
}

// Define the shape of the AuthContext
interface IAuthContext {
  isLoggedin: boolean;
  token: string | null;
  refreshToken: string;
  name: string;
  role: string;
  email?: string;
  phone?: string;
  loading: boolean;
  loginWithOtp: (email: string) => Promise<string | null>;
  verifyOtp: (loginId: string, otp: string) => Promise<boolean>;
}

// Create context with default values
export const AuthContext = createContext<IAuthContext>({
  isLoggedin: false,
  token: null,
  refreshToken: "",
  name: "",
  role: "",
  email: "",
  phone: "",
  loading: true,
  loginWithOtp: async () => null,
  verifyOtp: async () => false,
});

// Utility to check if token is still valid
const isTokenValid = (token: string): boolean => {
  try {
    const decoded: JWTPayload = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch (err) {
    return false;
  }
};

// AuthProvider component
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState<string | undefined>("");
  const [phone, setPhone] = useState<string | undefined>("");
  const [refreshToken, setRefreshToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("eduVedaAdmin");

    if (saved && isTokenValid(saved)) {
      setToken(saved);
      try {
        const decoded: JWTPayload = jwtDecode(saved);
        if (decoded.name) setName(decoded.name);
        if (decoded.role) setRole(decoded.role);
        if (decoded.email) setEmail(decoded.email);
        if (decoded.phone) setPhone(decoded.phone);
      } catch (err) {
        console.error("Failed to decode token", err);
      }
    } else {
      localStorage.removeItem("eduVedaAdmin");
      setToken(null);
    }

    setLoading(false); // 👈 done checking
  }, []);

  const loginWithOtp = async (email: string) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: email, device: "web", ip: "0.0.0.0" }),
      });

      const data = await res.json();
      if (res.ok && data.loginId) return data.loginId;

      toast.error(data.message || "❌ OTP send failed");
      return null;
    } catch (err: any) {
      toast.error("❌ Network error while sending OTP");
      console.error("Send OTP error:", err);
      return null;
    }
  };

  const verifyOtp = async (loginId: string, otp: string) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loginId, otp }),
      });

      const data = await res.json();

      if (res.ok && data.accessToken && data.role === "ADMIN") {
        localStorage.setItem("eduVedaAdmin", data.accessToken);
        setToken(data.accessToken);

        const decoded: JWTPayload = jwtDecode(data.accessToken);
        setName(decoded.name);
        setRole(decoded.role);
        setEmail(decoded.email);
        setPhone(decoded.phone);

        toast.success("✅ Logged in successfully");
        return true;
      }

      toast.error(data.message || "❌ Invalid OTP or unauthorized");
      return false;
    } catch (err: any) {
      toast.error("❌ Network error while verifying OTP");
      console.error("Verify OTP error:", err);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedin: !!token,
        token,
        refreshToken,
        name,
        role,
        email,
        phone,
        loading,
        loginWithOtp,
        verifyOtp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
