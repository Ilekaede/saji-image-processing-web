import cv2
import numpy as np
import os

def main():
    # パス設定
    # プロジェクトルートからの相対パス
    input_video_path = "public/videos/ball_cutted.mp4"
    output_video_path = "public/videos/kalman_result.mp4"
    
    # 絶対パスに変換（実行ディレクトリ依存を減らすため）
    base_dir = os.getcwd()
    input_full_path = os.path.join(base_dir, input_video_path)
    output_full_path = os.path.join(base_dir, output_video_path)
    
    print(f"Input: {input_full_path}")
    print(f"Output: {output_full_path}")
    
    if not os.path.exists(input_full_path):
        print("Error: Input video not found.")
        return

    cap = cv2.VideoCapture(input_full_path)
    if not cap.isOpened():
        print("Error: Could not open video.")
        return

    # 動画情報の取得
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    
    # 出力設定 (MP4, H.264)
    # macOS/OpenCVでMP4を出力する場合、'avc1' または 'mp4v' を試す
    fourcc = cv2.VideoWriter_fourcc(*'avc1')
    writer = cv2.VideoWriter(output_full_path, fourcc, fps, (width, height))
    
    if not writer.isOpened():
        print("Warning: Could not open VideoWriter with 'avc1'. Trying 'mp4v'.")
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        writer = cv2.VideoWriter(output_full_path, fourcc, fps, (width, height))

    # カルマンフィルタの初期化
    # 状態変数: [x, y, dx, dy] (4次元)
    # 観測変数: [x, y] (2次元)
    kalman = cv2.KalmanFilter(4, 2)
    
    # 観測行列 (H): 状態 [x, y, dx, dy] から [x, y] を観測する
    kalman.measurementMatrix = np.array([[1, 0, 0, 0],
                                         [0, 1, 0, 0]], np.float32)

    # 状態遷移行列 (A): 等速直線運動モデル
    # x(t+1) = x(t) + dx(t)
    # y(t+1) = y(t) + dy(t)
    kalman.transitionMatrix = np.array([[1, 0, 1, 0],
                                        [0, 1, 0, 1],
                                        [0, 0, 1, 0],
                                        [0, 0, 0, 1]], np.float32)

    # プロセスノイズ (Q): モデルの不確かさ（小さいとモデルを信じる）
    kalman.processNoiseCov = np.eye(4, dtype=np.float32) * 1e-4

    # 観測ノイズ (R): センサの不確かさ（大きいと予測を信じて滑らかになる）
    kalman.measurementNoiseCov = np.eye(2, dtype=np.float32) * 0.1

    # 初期状態乱数 (適当)
    kalman.statePost = np.array([[width/2], [height/2], [0], [0]], np.float32)

    prev_predict = None
    trajectory = []

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # 予測フェーズ
        prediction = kalman.predict()
        predict_pt = (int(prediction[0]), int(prediction[1]))
        
        # 観測（色抽出）フェーズ
        hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
        
        # 青色抽出
        lower_blue = np.array([100, 100, 100])
        upper_blue = np.array([140, 255, 255])
        
        mask = cv2.inRange(hsv, lower_blue, upper_blue)

        # ROI設定：画面上部50%をマスクアウト（下半分のみ処理）
        h, w = mask.shape
        roi_limit = int(h * 0.5)
        mask[0:roi_limit, :] = 0
        
        # ノイズ除去
        kernel = np.ones((5, 5), np.uint8)
        mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
        
        # 輪郭検出
        contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        best_contour = None
        max_area = 0
        center = None

        for cnt in contours:
            area = cv2.contourArea(cnt)
            if area < 100: continue
            
            perimeter = cv2.arcLength(cnt, True)
            if perimeter == 0: continue
            
            circularity = 4 * np.pi * area / (perimeter * perimeter)
            if circularity > 0.5: 
                if area > max_area:
                    max_area = area
                    best_contour = cnt
        
        if best_contour is not None:
            M = cv2.moments(best_contour)
            if M["m00"] != 0:
                cx = int(M["m10"] / M["m00"])
                cy = int(M["m01"] / M["m00"])
                center = (cx, cy)
            
            # 更新（補正）フェーズ
            measurement = np.array([[np.float32(cx)], [np.float32(cy)]])
            kalman.correct(measurement)
            
            # 観測値を赤丸で描画
            cv2.circle(frame, center, 10, (0, 0, 255), -1)
            cv2.putText(frame, "Measured", (cx + 15, cy), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 1)

        # 推定値を緑の十字で描画
        cv2.drawMarker(frame, predict_pt, (0, 255, 0), cv2.MARKER_CROSS, 20, 2)
        if center: # 観測があった場合のみラベルを出すなど調整も可だが、常に予測は表示
             cv2.putText(frame, "Kalman Prediction", (predict_pt[0] + 15, predict_pt[1] + 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1)

        # 軌跡描画
        trajectory.append(predict_pt)
        if len(trajectory) > 50: # 最新50フレーム分
            trajectory.pop(0)
            
        for i in range(1, len(trajectory)):
            cv2.line(frame, trajectory[i-1], trajectory[i], (0, 255, 0), 2)

        writer.write(frame)

    cap.release()
    writer.release()
    print("Video generation completed.")

if __name__ == "__main__":
    main()
