import { useContext, useRef, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthProvider";

const EmailOtpLogin = () => {
  const { loginWithOtp, verifyOtp } = useContext(AuthContext);

  const emailRef = useRef<HTMLInputElement>(null);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [loginId, setLoginId] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const inputEmail = emailRef.current?.value.trim();
    if (!inputEmail || !inputEmail.includes("@")) {
      toast.error("⚠️ Enter a valid email");
      return;
    }

    const id = await loginWithOtp(inputEmail);
    if (id) {
      toast.success("📨 OTP sent");
      setEmail(inputEmail);
      setLoginId(id);
      setStep("otp");
    } else {
      toast.error("❌ Failed to send OTP");
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join("");
    if (fullOtp.length < 6) return toast.error("Enter full OTP");

    const success = await verifyOtp(loginId, fullOtp);
    if (success) toast.success("✅ Logged in successfully!");
    else toast.error("❌ Invalid OTP or not an admin");
  };

  const handleOtpChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const updated = [...otp];
    updated[i] = val;
    setOtp(updated);
    if (val && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0)
      otpRefs.current[i - 1]?.focus();
  };

  return (
    <section className="w-full min-h-screen flex justify-center items-center bg-amber-50 px-4">
      <form
        onSubmit={step === "email" ? handleEmailSubmit : handleOtpSubmit}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 sm:p-8 flex flex-col gap-6"
      >
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-amber-600">
            {step === "email" ? "Welcome Malik 👋" : "Enter OTP"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {step === "email"
              ? "Login to EduVeda Admin"
              : `OTP sent to ${email}`}
          </p>
        </div>

        {step === "email" && (
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-gray-700 font-medium">
              Email
            </label>
            <input
              ref={emailRef}
              type="email"
              id="email"
              placeholder="you@example.com"
              required
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-400"
            />
          </div>
        )}

        {step === "otp" && (
          <>
            <div className="flex justify-between gap-2">
              {otp.map((val, idx) => (
                <input
                  key={idx}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={val}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  ref={(el) => {
                    otpRefs.current[idx] = el;
                  }}
                  className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-semibold border border-gray-300 rounded-md focus:ring-amber-400"
                />
              ))}
            </div>

            <div className="text-sm text-gray-500 text-center">
              Didn’t receive OTP?{" "}
              <button
                type="button"
                onClick={async () => {
                  const id = await loginWithOtp(email);
                  if (id) {
                    setLoginId(id);
                    toast.success("📨 OTP resent");
                  }
                }}
                className="text-amber-600 hover:underline"
              >
                Resend
              </button>
            </div>
          </>
        )}

        <div className="flex justify-between gap-3">
          {step === "otp" && (
            <button
              type="button"
              onClick={() => setStep("email")}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-md"
            >
              ← Back
            </button>
          )}
          <button
            type="submit"
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-md"
          >
            {step === "email" ? "🚀 Send OTP" : "✅ Verify"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default EmailOtpLogin;
