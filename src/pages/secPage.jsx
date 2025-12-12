import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bg from "../assets/2.png";

import shoe1 from "../assets/Black.png";
import shoe2 from "../assets/Red.png";
import shoe3 from "../assets/Pink.png";
import shoe4 from "../assets/Orange.png";
import shoe5 from "../assets/Brown.png";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  { name: "Nike Air Max 270", shoe: shoe1 },
  { name: "Nike Air Max Dn8", shoe: shoe2 },
  { name: "Nike Alphafly 3", shoe: shoe3 },
  { name: "Nike Vomero Plus", shoe: shoe4 },
  { name: "Nike Shox R4", shoe: shoe5 },
];

export default function SecondPage({ selectedSlide }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const btnRef = useRef(null);
  const shoeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",    // animation starts when user reaches 70% of page
          toggleActions: "play none none none",
        },
      });

      // Title animation
      tl.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );

      // Description
      tl.fromTo(
        descRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.35"
      );

      // Button
      tl.fromTo(
        btnRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4 },
        "-=0.25"
      );

      // Shoe animation (slide in + elastic bounce)
      tl.fromTo(
        shoeRef.current,
        { x: 150, opacity: 0, scale: 0.9 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.6"
      );
    });

    return () => ctx.revert();
  }, [selectedSlide]);

  return (
    <div
      ref={sectionRef}
      className="w-full h-screen px-6 md:px-20 py-24 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-start"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* LEFT TEXT */}
      <div className="flex flex-col gap-4 font-redhat z-10 max-w-full md:max-w-[470px]">
        <h1
          ref={titleRef}
          className="text-[60px] md:text-[110px] leading-[55px] md:leading-[90px] font-extrabold text-black"
        >
          {slides[selectedSlide].name}
        </h1>

        {/* BUTTON */}
        <button
          ref={btnRef}
          className="w-fit px-5 py-2 mt-3 bg-black text-white rounded-full text-sm"
        >
          Buy now
        </button>

        {/* DESCRIPTION */}
        <p
          ref={descRef}
          className="text-[12px] text-gray-600 w-[200px] mt-3 leading-relaxed"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      {/* RIGHT SHOE */}
      <img
        ref={shoeRef}
        src={slides[selectedSlide].shoe}
        className="absolute md:static right-0 top-1/2 md:top-auto -translate-y-1/2 md:translate-y-0 
                   h-[350px] sm:h-[450px] md:h-[650px] lg:h-[600px] w-auto pointer-events-none"
        alt="Shoe"
      />
    </div>
  );
}
