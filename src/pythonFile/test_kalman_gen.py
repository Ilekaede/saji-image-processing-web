import os
import cv2
import pytest
import subprocess

# パス設定
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(os.path.dirname(BASE_DIR))
INPUT_VIDEO = os.path.join(PROJECT_ROOT, "public", "videos", "ball_cutted.mp4")
OUTPUT_VIDEO = os.path.join(PROJECT_ROOT, "public", "videos", "kalman_result.mp4")
SCRIPT_PATH = os.path.join(BASE_DIR, "kalman_video_gen.py")

def test_input_video_exists():
    """入力動画が存在することを確認"""
    assert os.path.exists(INPUT_VIDEO), f"Input video not found at {INPUT_VIDEO}"

def test_script_execution():
    """スクリプトを実行し、正常終了することを確認"""
    # スクリプトを実行 (プロジェクトルートから実行する想定)
    result = subprocess.run(["python3", SCRIPT_PATH], cwd=PROJECT_ROOT, capture_output=True, text=True)
    
    if result.returncode != 0:
        print(f"Script Stderr: {result.stderr}")
    
    assert result.returncode == 0, "Script execution failed"

def test_output_video_generated():
    """出力動画が生成され、再生可能であることを確認"""
    assert os.path.exists(OUTPUT_VIDEO), "Output video was not generated"
    
    cap = cv2.VideoCapture(OUTPUT_VIDEO)
    assert cap.isOpened(), "Could not open generated video"
    
    ret, frame = cap.read()
    assert ret, "Could not read first frame of generated video"
    cap.release()
