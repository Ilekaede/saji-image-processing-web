# Issue #48: ページリロード時の404エラー対応 実装完了

GitHub Issue: https://github.com/Ilekaede/saji-image-processing-web/issues/48

## 問題の概要

**背景:**
- GitHub Actions移行後、ページのリロード時に404が発生
- 戻ることができなくなる

**要件:**
- リロード時は現在のページを再表示する

---

## 原因の詳細説明

### なぜ404エラーが発生するのか？

#### 1. SPAとサーバーサイドルーティングの違い

**通常のWebサイト（マルチページアプリケーション）:**
```
ユーザーが /about.html にアクセス
→ サーバーに about.html ファイルが存在
→ サーバーが about.html を返す
→ ブラウザが表示
```

**SPA（シングルページアプリケーション）:**
```
ユーザーが /about にアクセス
→ サーバーに about.html ファイルは存在しない
→ サーバーが 404 エラーを返す
→ エラーページが表示される
```

#### 2. React Routerの動作原理

React Routerは**クライアントサイドルーティング**を使用します:

**初回アクセス時:**
```
1. ブラウザ → サーバー: GET /
2. サーバー → ブラウザ: index.html を返す
3. React が起動
4. React Router が URL を見て適切なコンポーネントを表示
```

**アプリ内でのナビゲーション:**
```
1. ユーザーがリンクをクリック
2. React Router が URL を /Methods に変更（サーバーにリクエストしない）
3. React Router が Methods コンポーネントを表示
```

**リロード時（問題発生）:**
```
1. ブラウザ → サーバー: GET /Methods
2. サーバー: Methods.html が存在しない
3. サーバー → ブラウザ: 404 エラー
```

#### 3. GitHub Pagesの制約

GitHub Pagesは**静的ホスティング**サービスです:

- サーバーサイドのルーティング設定ができない
- `.htaccess`（Apache）や`nginx.conf`（Nginx）のような設定ファイルが使えない
- リクエストされたパスに対応するファイルが存在しない場合、404を返す

**他のホスティングサービスでの解決方法（参考）:**

| サービス | 設定方法 |
|---------|---------|
| **Netlify** | `_redirects` ファイル: `/*    /index.html   200` |
| **Vercel** | `vercel.json`: `{"rewrites": [{"source": "/(.*)", "destination": "/index.html"}]}` |
| **Apache** | `.htaccess`: `RewriteRule . /index.html [L]` |

---

## 解決方法

### 実装した対応

GitHub Pagesの制約内で動作する、2段階のリダイレクト方式を実装しました。

#### ステップ1: `public/404.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <script>
      // 現在のURLをsessionStorageに保存
      sessionStorage.redirect = location.href;
    </script>
    <!-- ルートURLにリダイレクト -->
    <meta http-equiv="refresh" content="0;URL='/saji-image-processing-web/'">
  </head>
  <body>
  </body>
</html>
```

**動作:**
1. 404エラーが発生すると、GitHub Pagesが`404.html`を表示
2. 現在のURL（例: `/saji-image-processing-web/Methods`）を`sessionStorage`に保存
3. ルートURL（`/saji-image-processing-web/`）にリダイレクト

#### ステップ2: `public/index.html`のリダイレクトスクリプト

```javascript
// sessionStorageから元のURLを取得
var redirect = sessionStorage.redirect;
delete sessionStorage.redirect;
if (redirect && redirect !== location.href) {
  // URLを元に戻す
  history.replaceState(null, null, redirect);
}
```

**動作:**
1. `index.html`が読み込まれる
2. `sessionStorage`から元のURLを取得
3. `history.replaceState`でURLを元に戻す
4. React Routerが正しいページを表示

#### ステップ3: React Routerの設定

```tsx
<Router basename={process.env.PUBLIC_URL}>
  {/* ルート定義 */}
</Router>
```

**重要なポイント:**
- `basename`プロパティで`/saji-image-processing-web/`を設定
- これにより、React Routerがベースパスを認識
- ルート定義は`/`、`/Methods`のように相対パスで記述

---

## 実装した変更

### 修正ファイル

**[App.tsx](file:///Users/a_sakura/work-space/b3semi_web/src/App.tsx#L16)**
- `BrowserRouter`に`basename={process.env.PUBLIC_URL}`を追加

```diff
- <Router>
+ <Router basename={process.env.PUBLIC_URL}>
```

### 既存ファイル（確認済み）

**[404.html](file:///Users/a_sakura/work-space/b3semi_web/public/404.html)**
- 404エラー時のリダイレクト処理
- sessionStorageへのURL保存

**[index.html](file:///Users/a_sakura/work-space/b3semi_web/public/index.html#L26-L51)**
- sessionStorageからのURL復元
- React Router起動前の処理

---

## 技術的な補足

### sessionStorageを使う理由

**sessionStorage vs localStorage:**

| 特性 | sessionStorage | localStorage |
|-----|---------------|-------------|
| 保存期間 | タブを閉じると削除 | 明示的に削除するまで残る |
| スコープ | 同じタブ内のみ | 同じドメインの全タブ |
| 用途 | 一時的なデータ | 永続的なデータ |

今回のユースケースでは、リダイレクトは一時的な処理なので`sessionStorage`が最適です。

### history.replaceStateを使う理由

**replaceState vs pushState:**

| メソッド | 動作 | 履歴 |
|---------|-----|-----|
| `replaceState` | 現在の履歴エントリを置き換え | 戻るボタンで戻れない |
| `pushState` | 新しい履歴エントリを追加 | 戻るボタンで戻れる |

リダイレクトを履歴に残さないため、`replaceState`を使用します。

---

## この仕組みの利点と欠点

### 利点

✅ GitHub Pagesの制約内で動作  
✅ 追加のサーバー設定不要  
✅ ユーザーエクスペリエンスを損なわない  
✅ 実装がシンプル

### 欠点

⚠️ 一瞬リダイレクトが発生する（通常は気づかないレベル）  
⚠️ SEOに若干の影響がある可能性（ただし、SPAなので元々SEOは課題）  
⚠️ JavaScriptが無効だと動作しない

---

## まとめ

**問題の本質:**
- SPAはクライアントサイドルーティングを使用
- サーバーは`/Methods`のようなパスに対応するファイルを持っていない
- GitHub Pagesは静的ホスティングで、サーバーサイドのリダイレクト設定ができない

**解決方法:**
1. `404.html`で現在のURLを保存してルートにリダイレクト
2. `index.html`で保存したURLを復元
3. React Routerに`basename`を設定してベースパスを認識
4. React Routerが正しいページを表示

**結果:**
- ページリロード時も正しいページが表示される
- 直接URLアクセスも正常に動作
- ブラウザの戻る/進むボタンも正常に動作

---

## 参考リンク

- [Single Page Apps for GitHub Pages](https://github.com/rafgraph/spa-github-pages)
- [React Router - BrowserRouter](https://reactrouter.com/en/main/router-components/browser-router)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

**ブランチ:** `feature/48-fix-404-reload`  
**Pull Request:** https://github.com/Ilekaede/saji-image-processing-web/pull/new/feature/48-fix-404-reload

Issue #48の要件を満たし、原因と解決方法を詳しく説明しました。
