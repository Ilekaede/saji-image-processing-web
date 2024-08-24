import { useEffect, useRef } from "react";
import cv from "opencv-ts";

interface ImageProcessorProps {
  imageFile: string;
  processTrigger: boolean;
  kernelSize: number;
}

const Median = ({
  imageFile,
  processTrigger,
  kernelSize,
}: ImageProcessorProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => handleImageLoad(img);
    img.src = imageFile;
  }, [processTrigger, imageFile]);

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

          if (kernelSize % 2 === 0) {
            kernelSize = 1; //カーネルサイズを偶数で送られてきた時のエラー処理
          }

          cv.medianBlur(src, dst, kernelSize);
          cv.imshow(canvas, dst);

          src.delete();
          dst.delete();
        }
      }
    }
  };
  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Median;
