"use client";
import React from "react";
import { useWindowSize } from "usehooks-ts";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useConfetti } from "@/store/useConfetti";

const CustomConfetti = () => {
  const { width, height } = useWindowSize();
  const [isConfetti, setIsConfetti] = useConfetti((state) => [
    state.isConFetti,
    state.setIsConFetti,
  ]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      isConfetti === true && setIsConfetti();
    }, 500);
    return () => clearTimeout(timeout);
  }, [isConfetti]);
  return (
    <Confetti
      width={width / 1.2}
      height={height}
      recycle={isConfetti}
      numberOfPieces={1000}
      gravity={0.4}
      wind={0.05}
    />
  );
};

export default CustomConfetti;
