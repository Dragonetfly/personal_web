const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const script = fs.readFileSync(path.join(root, 'script.js'), 'utf8');
const styles = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');

if (html.includes('quick-grid') || html.includes('featured-links')) {
  throw new Error('Expected featured entry section to be removed from index.html');
}

if (!html.includes('profile-intro') || !html.includes('signature')) {
  throw new Error('Expected profile intro and signature sections to remain');
}

if (!html.includes('Jiang')) {
  throw new Error('Expected profile name to be Jiang');
}

if (script.includes("label: 'Blog'")) {
  throw new Error('Expected Blog social link to be removed');
}

if (!script.includes("document.createElement('details')")) {
  throw new Error('Expected categories to render as collapsible details elements');
}

if (!script.includes("document.createElement('summary')")) {
  throw new Error('Expected each category to render a summary header');
}

if (!styles.includes('.category-card[open]')) {
  throw new Error('Expected styles for opened collapsible navigation categories');
}
