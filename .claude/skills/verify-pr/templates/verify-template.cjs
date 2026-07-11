/**
 * PR 検証用の使い捨てスクリプトの原型（#142 の PoC 由来）
 *
 * 使い方:
 *   1. このファイルを scratchpad にコピーし、「検証本体」セクションを PR に合わせて書き換える
 *   2. dev サーバ（port 3000）が起動している状態で実行する:
 *      NODE_PATH=<プロジェクトルート>/node_modules node <コピーしたスクリプト>.cjs
 *
 * 収集系（コンソールエラー・ネットワーク・スクショ）は書き換えずそのまま使う。
 */
const { chromium } = require("playwright");

const BASE_URL = "http://localhost:3000/saji-image-processing-web";
// スクショの保存先は実行時に書き換える（scratchpad 配下を指定する）
const SCREENSHOT_DIR = process.env.SCREENSHOT_DIR ?? ".";

/**
 * fullPage スクショの前に必ず呼ぶこと。
 * framer-motion のスクロールイン演出は viewport に入るまで要素が半透明のままなので、
 * 先にページ全体をスクロールしてアニメーションを発火させてからでないと
 * 「描画途中の半透明要素」がスクショに写り込む。
 */
async function scrollFullPage(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight / 2;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 150));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const results = [];
  const check = (name, ok, note = "") => {
    results.push({ name, ok, note });
    console.log(`${ok ? "✅" : "❌"} ${name}${note ? ` — ${note}` : ""}`);
  };

  // ---- 収集: コンソールエラー / ページエラー ----
  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(String(err)));

  // ---- 収集: ネットワーク（記事フェッチの回数・ステータスなど） ----
  // URL パターンは検証対象に合わせて書き換える
  const trackedResponses = [];
  page.on("response", (res) => {
    if (res.url().includes("articles-worker")) {
      trackedResponses.push({ url: res.url(), status: res.status() });
    }
  });

  // ================================================================
  // ---- 検証本体（ここを PR に合わせて書き換える） ----
  // ================================================================
  // PoC で踏んだ注意点:
  //   - カードのタイトルはクリック不可。遷移は Link(href) 内の「View More」ボタンが担う
  //   - 記事ページの URL は小文字（例: /methods/14）
  //   - SPA のクリック遷移では networkidle が記事フェッチ開始前に解決することがある。
  //     クリック前に waitForResponse を仕掛けてフェッチ完了を明示的に待つこと
  //   - セレクタで 2 回つまずいたら Playwright MCP で実画面を見てから書き直す

  // 例1: ページを開いて要素の存在を確認する
  await page.goto(`${BASE_URL}/methods`, { waitUntil: "networkidle" });
  const card = page.getByText("差分法", { exact: false }).first();
  check("Methods ページにカードが表示される", await card.isVisible());

  // 例2: クリックで遷移する
  // 対象カードのボタンは Link の href で特定する（カード一覧全体から
  // .last() などで拾うと別カードのボタンを踏みやすい）
  const articleFetched = page.waitForResponse(
    (res) =>
      res.url().includes("articles-worker") && res.url().includes("method14"),
  );
  const viewMore = page
    .locator('a[href$="/methods/14"]')
    .getByRole("button", { name: "View More" });
  await viewMore.scrollIntoViewIfNeeded();
  await viewMore.click();
  await page.waitForURL(`${BASE_URL}/methods/14`);
  check("View More クリックで記事ページに遷移する", true);

  // 例3: 記事本文が描画される（見出し・コードブロック・本文量）
  await articleFetched;
  await page.waitForFunction(() => document.body.innerText.length > 3000);
  const headings = await page
    .locator("article h1, article h2, article h3, h2, h3")
    .count();
  const codeBlocks = await page.locator("pre code").count();
  const bodyLength = (await page.locator("body").innerText()).length;
  check(
    "記事本文が描画される",
    headings > 0 && bodyLength > 1000,
    `見出し${headings}個 / コードブロック${codeBlocks}個 / 本文${bodyLength}字`,
  );

  // 例4: スクショ（AI が目視する用）
  await scrollFullPage(page);
  await page.screenshot({
    path: `${SCREENSHOT_DIR}/article-fullpage.png`,
    fullPage: true,
  });

  // ================================================================
  // ---- 集計（書き換え不要） ----
  // ================================================================
  const fetchCount = trackedResponses.length;
  check(
    "記事フェッチの回数・ステータス",
    fetchCount > 0 && trackedResponses.every((r) => r.status === 200),
    JSON.stringify(trackedResponses),
  );
  check(
    "コンソールエラーが 0 件",
    consoleErrors.length === 0,
    consoleErrors.slice(0, 5).join(" / "),
  );

  console.log("\n=== SUMMARY(JSON) ===");
  console.log(
    JSON.stringify({ results, trackedResponses, consoleErrors }, null, 2),
  );

  await browser.close();
  process.exit(results.every((r) => r.ok) ? 0 : 1);
})();
