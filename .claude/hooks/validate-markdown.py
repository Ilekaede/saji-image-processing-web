#!/usr/bin/env python3
"""
PostToolUse hook: Write ツールで /tmp/*.md を書いたとき markdownlint を実行する。
バリデーション失敗時は exit(2) で Claude にエラーを通知する。
"""
import json
import os
import subprocess
import sys

data = json.load(sys.stdin)
fp = data.get("tool_input", {}).get("file_path", "")

if not (fp.startswith("/tmp/") and fp.endswith(".md") and os.path.exists(fp)):
    sys.exit(0)

config = os.path.join(os.path.dirname(__file__), "..", ".markdownlint.json")
result = subprocess.run(
    ["markdownlint", "--config", config, fp],
    capture_output=True,
    text=True,
)

if result.returncode != 0:
    print(f"markdownlint: {fp} にバリデーションエラーがあります")
    print(result.stdout or result.stderr)
    sys.exit(2)
