import React, { useRef, useEffect } from "react";
import cv from "opencv-ts";

interface HoughTransformProps {
  imageFile: string;
  processTrigger: boolean;
}

const HoughTransform = ({ imageFile, processTrigger }: HoughTransformProps) => {
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

        // console.log("width: " + canvas.width + " height: " + canvas.height);

        if (processTrigger) {
          const src = cv.imread(canvas);
          const dst = new cv.Mat();

          const img = src.clone();
          // エッジ検出
          cv.cvtColor(img, img, cv.COLOR_BGR2GRAY);
          cv.Canny(img, img, 100, 100);

          // ハフ変換
          /**
           * HoughLinesPの取るパラメータ
           * @param src - 8ビットシングルチャンネルの2値入力画像
           * @param lines - 検出された線分が出力されるベクトル
           * @param rho - ピクセル単位で表される投票空間の距離分解能
           * @param theta - ラジアン単位で表される投票空間の角度分解能
           * @param threshold - 投票の閾値パラメータ．十分な投票量 (> thresholdの) を得た直線のみが出力される
           */
          const lines = new cv.Mat();
          cv.HoughLines(img, lines, 1, Math.PI / 180, 120);

          // 直線を描画する
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
              new cv.Scalar(255, 0, 0, 255), // RGB
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
  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default HoughTransform;
