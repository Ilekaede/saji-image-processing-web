# 開発ルール詳細

## ブランチ運用

- `main` ブランチへの直接コミットは禁止
- 作業は必ず feature ブランチを切って行う
- ブランチ名: `feature/[issue番号]_[概要]`（例: `feature/84_eslint-setup`）
- 作業完了後は PR を作成して `main` へマージする

## PR 規約

- PR 本文に必ず `closes #[issue番号]` を記載する（マージ時に issue が自動 close される）
- PR タイトルは 70 文字以内、概要は本文に書く
- PR 本文は `.github/PULL_REQUEST_TEMPLATE.md` のテンプレートに従う

## コミット規約

Conventional Commits に従う。prefix の前に gitmoji を付ける。

```
<emoji> <type>: <概要（日本語）>
```

### type・emoji 一覧

| emoji | type       | 用途                       |
| ----- | ---------- | -------------------------- |
| ✨    | `feat`     | 新機能の追加               |
| 🐛    | `fix`      | バグ修正                   |
| 🔧    | `chore`    | ビルド・設定・ツールの変更 |
| ♻️    | `refactor` | 動作を変えないコードの改善 |
| 📝    | `docs`     | ドキュメントのみの変更     |
| 🎨    | `style`    | フォーマットのみの変更     |

### 例

```
✨ feat: テンプレートマッチングの記事を追加
🐛 fix: フィルタ動作時に画面が揺れる問題を修正
🔧 chore: Prettierの導入とsrc/以下の一括フォーマット
♻️ refactor: メタデータの重複定義を解消
```

## Claude との作業ルール

- コードレビュー（`/code-review`）を実行したら、結果を報告する前に PR へのインライン投稿（`--comment`）を提案する
- 変数名はドメインの意味を優先する（実装の都合を名前に含めない。例: `safeId` より `articleId`）
- レビュー指摘はそのまま適用せず、コード・型・フレームワークの制約を確認して妥当性を検証してから修正する
- 機能的な正しさだけでなく DX（開発時の Network タブ・コンソールの状態）も評価軸に入れる

### Skill 設計ルール

- サブエージェントに**一部の処理だけ**委ねたい場合は fresh エージェントを使う。`fork` は会話コンテキスト全体（スキル指示を含む）を引き継ぐため、スキルのパイプライン全体を実行してしまう
- パイプラインのループ制御（継続・終了判断）は常に**親（スキルを実行している Claude）が持つ**

## 記事執筆ガイドライン

記事は Cloudflare R2（バケット: `b3semi-articles`）に Markdown ファイルとして管理している。
編集・執筆には `/edit-article <記事ID>` を使う。

### 対象読者・トーン

- 対象: 画像処理を学び始めた大学生・研究室の学生
- トーン: 丁寧だが堅すぎない「です/ます」調
- 理論より「実際に動かしたらこうなった」という実体験ベースの内容を優先する

### 記事の構成原則

- 理論説明は冒頭1〜2段落に留める（詳細な数式・アルゴリズム説明は不要）
- 各課題・トピックは「現象 → 原因 → 対処法」の構成で書く
- 各節は独立して読める（前の節を読まないと意味が取れない構成は避ける）
- コード例は Python + OpenCV で書く

### 記事インフラ

- 取得: `https://articles-worker.a-sakuramotyo.workers.dev/articles/method{ID}`
- 書き戻し: `wrangler r2 object put b3semi-articles/method{ID}.md --file <file> --remote`（`cloudflare/articles-worker` ディレクトリで実行）
- Write ツールで `/tmp/*.md` に保存すると markdownlint が自動実行される

## コードスタイル

- フォーマットは **Prettier** で統一（保存時に自動適用）
- **ESLint** の警告を残したままコミットしない
- `any` 型は使用禁止。型が明確な場合は具体的な型を、型が不明な場合は `unknown` を使う（`@typescript-eslint/no-explicit-any`）
- `console.log/warn/error` は本番コードに残さない（`no-console`）
- `npm run format` で一括フォーマット可能
- 型定義は `interface` ではなく `type` を使う
