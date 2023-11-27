"use client";
import React, { useEffect } from "react";

import { gsap,  } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export const Loader = () => {
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.to(".precarga", { opacity: 0, delay: 0.6 });
    gsap.to(".precarga", { display: "none", delay: 0.7 });
  }, []);
  return (
    <>
      <div className="precarga h-screen w-screen z-40 fixed bg-black/90 flex justify-center items-center flex-col">
        <div className="lg:w-1/12 w-6/12" > 
        <img src="/elabuelologo.png" alt="" />
        </div>
<span className="loaderComponent"/>
      </div>
    </>
  );
};
