import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const base = "http://127.0.0.1:8080";
const out = "/workspace/artifacts/deck";
await mkdir(out, { recursive: true });

const browser = await chromium.launch({ args: ["--no-sandbox", "--disable-dev-shm-usage"] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });

async function shot(name, path) {
  await page.goto(base + path, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${out}/${name}.png` });
}

await shot("home", "/");
await shot("cari", "/cari");
await shot("unit", "/unit/melati");
await shot("pemilik", "/pemilik");

await page.goto(base + "/unit/dago", { waitUntil: "networkidle" });
await page.fill('input[name="name"]', "Rina Hartati");
await page.fill('input[name="phone"]', "081234567890");
await page.fill('input[name="moveIn"]', "2026-12-01");
await page.fill('textarea[name="note"]', "Mau lihat kamar dulu hari Sabtu.");
await page.click('button[type="submit"]');
await page.waitForSelector("text=Pengajuan tercatat");
await page.screenshot({ path: `${out}/unit-sent.png` });

await page.goto(base + "/pemilik", { waitUntil: "networkidle" });
await page.waitForSelector("text=Rina Hartati");
await page.screenshot({ path: `${out}/pemilik-inquiry.png` });

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await mobile.goto(base + "/", { waitUntil: "networkidle" });
await mobile.waitForTimeout(300);
await mobile.screenshot({ path: `${out}/home-mobile.png` });
await mobile.goto(base + "/unit/bojong", { waitUntil: "networkidle" });
await mobile.waitForTimeout(300);
await mobile.screenshot({ path: `${out}/unit-mobile.png` });

await browser.close();
console.log("shots ok");
