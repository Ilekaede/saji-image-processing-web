import cv2
import numpy as np
import os

def main():
    # --- 設定 ---
    # パス設定
    input_video_path = "public/videos/ball_cutted.mp4"
    output_video_path = "public/videos/particle_result.mp4"
    
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

    # 動画情報
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    
    # VideoWriter
    fourcc = cv2.VideoWriter_fourcc(*'avc1')
    writer = cv2.VideoWriter(output_full_path, fourcc, fps, (width, height))
    if not writer.isOpened():
        print("Warning: Could not open VideoWriter with 'avc1'. Trying 'mp4v'.")
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        writer = cv2.VideoWriter(output_full_path, fourcc, fps, (width, height))

    # --- パーティクルフィルタ初期化 ---
    num_particles = 2000
    
    # 状態: [x, y, dx, dy]
    # 初期化: 画面全体にランダム散布。速度は0付近
    particles = np.zeros((num_particles, 4), dtype=np.float32)
    particles[:, 0] = np.random.uniform(0, width, num_particles)
    particles[:, 1] = np.random.uniform(0, height, num_particles)
    particles[:, 2] = np.random.randn(num_particles) * 5  # dx
    particles[:, 3] = np.random.randn(num_particles) * 5  # dy
    
    weights = np.ones(num_particles) / num_particles # 等重み
    
    # ノイズ設定
    process_noise = 3.0 # 予測時の拡散 (少し広げる)
    measurement_noise = 30.0 # 観測時の許容誤差（ピクセル） (厳しくする)

    trajectory = []

    # 背景差分法の初期化 (MOG2)
    # 動いている物体のみを抽出する
    backSub = cv2.createBackgroundSubtractorMOG2(history=100, varThreshold=50, detectShadows=False)

    # Debug Mask Writer
    mask_writer = cv2.VideoWriter(os.path.join(base_dir, "public/videos/particle_mask_debug.mp4"), 
                                  fourcc, fps, (width, height))


    while True:
        ret, frame = cap.read()
        if not ret:
            break
            
        # --- 1. 予測 (Prediction) ---
        particles[:, 0] += particles[:, 2]
        particles[:, 1] += particles[:, 3]
        
        particles[:, 0] += np.random.randn(num_particles) * process_noise
        particles[:, 1] += np.random.randn(num_particles) * process_noise
        
        particles[:, 2] += np.random.randn(num_particles) * (process_noise * 1.0)
        particles[:, 3] += np.random.randn(num_particles) * (process_noise * 1.0)

        particles[:, 0] = np.clip(particles[:, 0], 0, width - 1)
        particles[:, 1] = np.clip(particles[:, 1], 0, height - 1)
        
        # --- 2. 観測 (Observation) ---
        # 背景差分マスク取得
        fg_mask = backSub.apply(frame)
        
        # 色抽出
        hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
        lower_blue = np.array([100, 100, 100])
        upper_blue = np.array([140, 255, 255])
        color_mask = cv2.inRange(hsv, lower_blue, upper_blue)
        
        # AND演算: 「青い」かつ「動いている」領域のみ抽出
        # これにより背景の青い物体（静止）を除去
        mask = cv2.bitwise_and(color_mask, color_mask, mask=fg_mask)
        
        # ROI設定（画面上部40%無視）- 必要に応じて残す
        h, w = mask.shape
        roi_limit = int(h * 0.4)
        mask[0:roi_limit, :] = 0
        
        kernel = np.ones((5, 5), np.uint8)
        mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
        
        # Debug出力
        mask_bgr = cv2.cvtColor(mask, cv2.COLOR_GRAY2BGR)
        mask_writer.write(mask_bgr)
        
        contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        measured_pos = None
        max_area = 0
        for cnt in contours:
            area = cv2.contourArea(cnt)
            if area < 50: continue # 閾値を少し下げて感度向上
            
            perimeter = cv2.arcLength(cnt, True)
            if perimeter == 0: continue
            circularity = 4 * np.pi * area / (perimeter * perimeter)
            
            # 背景差分を入れたので形状フィルタは少し緩める（移動で崩れる場合があるため）
            if circularity > 0.3:
                if area > max_area:
                    max_area = area
                    M = cv2.moments(cnt)
                    if M["m00"] != 0:
                        cx = int(M["m10"] / M["m00"])
                        cy = int(M["m01"] / M["m00"])
                        measured_pos = np.array([cx, cy])

        # --- 3. 更新 (Update) ---
        if measured_pos is not None:
            dist = np.linalg.norm(particles[:, :2] - measured_pos, axis=1)
            likelihood = np.exp(-(dist**2) / (2 * measurement_noise**2))
            
            if np.sum(likelihood) == 0:
                weights = np.ones(num_particles) / num_particles
            else:
                weights = likelihood / np.sum(likelihood)
                
            cv2.circle(frame, (int(measured_pos[0]), int(measured_pos[1])), 10, (0, 0, 255), -1)
            cv2.putText(frame, "Measured", (int(measured_pos[0])+15, int(measured_pos[1])), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 1)

        else:
            pass

        # --- 4. 推定 (Estimation) ---
        estimate_x = np.sum(particles[:, 0] * weights)
        estimate_y = np.sum(particles[:, 1] * weights)
        estimate_pos = (int(estimate_x), int(estimate_y))
        
        # --- 5. リサンプリング (Resampling) ---
        indices = np.random.choice(num_particles, size=num_particles, p=weights)
        particles = particles[indices]
        weights = np.ones(num_particles) / num_particles

        # --- 可視化 ---
        for p in particles:
            cv2.circle(frame, (int(p[0]), int(p[1])), 2, (0, 255, 255), -1)
            
        cv2.drawMarker(frame, estimate_pos, (255, 0, 0), cv2.MARKER_CROSS, 20, 2)
        cv2.putText(frame, "Particle Est", (estimate_pos[0]+15, estimate_pos[1]+20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 1)
        
        trajectory.append(estimate_pos)
        if len(trajectory) > 50:
            trajectory.pop(0)
        for i in range(1, len(trajectory)):
            cv2.line(frame, trajectory[i-1], trajectory[i], (255, 0, 0), 2)

        writer.write(frame)

    cap.release()
    writer.release()
    mask_writer.release()
    print("Particle video generation completed.")

if __name__ == "__main__":
    main()
