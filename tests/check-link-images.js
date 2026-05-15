const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const script = fs.readFileSync(path.join(root, 'script.js'), 'utf8');
const styles = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');

if (!html.includes('styles.css?v=')) {
  throw new Error('Expected index.html to cache-bust styles.css');
}

if (!html.includes('script.js?v=')) {
  throw new Error('Expected index.html to cache-bust script.js');
}

if (!script.includes('function getFaviconUrl')) {
  throw new Error('Expected script.js to derive favicon image URLs for links');
}

if (!script.includes('class="link-visual"')) {
  throw new Error('Expected navigation cards to render a visual image area');
}

if (!styles.includes('.link-visual img')) {
  throw new Error('Expected styles.css to style link card images');
}
