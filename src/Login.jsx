import { useState } from "react";
import { useNavigate } from "react-router-dom";

const navItems = [
  { label: "Home", href: "#" },
  { label: "Forgot Password", href: "#" },
  { label: "Sign Up", href: "#" },
];

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      // ── Ganti URL ini dengan endpoint Node.js kamu ──
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed. Please try again.");
        return;
      }

      // Simpan token ke localStorage (sesuaikan dengan backend kamu)
      localStorage.setItem("token", data.token);

      // Redirect ke halaman utama
      navigate("/");
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#1a2a1a] relative overflow-hidden">

      {/* ── BACKGROUND DECORATIVE LINES (sesuai design) ── */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="glow" cx="80%" cy="20%" r="50%">
            <stop offset="0%" stopColor="#84cc16" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#glow)" />
        {[...Array(6)].map((_, i) => (
          <path
            key={i}
            d={`M${-100 + i * 120},${400 + i * 60} Q${400 + i * 80},${100 + i * 30} ${900 + i * 60},${500 + i * 40}`}
            stroke="#84cc16"
            strokeWidth="1"
            fill="none"
            opacity={0.15 - i * 0.02}
          />
        ))}
      </svg>

      {/* ── MAIN CARD ── */}
      <div className="relative z-10 w-[1100px] min-h-[600px] bg-[#1e2d1e] rounded-3xl border border-[#2e4a2e] shadow-2xl overflow-hidden flex flex-col">

        {/* ── NAVBAR INSIDE CARD ── */}
        <nav className="flex items-center justify-between px-8 py-5 border-b border-[#2e4a2e]">
          <div className="flex items-center gap-2">
            <img
              src="/assets/logo.png"
              alt="Logo"
              className="w-8 h-8 rounded-full object-cover"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <span className="text-white font-bold text-sm tracking-widest font-mono">
              jejak_sehat.
            </span>
          </div>
          <div className="flex items-center gap-8">
            {navItems.map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="text-gray-300 text-sm hover:text-lime-400 transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* ── BODY ── */}
        <div className="flex flex-1">

          {/* LEFT — FORM */}
          <div className="flex-1 px-12 py-10 flex flex-col justify-center">
            <h1 className="text-[#f6d43b] text-3xl font-extrabold tracking-wide mb-1">
              WELCOME BACK!
            </h1>
            <p className="text-gray-400 text-sm mb-8">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-[#f6d43b] hover:text-lime-400 transition-colors duration-200 font-medium"
              >
                Sign up
              </a>
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* USERNAME */}
              <div className="flex flex-col gap-2">
                <label className="text-white text-sm font-medium">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder=""
                  className="w-[280px] h-11 rounded-full bg-[#2d3d2d] border border-[#3a5a3a] text-white px-5 text-sm outline-none focus:border-[#f6d43b] focus:ring-1 focus:ring-[#f6d43b] transition-all duration-200 placeholder-gray-600"
                />
              </div>

              {/* PASSWORD */}
              <div className="flex flex-col gap-2">
                <label className="text-white text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=""
                  className="w-[280px] h-11 rounded-full bg-[#2d3d2d] border border-[#3a5a3a] text-white px-5 text-sm outline-none focus:border-[#f6d43b] focus:ring-1 focus:ring-[#f6d43b] transition-all duration-200"
                />
              </div>

              {/* FORGET PASSWORD */}
              <div className="flex justify-end w-[280px]">
                <a
                  href="/forgot-password"
                  className="text-[#f6d43b] text-xs hover:text-lime-400 transition-colors duration-200"
                >
                  Forget Password?
                </a>
              </div>

              {/* ERROR MESSAGE */}
              {error && (
                <p className="text-red-400 text-xs -mt-2">{error}</p>
              )}

              {/* SIGN IN BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-[280px] h-12 rounded-full bg-[#f6d43b] text-black font-bold text-base tracking-wide hover:bg-lime-400 hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed mt-1"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>

          {/* RIGHT — DOCTOR IMAGE + DOTS */}
          <div className="relative flex items-end justify-center w-[80px] flex-shrink-0 pr-16">

            {/* YELLOW CIRCLE BACKGROUND */}
            <div className="absolute bottom-0 right-16 w-[280px] h-[280px] rounded-full bg-[#f6d43b] overflow-hidden flex items-end justify-center">
              <img
                src="/assets/Login-dtr.png"
                alt="Doctor"
                className="w-[260px] object-contain object-bottom"
                
              />
            </div>

            {/* DECORATIVE DOTS */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full bg-[#f6d43b]"
                  style={{ opacity: 1 - i * 0.15 }}
                />
              ))}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default Login;