#!/bin/bash

# 圧縮された動画で元のファイルを置き換えるスクリプト

set -e

echo "🔄 動画ファイルを置き換えます..."

# 元のファイルを削除
echo "📁 元のファイルを削除中..."
rm -f public/videos/*.mp4 public/videos/*.webm

# 圧縮されたファイルを移動
echo "📦 圧縮されたファイルを移動中..."
mv public/videos/compressed/* public/videos/

# 空のディレクトリを削除
rmdir public/videos/compressed

echo "✅ 完了！"
echo ""
echo "📊 現在のサイズ:"
du -sh public/videos

echo ""
echo "次のステップ:"
echo "1. git status で変更を確認"
echo "2. git add public/videos/"
echo "3. git commit -m 'chore: compress videos for GitHub Pages'"
