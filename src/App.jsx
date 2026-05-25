import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Waves from "./Components/Waves";
import ScrollStack, { ScrollStackItem } from "./Components/ScrollStack";
import FlowingMenu from "./Components/FlowingMenu";
import Login from "./Login";
import Crud from "./Crud";

import img1 from "./Asset/Inst.jpg";
import img2 from "./Asset/Github.jpg";
import img3 from "./Asset/Gmail.jpg";
import img4 from "./Asset/Portfolio.jpg";

/* =========================
   TAG TIDAK TERLIHAT (FIX)
   HOME COMPONENT DITAMBAHKAN
========================= */
function smoothScrollTo(targetId, duration = 1500) {
  const target = document.getElementById(targetId);

  if (!target) return;

  const startY = window.scrollY;
  const targetY = target.getBoundingClientRect().top + window.scrollY;
  const distance = targetY - startY;

  let startTime = null;

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(currentTime) {
    if (!startTime) startTime = currentTime;

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    window.scrollTo(0, startY + distance * easeInOutCubic(progress));

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

const navItems = [
  { label: "Home", href: null },
  { label: "About", href: "about" },
  { label: "Contact", href: "contact" },
];

const demoItems = [
  {
    link: "https://www.instagram.com/madeby._vin/",
    text: "Instagram",
    image: img1,
  },
  {
    link: "https://github.com/madebyvin11",
    text: "Github",
    image: img2,
  },
  {
    link: "mailto:dondilauvin@gmail.com",
    text: "Gmail",
    image: img3,
  },
  {
    link: "#",
    text: "Portfolio",
    image: img4,
  },
];

/* =========================
   HOME COMPONENT (FIX UTAMA)
========================= */
function Home() {
  return (
    <>
      {/* HERO */}
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
        <nav className="absolute top-0 left-0 z-20 flex w-full items-center justify-between px-16 py-6">
          <div className="ml-8 flex scale-125 items-center gap-3">
            <img
              src="/assets/logo.png"
              alt="Logo"
              className="h-10 w-10 rounded-full object-cover"
            />

            <span className="text-lg font-bold text-white">Jejak_sehat</span>
          </div>

          <div className="flex items-center gap-10 text-white font-medium">
            {navItems.map((item, index) => (
              <a
                key={index}
                href="#"
                onClick={(e) => {
                  e.preventDefault();

                  if (item.href) {
                    smoothScrollTo(item.href, 1500);
                  } else {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }
                }}
                className="transition duration-300 hover:text-lime-400"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/Crud">
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400 font-bold text-black shadow-lg">
              ▶
            </button>
            </Link>

            <img
              src="/assets/hero.png"
              alt="Avatar"
              className="h-10 w-10 rounded-full border-2 border-lime-400 object-cover"
            />
          </div>
        </nav>

        {/* HERO CONTENT */}
        <div className="absolute inset-0 z-10 flex items-center justify-between px-16">
          <div className="ml-40 flex max-w-md scale-125 flex-col gap-6">
            <h1 className="text-6xl font-bold leading-tight text-white">
              Find Your <br /> Healthy Way
            </h1>

            <p className="text-base text-gray-300">
              Let's move bad habits with us <br />
              and start making new ones
            </p>

            <div className="flex items-center gap-4">
              <Link to="/login">
                <button className="rounded-full bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-lime-400 transition">
                  Login
                </button>
              </Link>

              <img
                src="/assets/badge.png"
                alt="Badge"
                className="h-12 w-12 object-contain"
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

        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce text-3xl text-white">
          ↓
        </div>
      </section>

      {/* WAVE */}
      <div className="w-full bg-black">
        <svg
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block h-24 w-full"
        >
          <path
            d="M0,40 C180,100 360,0 540,60 C720,120 900,0 1080,60 C1260,120 1440,40 1440,40 L1440,120 L0,120 Z"
            fill="#2d2d2d"
          />
        </svg>
      </div>

      {/* ABOUT */}
      <section id="about" className="w-full bg-[#2d2d2d] px-20 py-20">
        <div className="flex w-full items-start justify-between gap-10">
          <div className="ml-20 flex max-w-xl flex-col gap-8">
            <h2 className="text-5xl font-bold text-white">About</h2>

            <p className="text-base leading-relaxed text-gray-300">
              Jejak Sehat is a platform designed to help individuals live
              healthier and more balanced lives.
            </p>

            <div className="flex flex-col gap-6">
              <h3 className="text-3xl font-bold text-white">All You Can Do</h3>

              <div className="relative h-[320px] w-full overflow-hidden">
                <ScrollStack
                  itemDistance={120}
                  itemScale={0.03}
                  itemStackDistance={20}
                  stackPosition="10%"
                  scaleEndPosition="50%"
                  baseScale={0.88}
                  useWindowScroll={false}
                >
                  <ScrollStackItem>
                    <div className="flex h-[160px] flex-col justify-center rounded-2xl bg-[#b67f19] px-8 py-5 text-white shadow-2xl">
                      <h2 className="mb-1 text-xl font-bold">Track Habits</h2>
                      <p className="text-sm text-gray-200">
                        Monitor your daily routines and build consistency.
                      </p>
                    </div>
                  </ScrollStackItem>

                  <ScrollStackItem>
                    <div className="flex h-[160px] flex-col justify-center rounded-2xl bg-[#f6d43b] px-8 py-5 text-white shadow-2xl">
                      <h2 className="mb-1 text-xl font-bold">
                        Monitor Progress
                      </h2>
                      <p className="text-sm text-gray-200">
                        See your improvements and stay motivated every day.
                      </p>
                    </div>
                  </ScrollStackItem>

                  <ScrollStackItem>
                    <div className="flex h-[160px] flex-col justify-center rounded-2xl bg-[#ffd000] px-8 py-5 text-white shadow-2xl">
                      <h2 className="mb-1 text-xl font-bold">Health Tips</h2>
                      <p className="text-sm text-gray-200">
                        Get simple daily advice for a healthier lifestyle.
                      </p>
                    </div>
                  </ScrollStackItem>
                </ScrollStack>
              </div>
            </div>
          </div>

          <div className="mr-20 mt-10 flex flex-shrink-0 flex-col items-center gap-10 scale-110">
            <img
              src="/assets/Doctor2.png"
              alt="Doctor"
              className="w-[400px] object-contain"
            />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        style={{
          height: "600px",
          position: "relative",
        }}
      >
        <FlowingMenu
          items={demoItems}
          speed={15}
          textColor="#ffffff"
          bgColor="#120F17"
          marqueeBgColor="#ffffff"
          marqueeTextColor="#120F17"
          borderColor="#ffffff"
        />
      </section>
    </>
  );
}

/* =========================
   APP + ROUTER
========================= */
function App() {
  return (
    <div className="w-full bg-[#2d2d2d]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;