# 開発ルール

## ブランチ運用

- `main` ブランチへの直接コミットは禁止
- 作業は必ず feature ブランチを切って行う
- ブランチ名: `feature/[issue番号]_[概要]`（例: `feature/84_eslint-setup`）
- 作業完了後は PR を作成して `main` へマージする

## コミット規約

Conventional Commits に従う。prefix の前に gitmoji を付ける。

```
<emoji> <type>: <概要（日本語）>
```

### type・emoji 一覧

| emoji | type | 用途 |
|-------|------|------|
| ✨ | `feat` | 新機能の追加 |
| 🐛 | `fix` | バグ修正 |
| 🔧 | `chore` | ビルド・設定・ツールの変更 |
| ♻️ | `refactor` | 動作を変えないコードの改善 |
| 📝 | `docs` | ドキュメントのみの変更 |
| 🎨 | `style` | フォーマットのみの変更 |

### 例

```
✨ feat: テンプレートマッチングの記事を追加
🐛 fix: フィルタ動作時に画面が揺れる問題を修正
🔧 chore: Prettierの導入とsrc/以下の一括フォーマット
♻️ refactor: メタデータの重複定義を解消
```

## コードスタイル

- フォーマットは **Prettier** で統一（保存時に自動適用）
- **ESLint** の警告を残したままコミットしない
- `any` 型は使用禁止。型が明確な場合は具体的な型を、型が不明な場合は `unknown` を使う（`@typescript-eslint/no-explicit-any`）
- `console.log/warn/error` は本番コードに残さない（`no-console`）
- `npm run format` で一括フォーマット可能
- 型定義は `interface` ではなく `type` を使う
