const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const script = fs.readFileSync(path.join(root, 'script.js'), 'utf8');
const styles = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');

if (html.includes('href="#my-work"')) {
  throw new Error('Expected top navigation to remove My work');
}

if (!html.includes('href="#contact"')) {
  throw new Error('Expected Work together to jump to the contact section');
}

if (!html.includes('id="contact"')) {
  throw new Error('Expected a contact section for Work together');
}

if (script.includes('GitHub') || script.includes('social:')) {
  throw new Error('Expected GitHub and Email social rendering data to be removed');
}

if (!html.includes('2931708921@qq.com')) {
  throw new Error('Expected contact section to display the email address');
}

if (styles.includes('float-sticker') || styles.includes('animation: float')) {
  throw new Error('Expected sticker shaking/floating animation to be removed');
}

if (!styles.includes('.navigation-area.compact')) {
  throw new Error('Expected compact navigation styling');
}
