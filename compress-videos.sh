#!/bin/bash

# 動画圧縮スクリプト
# 使用方法: ./compress-videos.sh

set -e

echo "🎬 動画圧縮を開始します..."

# 圧縮前のサイズを確認
echo ""
echo "📊 圧縮前のサイズ:"
du -sh public/videos

# 圧縮済みディレクトリを作成
mkdir -p public/videos/compressed

# 各動画ファイルを圧縮
for video in public/videos/*.mp4; do
    if [ -f "$video" ]; then
        filename=$(basename "$video")
        output="public/videos/compressed/$filename"
        
        echo ""
        echo "🔄 圧縮中: $filename"
        
        # H.264コーデック、CRF 28（品質とサイズのバランス）
        # -crf: 0-51の範囲、値が大きいほど圧縮率が高い（品質は低下）
        # 28は良好な品質を保ちつつ、ファイルサイズを大幅に削減
        ffmpeg -i "$video" \
            -vcodec libx264 \
            -crf 28 \
            -preset medium \
            -acodec aac \
            -b:a 128k \
            -movflags +faststart \
            -y \
            "$output" 2>&1 | grep -E "frame=|size=|time=" | tail -1
        
        # サイズ比較
        original_size=$(du -h "$video" | cut -f1)
        compressed_size=$(du -h "$output" | cut -f1)
        echo "  元のサイズ: $original_size → 圧縮後: $compressed_size"
    fi
done

# webmファイルも圧縮
for video in public/videos/*.webm; do
    if [ -f "$video" ]; then
        filename=$(basename "$video")
        output="public/videos/compressed/$filename"
        
        echo ""
        echo "🔄 圧縮中: $filename"
        
        # VP9コーデック、CRF 32（webmの推奨値）
        ffmpeg -i "$video" \
            -c:v libvpx-vp9 \
            -crf 32 \
            -b:v 0 \
            -c:a libopus \
            -b:a 96k \
            -y \
            "$output" 2>&1 | grep -E "frame=|size=|time=" | tail -1
        
        # サイズ比較
        original_size=$(du -h "$video" | cut -f1)
        compressed_size=$(du -h "$output" | cut -f1)
        echo "  元のサイズ: $original_size → 圧縮後: $compressed_size"
    fi
done

echo ""
echo "📊 圧縮後のサイズ:"
du -sh public/videos/compressed

echo ""
echo "✅ 圧縮完了！"
echo ""
echo "次のステップ:"
echo "1. 圧縮された動画を確認: public/videos/compressed/"
echo "2. 問題なければ、元のファイルと置き換え:"
echo "   rm public/videos/*.mp4 public/videos/*.webm"
echo "   mv public/videos/compressed/* public/videos/"
echo "   rmdir public/videos/compressed"
