import cv2
import numpy as np
import os

def main():
    # Input and output paths
    input_path = "../../public/videos/ball_cutted.mp4"
    template_path = "../../public/videos/method11_template.png"
    output_path = "../../public/videos/method11_1.mp4"

    # Resolve absolute paths
    input_path = os.path.abspath(os.path.join(os.path.dirname(__file__), input_path))
    template_path = os.path.abspath(os.path.join(os.path.dirname(__file__), template_path))
    output_path = os.path.abspath(os.path.join(os.path.dirname(__file__), output_path))

    print(f"Input video: {input_path}")
    print(f"Template image: {template_path}")
    print(f"Output video: {output_path}")

    cap = cv2.VideoCapture(input_path)
    if not cap.isOpened():
        print("Error: Could not open input video.")
        return

    # Load template
    template = cv2.imread(template_path, 0) # Read as grayscale
    if template is None:
        print(f"Error: Could not load template image from {template_path}")
        return
    
    h, w = template.shape
    print(f"Template size: {w}x{h}")

    # Template scaling
    scale_factor = 4.0
    if scale_factor != 1.0:
        h, w = template.shape
        new_w, new_h = int(w * scale_factor), int(h * scale_factor)
        template = cv2.resize(template, (new_w, new_h))
        print(f"Scaled template size: {new_w}x{new_h} (Factor: {scale_factor})")
        h, w = template.shape

    # Get video properties
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)

    # Define codec and create VideoWriter for MP4 (H.264)
    # macOS often supports 'avc1' or 'mp4v' better than 'H264' directly in OpenCV sometimes
    fourcc = cv2.VideoWriter_fourcc(*'avc1') 
    out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

    if not out.isOpened():
        print("Error: Could not create output video writer with avc1. Trying mp4v...")
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))
        if not out.isOpened():
             print("Error: Could not create output video writer.")
             return

    # Tracking parameters
    score_threshold = 0.4
    update_score_threshold = 0.95
    
    frame_count = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        
        # Match Template
        res = cv2.matchTemplate(gray, template, cv2.TM_CCOEFF_NORMED)
        min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)
        
        if max_val >= score_threshold:
            top_left = max_loc
            bottom_right = (top_left[0] + w, top_left[1] + h)
            
            # Draw bounding box
            cv2.rectangle(frame, top_left, bottom_right, (0, 0, 255), 2)
            
            # Display score
            cv2.putText(frame, f"Score: {max_val:.2f}", (top_left[0], top_left[1] - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
            
                # Dynamic Template Update
            if max_val >= update_score_threshold:
                # Extract new template
                new_template = gray[top_left[1]:bottom_right[1], top_left[0]:bottom_right[0]]
                if new_template.shape == template.shape:
                        template = new_template
                        # Visual indicator for update
                        cv2.circle(frame, (top_left[0] + w//2, top_left[1] + h//2), 3, (0, 255, 0), -1)

        else:
                cv2.putText(frame, "Lost", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

        out.write(frame)
        frame_count += 1

    cap.release()
    out.release()
    print("Processing complete.")

if __name__ == "__main__":
    main()
