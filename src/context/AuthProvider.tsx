import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { BASE_URL } from "../BASE_URL";
interface Iuser {
  isLoggedin: boolean;
  token: string | null;
  loginWithOtp: (email: string) => Promise<string | null>;
  verifyOtp: (loginId: string, otp: string) => Promise<boolean>;
}

interface JWTPayload {
  exp: number;
}

const AuthContext = createContext<Iuser>({
  isLoggedin: false,
  token: null,
  loginWithOtp: async () => null,
  verifyOtp: async () => false,
});

const isTokenValid = (token: string): boolean => {
  try {
    const decoded: JWTPayload = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch (err) {
    return false;
  }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("eduVedaAdmin");
    if (saved && isTokenValid(saved)) {
      setToken(saved);
    } else {
      localStorage.removeItem("eduVedaAdmin");
      setToken(null);
    }
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
        loginWithOtp,
        verifyOtp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
