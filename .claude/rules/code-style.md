---
paths: src/**/*.{ts,tsx}
---

# コードスタイル

- フォーマットは **Prettier** で統一（保存時に自動適用）
- **ESLint** の警告を残したままコミットしない
- `any` 型は使用禁止。型が明確な場合は具体的な型を、型が不明な場合は `unknown` を使う（`@typescript-eslint/no-explicit-any`）
- `console.log/warn/error` は本番コードに残さない（`no-console`）
- `npm run format` で一括フォーマット可能
- 型定義は `interface` ではなく `type` を使う
