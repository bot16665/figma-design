import React, { useState } from "react";
import Home from "./pages/Home";
import SecondPage from "./pages/SecPage";
import ThirdPage from "./pages/TrPage";

export default function App() {
  // GLOBAL SHOE INDEX (controls Home + SecondPage)
  const [selectedSlide, setSelectedSlide] = useState(0);

  return (
    <div className="w-full overflow-hidden">

      {/* HOME PAGE */}
      <section id="home">
        <Home 
          selectedSlide={selectedSlide} 
          setSelectedSlide={setSelectedSlide} 
        />
      </section>

      {/* SECOND PAGE */}
      <section id="page2">
        <SecondPage selectedSlide={selectedSlide} />
      </section>

      {/* THIRD PAGE */}
      <section id="page3">
        <ThirdPage selectedSlide={selectedSlide} />
      </section>
    </div>
  );
}
