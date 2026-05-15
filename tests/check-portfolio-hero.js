const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const styles = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');

const requiredHtml = [
  'class="site-header"',
  'class="logo-mark"',
  'href="index.html"',
  'href="navigation.html"',
  'class="portfolio-hero"',
  'class="hero-title"',
  'class="portrait-stage"',
  'class="floating-sticker sticker-brush"',
  'class="floating-sticker sticker-sun"',
  'Work together'
];

for (const token of requiredHtml) {
  if (!html.includes(token)) {
    throw new Error(`Expected index.html to include ${token}`);
  }
}

const requiredCss = [
  '.site-header',
  '.portfolio-hero',
  '.hero-title',
  '.portrait-frame',
  '.floating-sticker'
];

for (const token of requiredCss) {
  if (!styles.includes(token)) {
    throw new Error(`Expected styles.css to include ${token}`);
  }
}
