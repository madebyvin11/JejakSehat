import { useEffect, useState } from "react";
import Waves from "./Components/Waves";
import ScrollStack, { ScrollStackItem } from "./Components/ScrollStack";
import PixelTransition from "./Components/PixelTransition";

const navItems = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
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
    <div className="w-full min-h-screen bg-[#2d2d2d] pb-[400px]">
      {/* HERO SECTION */}
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

        {/* NAVBAR */}
        <nav className="absolute top-0 left-0 w-full z-20 flex items-center justify-between px-16 py-6">
          {/* LOGO */}
          <div className="flex items-center gap-3 scale-125 ml-8">
            <img
              src="/assets/logo.png"
              alt="Logo"
              className="w-10 h-10 rounded-full object-cover"
            />

            <span className="text-white font-bold text-lg">
              Jejak_sehat
            </span>
          </div>

          {/* NAV ITEMS */}
          <div className="flex items-center gap-10 text-white font-medium">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="hover:text-lime-400 transition duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* RIGHT */}
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

        {/* HERO CONTENT */}
        <div className="absolute inset-0 z-10 flex items-center justify-between px-16">
          {/* LEFT TEXT */}
          <div className="flex flex-col gap-6 max-w-md ml-40 scale-125">
            <h1 className="text-white text-6xl font-bold leading-tight">
              Find Your <br /> Healthy Way
            </h1>

            <p className="text-gray-300 text-base">
              Let's move bad habit's with us <br />
              and start make the new one's
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

          {/* RIGHT IMAGE */}
          <div className="relative left-[-150px] z-10">
            <img
              src="/assets/Doctor1.png"
              alt="Doctor"
              className="w-[650px] object-contain"
            />
          </div>
        </div>

        {/* SCROLL ICON */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white text-3xl">
          ↓
        </div>
      </section>

      {/* WAVE TRANSITION */}
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

      {/* ABOUT SECTION */}
      <section className="relative w-full min-h-[140vh] bg-[#2d2d2d] flex items-center px-20 py-20 overflow-visible">
        <div className="w-full flex items-start justify-between gap-16">
          {/* LEFT CONTENT */}
          <div className="flex flex-col gap-8 max-w-xl relative left-20 translate-y-10">
            <h2 className="text-white text-5xl font-bold">
              About
            </h2>

            <p className="text-gray-300 text-base leading-relaxed">
              Jejak Sehat is a platform designed to help individuals
              live healthier and more balanced lives. We provide
              simple tools to track daily habits, monitor progress,
              and build consistent routines.
            </p>

            {/* STACK CARDS */}
            <div className="flex flex-col gap-6">
              <h3 className="text-white text-3xl font-bold">
                All You Can Do
              </h3>

              <div className="w-full h-[320px] relative overflow-visible">
                <ScrollStack
                  itemDistance={80}
                  itemScale={0.03}
                  itemStackDistance={20}
                  stackPosition="10%"
                  scaleEndPosition="5%"
                  baseScale={0.88}
                  useWindowScroll={false}
                >
                  <ScrollStackItem>
                    <div className="w-full h-[160px] rounded-2xl bg-[#3B82F6] px-8 py-5 text-white shadow-2xl flex flex-col justify-center">
                      <h2 className="text-xl font-bold mb-1">
                        Track Habits
                      </h2>

                      <p className="text-gray-200 text-sm">
                        Monitor your daily routines and build
                        consistency.
                      </p>
                    </div>
                  </ScrollStackItem>

                  <ScrollStackItem>
                    <div className="w-full h-[160px] rounded-2xl bg-[#10B981] px-8 py-5 text-white shadow-2xl flex flex-col justify-center">
                      <h2 className="text-xl font-bold mb-1">
                        Monitor Progress
                      </h2>

                      <p className="text-gray-200 text-sm">
                        See your improvements and stay motivated
                        every day.
                      </p>
                    </div>
                  </ScrollStackItem>

                  <ScrollStackItem>
                    <div className="w-full h-[160px] rounded-2xl bg-[#84CC16] px-8 py-5 text-white shadow-2xl flex flex-col justify-center">
                      <h2 className="text-xl font-bold mb-1">
                        Health Tips
                      </h2>

                      <p className="text-gray-200 text-sm">
                        Get simple daily advice for a healthier
                        lifestyle.
                      </p>
                    </div>
                  </ScrollStackItem>
                </ScrollStack>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative flex-shrink-0 right-40">
            {/* DOCTOR IMAGE */}
            <img
              src="/assets/Doctor2.png"
              alt="Doctor"
              className="w-[500px] object-contain"
            />

            {/* PIXEL TRANSITION CARD */}
            <div className="absolute top-[900px] right-[40px] z-20 scale-150">
              <PixelTransition
                firstContent={
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
                    alt="Cat"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                }
                secondContent={
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "grid",
                      placeItems: "center",
                      backgroundColor: "#111",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: 900,
                        fontSize: "3rem",
                        color: "#ffffff",
                      }}
                    >
                      Meow!
                    </p>
                  </div>
                }
                gridSize={8}
                pixelColor="#ffffff"
                once={false}
                animationStepDuration={0.4}
                className="custom-pixel-card"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;