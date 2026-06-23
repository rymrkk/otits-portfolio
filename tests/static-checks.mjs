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
  assert.match(html, /Identity &amp; Approach/);
  assert.match(html, /Professional Progression/);
  assert.match(html, /Core Sales Capabilities/);
  assert.match(html, /The Conversion Methodology/);
  assert.match(html, /Leadership Advantage/);
  assert.match(html, /Expertise &amp; Toolkit/);
  assert.match(html, /Let's build your pipeline\./);
  assert.match(html, /class="timeline-line"/);
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


