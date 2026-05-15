const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const pages = ['index.html', 'navigation.html', 'contact.html'].map((file) => [
  file,
  fs.readFileSync(path.join(root, file), 'utf8')
]);
const script = fs.readFileSync(path.join(root, 'script.js'), 'utf8');
const contact = fs.readFileSync(path.join(root, 'contact.html'), 'utf8');

for (const [file, html] of pages) {
  const topNav = html.match(/<nav class="top-nav"[\s\S]*?<\/nav>/)?.[0] || '';
  if (topNav.includes('Work together')) {
    throw new Error(`Expected ${file} top nav to omit Work together`);
  }
  if (!html.includes('href="index.html"') || !html.includes('href="navigation.html"')) {
    throw new Error(`Expected ${file} top nav to keep Home and What I do`);
  }
}

if (!contact.includes('contact-orb github-orb') || !contact.includes('contact-orb email-orb')) {
  throw new Error('Expected contact page to use enhanced contact icons');
}

const linkCount = (script.match(/title: '/g) || []).length;
if (linkCount < 30) {
  throw new Error(`Expected at least 30 navigation links, found ${linkCount}`);
}

if (!script.includes('https://www.google.com/s2/favicons')) {
  throw new Error('Expected all navigation cards to use favicon icons');
}
