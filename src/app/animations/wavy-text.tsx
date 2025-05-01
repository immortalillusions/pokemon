"use client";

import { animate, stagger } from "motion";
import { splitText } from "motion-plus";
import { useEffect, useRef } from "react";

export default function WavyText({text1, text2, wave}: {text1:string, text2:string, wave: string}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!containerRef.current) return;

      const { chars } = splitText(
        containerRef.current.querySelector(".wavy")!
      );

      const staggerDelay = 0.15;

      animate(
        chars,
        { y: [-5, 5] }, // Wavy up and down motion
        {
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          duration: 1,
          delay: stagger(
            staggerDelay,
            { startDelay: -staggerDelay * chars.length } // Start midway
          ),
        }
      );
    });
  }, []);

  return (
    <div
      className="flex justify-center items-center w-full"
      ref={containerRef}
    >
      <h1 className="h1">
        {text1}<span className="wavy transform opacity">{wave}</span>{text2}
      </h1>
    </div>
  );
}