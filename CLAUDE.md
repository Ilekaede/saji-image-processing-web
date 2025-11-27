# 開発ルール・ガイドライン

このドキュメントは、本プロジェクトの開発ワークフロー、コーディング規約、ベストプラクティスをまとめたものです。


# 必須項目
- やりとりはすべて日本語で行ってください。

## 目次

- [開発ワークフロー](#開発ワークフロー)
- [ブランチ戦略](#ブランチ戦略)
- [コミットメッセージ規約](#コミットメッセージ規約)
- [Issue対応フロー](#issue対応フロー)
- [技術スタック](#技術スタック)
- [コーディング規約](#コーディング規約)
- [デプロイメント](#デプロイメント)

---

## 開発ワークフロー

### 基本フロー

1. **Planning（計画）**
   - Issue要件の確認
   - 技術的な調査・分析
   - 実装計画の作成（`implementation_plan.md`）
   - ユーザーレビュー・承認

2. **Implementation（実装）**
   - 新しいブランチの作成
   - コードの実装
   - ローカルでのビルド確認
   - 実装後にコードのレビューを必ず実施

3. **Testing（テスト）**
   - 機能テストの実行
   - ブラウザでの動作確認
   - スクリーンショット・録画の取得

4. **Documentation（ドキュメント化）**
   - Walkthroughの作成
   - 必要に応じて技術ドキュメントを`docs/`に保存

5. **Deployment（デプロイ）**
   - コミット・プッシュ
   - Pull Requestの作成
   - レビュー・マージ

---

## ブランチ戦略

### ブランチ命名規則

```
feature/<issue-number>-<short-description>
```

**例:**
- `feature/18-content-search`
- `feature/33-video-player-ux`
- `feature/48-fix-404-reload`

### ブランチ作成

- 作業用のブランチを作成し、その中で実装を行います。実装の始まりには必ずmainブランチから作業ブランチを切ってください。

```bash
# mainブランチから最新を取得
git checkout main
git pull

# 新しいブランチを作成
git checkout -b feature/<issue-number>-<description>
```

---

## コミットメッセージ規約

### フォーマット

```
<type>: <subject> (Issue #<number>)

<body>
```

### Type一覧

| Type | 説明 | 例 |
|------|------|-----|
| `feat` | 新機能の追加 | `feat: implement content search functionality` |
| `fix` | バグ修正 | `fix: add basename to Router for GitHub Pages` |
| `docs` | ドキュメントの変更 | `docs: add walkthrough for issue #48` |
| `style` | コードフォーマット | `style: format code with prettier` |
| `refactor` | リファクタリング | `refactor: extract video player logic` |
| `test` | テストの追加・修正 | `test: add unit tests for search` |
| `chore` | ビルド・設定の変更 | `chore: update dependencies` |

### コミットメッセージ例

```bash
git commit -m "ref #11 fix: 画像の変換処理が正しく行われない問題を修正"
```

- refの後ろの番号はissues番号です
- コミットメッセージの先頭には必ず`fix`、`feat`、`docs`、`style`、`refactor`、`test`、`chore`のいずれかを指定してください。

---

## Issue対応フロー

### 1. Issue確認

```markdown
# Issue #XX: タイトル

## 背景
- 問題の説明

## 要件
- 実装すべき機能

## その他
- 補足情報
```

### 2. 実装計画作成

`implementation_plan.md`に以下を記載:

- **問題の概要**: Issue要件のまとめ
- **現状分析**: 既存コードの確認
- **実装方針**: 技術的なアプローチ
- **変更ファイル**: 修正・追加するファイルのリスト
- **検証計画**: テスト方法

### 3. タスク管理

`task.md`でタスクをチェックリスト形式で管理:

```markdown
## Planning
- [x] Issue要件の確認
- [x] 実装計画の作成

## Implementation
- [/] 新しいブランチの作成
- [ ] コードの実装

## Testing
- [ ] ローカルテスト
- [ ] ブラウザテスト
```

### 4. Walkthrough作成

実装完了後、`walkthrough.md`に以下を記載:

- **実装内容**: 何を実装したか
- **変更ファイル**: 修正したファイルのリスト
- **テスト結果**: スクリーンショット付き
- **技術的な補足**: 実装の詳細

必要に応じて`docs/`ディレクトリに保存:

```bash
cp walkthrough.md docs/issue-XX-description.md
```

---

## 技術スタック

### フロントエンド

- **Framework**: React 18
- **Router**: React Router v6
- **UI Library**: Chakra UI
- **Language**: TypeScript
- **Build Tool**: Create React App

### デプロイメント

- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions
- **Base URL**: `/saji-image-processing-web/`

### 開発ツール

- **Package Manager**: npm
- **Version Control**: Git
- **Code Editor**: VS Code（推奨）

---

## コーディング規約

### TypeScript

```tsx
// ✅ Good: 型定義を明示
interface MethodMetadata {
  id: number;
  title: string;
  overview: string;
  tags: string[];
  image?: string;
  searchableContent?: string;
}

// ✅ Good: 関数の引数・戻り値に型を指定
const handleClick = (event: React.MouseEvent): void => {
  // ...
};
```

### React

```tsx
// ✅ Good: 関数コンポーネントを使用
const MyComponent: React.FC = () => {
  const [state, setState] = useState<string>("");
  
  return <div>{state}</div>;
};

// ✅ Good: useEffectの依存配列を正しく指定
useEffect(() => {
  // ...
}, [dependency]);
```

### ファイル構成

```
src/
├── components/       # 再利用可能なコンポーネント
├── routes/          # ページコンポーネント
├── content/         # Methodコンテンツ
├── types/           # 型定義
├── utils/           # ユーティリティ関数
└── App.tsx          # ルートコンポーネント
```

### 命名規則

| 種類 | 規則 | 例 |
|------|------|-----|
| コンポーネント | PascalCase | `MethodDetail.tsx` |
| 関数・変数 | camelCase | `handleClick`, `isPlaying` |
| 定数 | UPPER_SNAKE_CASE | `MAX_ITEMS` |
| 型・インターフェース | PascalCase | `MethodMetadata` |

---

## デプロイメント

### GitHub Pages

#### 自動デプロイ

GitHub Actionsが自動的にデプロイを実行:

1. `main`ブランチにプッシュ
2. `.github/workflows/deploy.yml`が実行
3. ビルド → デプロイ

#### 手動デプロイ

```bash
# ビルド
npm run build

# デプロイ（GitHub Actionsを使用する場合は不要）
# gh-pagesブランチにプッシュ
```

### 環境変数

`package.json`:

```json
{
  "homepage": "https://ilekaede.github.io/saji-image-processing-web"
}
```

`App.tsx`:


---

## ベストプラクティス

### 1. 動画・画像の最適化

```bash
# 動画圧縮
ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -preset medium output.mp4

# 画像最適化
# WebPフォーマットの使用を推奨
```

### 2. 

### 3. 状態管理

```tsx
// ✅ Good: 適切な状態管理
const [isPlaying, setIsPlaying] = useState(false);
const [isHovering, setIsHovering] = useState(false);

// イベントハンドラで状態を更新
const handlePlay = () => setIsPlaying(true);
```

### 4. アクセシビリティ

```tsx
// ✅ Good: セマンティックHTML
<Box as="video" />
<Text as="h1">タイトル</Text>

// ✅ Good: alt属性
<Image src={image} alt="説明" />
```


## 参考リンク

- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Chakra UI Documentation](https://chakra-ui.com/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## 更新履歴

| 日付 | 変更内容 |
|------|---------|
| 2025-11-25 | 初版作成 |
