const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const navigationPath = path.join(root, 'navigation.html');
const contactPath = path.join(root, 'contact.html');

if (!fs.existsSync(navigationPath)) {
  throw new Error('Expected navigation.html to exist');
}

if (!fs.existsSync(contactPath)) {
  throw new Error('Expected contact.html to exist');
}

const navigation = fs.readFileSync(navigationPath, 'utf8');
const contact = fs.readFileSync(contactPath, 'utf8');

for (const [name, html] of Object.entries({ index, navigation, contact })) {
  if (!html.includes('class="site-header"')) {
    throw new Error(`Expected ${name} page to include shared site header`);
  }
  if (!html.includes('href="index.html"')) {
    throw new Error(`Expected ${name} page to link to index.html`);
  }
  if (!html.includes('href="navigation.html"')) {
    throw new Error(`Expected ${name} page to link to navigation.html`);
  }
}

if (!index.includes('href="contact.html"') || !index.includes('Work together')) {
  throw new Error('Expected Work together on index.html to open contact.html');
}

if (!index.includes('href="navigation.html"')) {
  throw new Error('Expected What I do on index.html to open navigation.html');
}

if (!navigation.includes('id="category-grid"') || navigation.includes('id="contact"')) {
  throw new Error('Expected navigation.html to own bookmark navigation only');
}

if (!contact.includes('github.com/Dragonetfly') || !contact.includes('2931708921@qq.com')) {
  throw new Error('Expected contact.html to show GitHub and email');
}
