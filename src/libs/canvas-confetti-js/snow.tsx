// src/libs/canvas-confetti/snow.ts
import confetti from "canvas-confetti";

export const startSnowConfetti = () => {
  let animationFrameId: number;

  const frame = () => {
    let skew = 1;
    const ticks = Math.max(150, 300);
    skew = Math.max(0.8, skew - 0.001);

    confetti({
      particleCount: 1,
      startVelocity: 0,
      ticks: ticks,
      origin: {
        x: Math.random(),
        y: Math.random() * skew - 0.2,
      },
      colors: ["#fff"],
      shapes: ["square"],
      gravity: randomInRange(0.1, 0.3),
      scalar: randomInRange(0.4, 1),
      drift: randomInRange(-0.4, 0.4),
    });

    // Loop tanpa henti
    animationFrameId = requestAnimationFrame(frame);
  };

  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  // Mulai animasi
  frame();

  // Mengembalikan fungsi cleanup
  return () => {
    cancelAnimationFrame(animationFrameId);
    confetti.reset();
  };
};