import { useEffect, useRef } from "react";
import { DotLottie } from "@lottiefiles/dotlottie-web";
export const useLottie = () => {
  const canvasRef = useRef<HTMLCanvasElement | any >(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    const dotLottie = new DotLottie({
      autoplay: false,
      loop: true,
      layout:{
        fit: "contain",
      },
      speed:0.5,
      canvas: canvasRef.current,
      src: "https://lottie.host/aa39ef2b-a010-4aaf-a683-7d60cca5dd34/5v5HzljKvK.lottie",
    });
    return () => dotLottie.destroy();
  }, []);
  return canvasRef;
};
