import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bg from "../assets/3.png";

import shoe1 from "../assets/Black.png";
import shoe2 from "../assets/Red.png";
import shoe3 from "../assets/Pink.png";
import shoe4 from "../assets/Orange.png";
import shoe5 from "../assets/Brown.png";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  { shoe: shoe1 },
  { shoe: shoe2 },
  { shoe: shoe3 },
  { shoe: shoe4 },
  { shoe: shoe5 },
];

export default function ThirdPage({ selectedSlide }) {
  const sectionRef = useRef(null);
  const shoeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const tagRefs = useRef([]);

  useEffect(() => {
    tagRefs.current = [];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",   // FIXED — animation plays only when ThirdPage is visible
          toggleActions: "play none none none",
        },
      });

      // SHOE animation
      tl.fromTo(
        shoeRef.current,
        { x: -150, opacity: 0, scale: 0.9 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
        }
      );

      // TITLE animation
      tl.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.7"
      );

      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55 },
        "-=0.5"
      );

      // TAGS animation
      tl.fromTo(
        tagRefs.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.12 },
        "-=0.4"
      );
    });

    return () => ctx.revert();
  }, [selectedSlide]);

  return (
    <div
      ref={sectionRef}
      className="w-full h-screen relative overflow-hidden flex items-center justify-center px-6 md:px-20"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* LEFT SHOE */}
      <img
        ref={shoeRef}
        src={slides[selectedSlide].shoe}
        className="
          absolute left-6 md:left-10 
          top-1/2 -translate-y-1/2
          h-[320px] sm:h-[450px] md:h-[650px] lg:h-[600px]
          w-auto pointer-events-none
        "
      />

      {/* RIGHT TEXT */}
      <div className="absolute top-16 md:top-20 right-6 md:right-20 text-black font-redhat text-right">
        <h1
          ref={titleRef}
          className="text-[50px] sm:text-[65px] md:text-[80px] font-extrabold leading-[55px] md:leading-[70px]"
        >
          Quality
        </h1>

        <h1
          ref={subtitleRef}
          className="text-[50px] sm:text-[65px] md:text-[80px] font-extrabold leading-[55px] md:leading-[70px]"
        >
          that speaks.
        </h1>
      </div>

      {/* FLOATING TAGS */}
      {[
        "• Eco-friendly dyes",
        "• Sustainable Material",
        "• Slip-resistant soles",
        "• Quick-dry lining",
        "• Shock absorption",
        "• Lightweight Design",
        "• Durable stitching",
      ].map((text, i) => (
        <div
          key={i}
          ref={(el) => (tagRefs.current[i] = el)}
          className="absolute bg-white shadow-sm px-4 py-1 rounded-full text-[10px] sm:text-[12px]"
          style={{
            top: [
              "20%", "15%", "40%", "55%", "50%", "85%", "70%",
            ][i],
            left: [
              "32%", "55%", "10%", "65%", "70%", "40%", "55%",
            ][i],
          }}
        >
          {text}
        </div>
      ))}

      {/* SHADOW */}
      <div
        className="absolute bottom-12 left-6 md:left-14 w-[200px] md:w-[300px] h-[60px] md:h-[80px] rounded-full blur-[50px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(80,80,80,0.3) 0%, rgba(0,0,0,0.05) 70%, transparent 100%)",
        }}
      />
    </div>
  );
}
