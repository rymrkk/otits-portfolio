import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const checks = [];
const test = (name, fn) => checks.push({ name, fn });
const read = (path) => readFileSync(path, "utf8");

test("static site files exist", () => {
  [
    "index.html",
    "404.html",
    "robots.txt",
    "sitemap.xml",
    "assets/css/style.css",
    "assets/js/main.js",
    "assets/resume/jonh-ryan-coranes-resume.pdf",
    "assets/img/profile.png",
    "assets/img/profile-960.jpg"
  ].forEach((path) => assert.equal(existsSync(path), true, `${path} should exist`));
});

test("homepage follows the single Stitch vertical timeline baseline", () => {
  const html = read("index.html");

  assert.match(html, /Jonh Ryan Coranes/);
  assert.match(html, /Available for remote SDR &amp; outbound roles/);
  assert.match(html, /Outbound Sales &amp; <span>Lead Generation<\/span> Professional/);
  assert.match(html, /Building productive prospect conversations through preparation, clear communication, and consistent follow-through\./);
  assert.match(html, /class="hero-meta-icon"/);
  assert.match(html, /class="hero-meta-text"/);
  assert.match(html, /View Resume/);
  assert.match(html, /Instagram/);
  assert.match(html, /Facebook/);
  assert.match(html, /instagram\.com\/jonhryawesome/);
  assert.match(html, /facebook\.com\/jonhrheyan\.coranes/);
  assert.match(html, /Focus on/);
  assert.match(html, /expand their sales pipelines/);
  assert.match(html, /Strategic Prospecting/);
  assert.match(html, /Career Timeline/);
  assert.match(html, /Mar 2024 - May 2026/);
  assert.match(html, /Easy Contact Inc\./);
  assert.match(html, /Research Analyst and Outbound Telemarketer/);
  assert.match(html, /Sept 2021 - Jan 2023/);
  assert.match(html, /Movate/);
  assert.match(html, /What I bring to a sales floor/);
  assert.match(html, /class="capability-card"/);
  assert.match(html, /class="capability-icon"/);
  assert.doesNotMatch(html, /<article class="capability-card"[^>]*><span>0[1-6]<\/span><h3>Prospecting<\/h3>/);
  assert.match(html, /Expertise &amp; Toolkit/);
  assert.match(html, /Certificates/);
  assert.match(html, /HubSpot Content Hub Software Certified/);
  assert.match(html, /HubSpot Academy/);
  assert.match(html, /class="certificate-card"/);
  assert.match(html, /certificate-media/);
  assert.match(html, /certificate-image/);
  assert.match(html, /certificate-info/);
  assert.match(html, /certificate-view-button/);
  assert.match(html, /assets\/img\/Certs\/download%20%281%29\.jpg/);
  assert.match(html, /data-certificate-dialog/);
  assert.match(html, /data-certificate-close/);
  assert.match(html, /Let's build your pipeline\./);
  assert.match(html, /class="timeline-line"/);
  assert.match(html, /class="timeline-visual"/);
  assert.match(html, /data-timeline-reveal/);
  assert.match(html, /assets\/img\/highlights\/4ab2c802-1ef7-4d66-bb03-0563a2a13c1e\.jpg/);
  assert.match(html, /assets\/img\/highlights\/a6e88e4e-4fe9-4ccf-be59-9f54d75703ee\.jpg/);
  assert.match(html, /assets\/img\/highlights\/b3e91310-ae95-4f5d-8a2e-31e9c8232bb5\.jpg/);
  assert.match(html, /assets\/img\/profile-960\.jpg/);
  assert.match(html, /assets\/img\/profile\.png/);
  assert.match(html, /class="profile-id-tag"/);
});

test("homepage preserves approved public-safe constraints", () => {
  const html = read("index.html");

  assert.doesNotMatch(html, /<form[\s>]/i);
  assert.doesNotMatch(html, /Calendly|scheduler|booking|database|CMS/i);
  assert.doesNotMatch(html, /Conversion Improvement|Team Quota Attainment|85%|92%|100%|Top Performer/i);
  assert.doesNotMatch(html, /references available|residential address|barangay|street/i);
  assert.doesNotMatch(html, /darkMode|theme toggle|tailwindcss/i);
  assert.match(html, /mailto:/);
  assert.match(html, /assets\/resume\/jonh-ryan-coranes-resume\.pdf/);
  assert.match(html, /application\/ld\+json/);
});

test("styles encode the Executive Precision light design system", () => {
  const css = read("assets/css/style.css");

  ["#001227", "#0F2742", "#167D8D", "#97EDFF", "#F8F9FB", "#191C1E", "#44474D", "#C4C6CE"].forEach((color) => {
    assert.match(css, new RegExp(color, "i"), `Missing ${color}`);
  });

  assert.match(css, /--container-max:\s*1100px/);
  assert.match(css, /--section-gap:\s*120px/);
  assert.match(css, /font-family:\s*Inter/);
  assert.match(css, /\.timeline-line/);
  assert.match(css, /\.timeline-card/);
  assert.match(css, /\.timeline-node/);
  assert.match(css, /\.timeline-visual/);
  assert.match(css, /--timeline-image-x/);
  assert.match(css, /data-timeline-reveal/);
  assert.match(css, /\.hero-social-button/);
  assert.match(css, /\.capability-card/);
  assert.match(css, /\.certificate-card/);
  assert.match(css, /grid-template-columns:\s*minmax\(320px, 460px\) minmax\(0, 1fr\)/);
  assert.match(css, /\.certificate-media/);
  assert.match(css, /height:\s*300px/);
  assert.match(css, /\.certificate-image/);
  assert.match(css, /object-fit:\s*contain/);
  assert.match(css, /\.certificate-info/);
  assert.doesNotMatch(css, /--cert-image/);
  assert.doesNotMatch(css, /\.certificate-image-card::before/);
  assert.match(css, /\.certificate-dialog/);
  assert.match(css, /\.certificates-section/);
  assert.match(css, /\.capability-icon/);
  assert.match(css, /@keyframes capability-float-in/);
  assert.match(css, /@keyframes capability-card-drift/);
  assert.match(css, /rotateX/);
  assert.match(css, /rotateY/);
  assert.match(css, /@property --card-float-y/);
  assert.match(css, /\.about-intro-panel/);
  assert.match(css, /about-intro-panel\.is-visible \.two-columns/);
  assert.match(css, /\.expertise-brand-grid/);
  assert.match(css, /@media \(max-width: 575\.98px\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /@keyframes meta-type/);
  assert.match(css, /meta-caret/);
  assert.doesNotMatch(css, /background-clip:\s*text/i);
  assert.doesNotMatch(css, /border-radius:\s*(4[0-9]|[5-9][0-9])px/i);
});

test("javascript is progressive enhancement only", () => {
  const js = read("assets/js/main.js");

  assert.match(js, /IntersectionObserver/);
  assert.match(js, /prefers-reduced-motion/);
  assert.match(js, /aria-current/);
  assert.match(js, /showModal/);
  assert.match(js, /data-certificate-open/);
  assert.match(js, /timelineObserver/);
  assert.match(js, /data-timeline-reveal/);
  assert.doesNotMatch(js, /fetch\(|XMLHttpRequest|localStorage|sessionStorage/);
});

let failed = 0;
for (const check of checks) {
  try {
    check.fn();
    console.log(`PASS ${check.name}`);
  } catch (error) {
    failed += 1;
    console.error(`FAIL ${check.name}`);
    console.error(error.message);
  }
}

if (failed > 0) process.exitCode = 1;


