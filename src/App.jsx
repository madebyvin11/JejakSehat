import { useState, useEffect } from "react";
import Waves from "./Components/Waves";
import ChromaGrid from "./Components/ChromaGrid";

const items = [
  {
    image: "https://i.pravatar.cc/300?img=1",
    title: "Track Habits",
    subtitle: "Monitor your daily routines",
    handle: "@trackhabits",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #1a1a1a)",
  },
  {
    image: "https://i.pravatar.cc/300?img=2",
    title: "Monitor Progress",
    subtitle: "See your improvements",
    handle: "@progress",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #1a1a1a)",
  },
  {
    image: "https://i.pravatar.cc/300?img=3",
    title: "Health Tips",
    subtitle: "Get daily health advice",
    handle: "@healthtips",
    borderColor: "#84CC16",
    gradient: "linear-gradient(180deg, #84CC16, #1a1a1a)",
  },
];

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full">
      {/* Section 1 - Hero */}
      <section className="relative w-full h-screen overflow-hidden bg-black">
        <Waves
          lineColor="#84CC16"
          backgroundColor="transparent"
          waveSpeedX={0.1}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.01}
          maxCursorMove={120}
          xGap={12}
          yGap={36}
        />

        {/* Navbar */}
        <nav className="absolute top-0 left-0 w-full z-20 flex items-center justify-between px-16 py-6">
          <div className="flex items-center gap-3 scale-150 translate-y-1 ml-10">
            <img
              src="/assets/logo.png"
              alt="Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-white font-bold text-lg">Jejak_sehat</span>
          </div>
          <ul className="flex gap-10 text-white font-medium">
            <li className="cursor-pointer hover:text-lime-400 transition">
              Home
            </li>
            <li className="cursor-pointer hover:text-lime-400 transition">
              About
            </li>
            <li className="cursor-pointer hover:text-lime-400 transition">
              Shop
            </li>
            <li className="cursor-pointer hover:text-lime-400 transition">
              Contact
            </li>
          </ul>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-lime-400 flex items-center justify-center text-black font-bold shadow-lg">
              ▶
            </button>
            <img
              src="/assets/hero.png"
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover border-2 border-lime-400"
            />
          </div>
        </nav>

        {/* Hero Content */}
        <div className="absolute inset-0 z-10 flex items-center justify-between px-16">
          <div className="flex flex-col gap-6 max-w-md ml-40 scale-125">
            <h1 className="text-white text-6xl font-bold leading-tight">
              Find Your <br /> Healthy Way
            </h1>
            <p className="text-gray-300 text-base">
              Let's move bad habit's with us <br /> and start make the new one's
            </p>
            <div className="flex items-center gap-4">
              <button className="bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-lime-400 transition">
                Login
              </button>
              <img
                src="/assets/badge.png"
                alt="Badge"
                className="w-12 h-12 object-contain"
              />
            </div>
          </div>

          <div className="relative left-[-150px] z-10">
            <img
              src="/assets/Doctor1.png"
              alt="Doctor"
              className="w-[650px] object-contain"
            />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white text-3xl">
          ↓
        </div>
      </section>

      {/* Garis Transisi Wave SVG */}
      <div className="w-full bg-black">
        <svg
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-24 block"
        >
          <path
            d="M0,40 C180,100 360,0 540,60 C720,120 900,0 1080,60 C1260,120 1440,40 1440,40 L1440,120 L0,120 Z"
            fill="#2d2d2d"
          />
        </svg>
      </div>

      {/* Section 2 - About */}
      <section className="w-full min-h-screen bg-[#2d2d2d] flex items-center px-20 py-20">
        <div className="w-full flex items-start justify-between gap-16">
          {/* Left - Text Content */}
          <div className="flex flex-col gap-8 max-w-xl relative left-23 translate-y-10 scale-110">
            <h2 className="text-white text-5xl font-bold">About</h2>
            <p className="text-gray-300 text-base leading-relaxed">
              Jejak Sehat is a platform designed to help individuals live
              healthier and more balanced lives. We provide simple tools to
              track daily habits, monitor progress, and build consistent
              routines, making it easier to achieve long-term well-being.
            </p>

            <div className="flex flex-col gap-6 translate-x-1 scale-100 bg-[#2d2d2d]">
              <h3 className="text-white text-3xl font-bold">All You Can Do</h3>
              <div className="w-full h-56 relative right-1 scale-110  bg-[#2d2d2d]">
                <ChromaGrid
                  items={items}
                  radius={150}
                  damping={0.45}
                  fadeOut={0.6}
                  ease="power3.out"
                />
              </div>
            </div>
          </div>

          {/* Right - Doctor Image */}
          <div className="relative flex-shrink-0">
            <img
              src="/assets/Doctor2.png"
              alt="Doctor"
              className="w-[500px] relative right-50 object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
