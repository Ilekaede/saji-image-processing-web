import React, { useRef, useEffect } from "react";
import cv from "opencv-ts";

interface HoughTransformProps {
  imageFile: string;
  processTrigger: boolean;
  threshold: number;
}

const HoughTransform = ({
  imageFile,
  processTrigger,
  threshold,
}: HoughTransformProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const handleImageLoad = (Image: HTMLImageElement) => {
      const canvas = canvasRef.current;

      if (canvas) {
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (ctx) {
          canvas.width = Image.width;
          canvas.height = Image.height;
          ctx.drawImage(Image, 0, 0);

          if (processTrigger) {
            const src = cv.imread(canvas);
            const dst = new cv.Mat();

            const img = src.clone();
            cv.cvtColor(img, img, cv.COLOR_BGR2GRAY);
            cv.Canny(img, img, 100, 100);

            const lines = new cv.Mat();
            cv.HoughLines(img, lines, 1, Math.PI / 180, threshold);

            for (let i = 0; i < lines.rows; ++i) {
              let rho = lines.data32F[i * 2];
              let theta = lines.data32F[i * 2 + 1];
              let a = Math.cos(theta);
              let b = Math.sin(theta);
              let x0 = a * rho;
              let y0 = b * rho;
              let x1 = Math.round(x0 + 1000 * -b);
              let y1 = Math.round(y0 + 1000 * a);
              let x2 = Math.round(x0 - 1000 * -b);
              let y2 = Math.round(y0 - 1000 * a);
              cv.line(
                src,
                new cv.Point(x1, y1),
                new cv.Point(x2, y2),
                new cv.Scalar(255, 0, 0, 255),
                1,
                cv.LINE_AA
              );
            }
            cv.imshow(canvas, src);

            src.delete();
            dst.delete();
            lines.delete();
          }
        }
      }
    };

    const img = new Image();
    img.onload = () => handleImageLoad(img);
    img.src = imageFile;
  }, [processTrigger, imageFile, threshold]);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default HoughTransform;
