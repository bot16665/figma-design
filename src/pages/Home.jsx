// src/pages/Home.jsx
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

import nikeLogo from "../assets/nike.png";
import btn from "../assets/button.png";

// SHOES
import shoe1 from "../assets/Black.png";
import shoe2 from "../assets/Red.png";
import shoe3 from "../assets/Pink.png";
import shoe4 from "../assets/Orange.png";
import shoe5 from "../assets/Brown.png";

// MAIN HOME BACKGROUND (can be dynamic later)
import bg1 from "../assets/1.png";
import bg2 from "../assets/red2.png";
import bg3 from "../assets/pink3.png";
import bg4 from "../assets/orange4.png";
import bg5 from "../assets/brown5.png";

// SLIDE DATA
const slides = [
  {
    name: "Nike Air Max 270",
    title: "Wear your style",
    subtitle: "with Comfort",
    desc: "Lightweight. Breathable. Designed for everyday comfort.",
    shoe: shoe1,
    bg: bg1,
  },
  {
    name: "Nike Air ZoomX",
    title: "Run Beyond Limits",
    subtitle: "Feel the Speed",
    desc: "Built for runners who crave comfort and power.",
    shoe: shoe2,
    bg: bg2,
  },
  {
    name: "Nike React Vision",
    title: "Step Into",
    subtitle: "Future Comfort",
    desc: "Performance and style crafted for daily life.",
    shoe: shoe3,
    bg: bg3,
  },
  {
    name: "Nike Pegasus Turbo",
    title: "Fly High",
    subtitle: "Stay Ahead",
    desc: "Ultra-responsive cushioning for next-level speed.",
    shoe: shoe4,
    bg: bg4,
  },
  {
    name: "Nike Shox R4",
    title: "Feel the Power",
    subtitle: "Run with Style",
    desc: "Bold design with premium comfort.",
    shoe: shoe5,
    bg: bg5,
  },
];

export default function Home({ selectedSlide, setSelectedSlide }) {
  // refs for elements to animate
  const shoeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const nameRef = useRef(null);
  const descRef = useRef(null);
  const btnRef = useRef(null);

  // Animate initial entrance on mount and when selectedSlide changes (in animation)
  useEffect(() => {
    // entrance animation (fade in & slide)
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Title slide in from left
    tl.fromTo(
      titleRef.current,
      { x: -80, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, delay: 0.05 }
    );

    // subtitle fade in slightly after
    tl.fromTo(
      subtitleRef.current,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.45 },
      "-=0.45"
    );

    // name and desc fade/slide up
    tl.fromTo(
      [nameRef.current, descRef.current],
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
      "-=0.3"
    );

    // shoe entrance: subtle pop + settle
    tl.fromTo(
      shoeRef.current,
      { opacity: 0, y: 40, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "elastic.out(1, 0.6)" },
      "-=0.6"
    );

    // small button pulse to attract
    tl.fromTo(
      btnRef.current,
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4 },
      "-=0.4"
    );

    return () => {
      tl.kill();
    };
  }, [selectedSlide]);

  // nextSlide: animate current shoe/text out -> then update index -> entrance animation triggers via effect
  const nextSlide = () => {
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        // update index after out animation completes
        setSelectedSlide((prev) => (prev + 1) % slides.length);
      },
    });

    // animate shoe + text out quickly
    tl.to([shoeRef.current], { opacity: 0, y: -40, scale: 0.98, duration: 0.35 });
    tl.to(
      [titleRef.current, subtitleRef.current, nameRef.current, descRef.current],
      { opacity: 0, y: -12, duration: 0.25, stagger: 0.03 },
      "-=0.28"
    );

    // small pulse on button to show action
    gsap.fromTo(
      btnRef.current,
      { scale: 1 },
      { scale: 0.92, duration: 0.06, yoyo: true, repeat: 1, ease: "power1.inOut" }
    );
  };

  return (
    <div
      className="w-full min-h-screen relative overflow-hidden flex items-start justify-center"
      style={{
        backgroundImage: `url(${slides[selectedSlide].bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >


      <div className="relative z-10 w-full max-w-[1600px] px-4 md:px-8">

        {/* NAVBAR */}
        <header className="w-full absolute top-6 left-0 flex items-center justify-between px-4 md:px-8">
          <img src={nikeLogo} alt="Nike" className="w-20 md:w-24" />

          <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-3 bg-white/12 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            {["Home", "Men", "Woman", "Kids"].map((it) => (
              <button
                key={it}
                className="text-white text-xs md:text-sm px-3 py-1 rounded-full hover:bg-white hover:text-black transition"
              >
                {it}
              </button>
            ))}
          </nav>

          <div className="flex gap-2 md:gap-3">
            {[8, 9, 10].map((s) => (
              <div
                key={s}
                className="text-white text-xs md:text-sm px-2 md:px-3 py-1 border border-white/20 rounded-full"
              >
                {s}
              </div>
            ))}
          </div>
        </header>

        {/* HERO SECTION */}
        <main className="w-full h-screen flex flex-col md:flex-row items-center justify-between px-4 md:px-12">
          {/* LEFT TEXT */}
          <div className="flex flex-col gap-4 mt-20 md:mt-24 ml-0 md:ml-10 font-redhat max-w-full md:max-w-[700px]">
            <h1
              ref={titleRef}
              className="text-4xl md:text-6xl lg:text-6xl font-bold leading-tight text-white"
            >
              {slides[selectedSlide].title} <br />
              <span ref={subtitleRef} className="text-gray-300 text-xl md:text-2xl">
                {slides[selectedSlide].subtitle}
              </span>
            </h1>

            <p ref={nameRef} className="text-gray-300 text-sm md:text-base">
              {slides[selectedSlide].name}
            </p>

            <p ref={descRef} className="text-gray-300 text-sm md:text-base mt-2 md:mt-4">
              {slides[selectedSlide].desc}
            </p>
          </div>

          {/* RIGHT SIDE — SHOE + BUTTON */}
          <div className="relative my-8 md:my-14 w-full md:w-[900px] lg:w-[1000px] flex justify-center pointer-events-none">
            {/* SHOE */}
            <img
              ref={shoeRef}
              src={slides[selectedSlide].shoe}
              alt="Nike Shoe"
              className="h-[340px] sm:h-[520px] md:h-[700px] lg:h-[600px] w-auto rotate-[-12deg] drop-shadow-[0_80px_90px_rgba(0,0,0,0.75)] transition-all duration-500"
            />

            {/* NEXT SLIDE BUTTON */}
            <div className="absolute top-[112px] right-6 md:right-32 pointer-events-auto mt-95">
              <button
                ref={btnRef}
                onClick={nextSlide}
                aria-label="Next shoe"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md hover:scale-110 transition-transform"
              >
                <img src={btn} alt="btn" className="w-[20px] h-[20px] md:w-[28px] md:h-[28px]" />
              </button>
            </div>

          </div>
        </main>

        {/* BUY NOW BUTTON */}
        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20">
          <button className="px-4 md:px-6 py-2 md:py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
