# 開発ルール

詳細ルールは [RULES.md](RULES.md) を参照。

## ブランチ運用

- `main` ブランチへの直接コミットは禁止
- 作業は必ず feature ブランチを切って行う
- ブランチ名: `feature/[issue番号]_[概要]`（例: `feature/84_eslint-setup`）
- 作業完了後は PR を作成して `main` へマージする

## コミット規約

```
<emoji> <type>: <概要（日本語）>
```

type: `feat` / `fix` / `chore` / `refactor` / `docs` / `style`（詳細は RULES.md）
