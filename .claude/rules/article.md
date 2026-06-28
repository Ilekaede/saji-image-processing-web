# 記事執筆ガイドライン

記事は Cloudflare R2（バケット: `b3semi-articles`）に Markdown ファイルとして管理している。
編集・執筆には `/edit-article <記事ID>` を使う。

## 対象読者・トーン

- 対象: 画像処理を学び始めた大学生・研究室の学生
- トーン: 丁寧だが堅すぎない「です/ます」調
- 理論より「実際に動かしたらこうなった」という実体験ベースの内容を優先する

## 記事の構成原則

- 理論説明は冒頭1〜2段落に留める（詳細な数式・アルゴリズム説明は不要）
- 各課題・トピックは「現象 → 原因 → 対処法」の構成で書く
- 各節は独立して読める（前の節を読まないと意味が取れない構成は避ける）
- コード例は Python + OpenCV で書く

## 記事インフラ

- 取得: `https://articles-worker.a-sakuramotyo.workers.dev/articles/method{ID}`
- 書き戻し: `wrangler r2 object put b3semi-articles/method{ID}.md --file <file> --remote`（`cloudflare/articles-worker` ディレクトリで実行）
- Write ツールで `/tmp/*.md` に保存すると markdownlint が自動実行される
