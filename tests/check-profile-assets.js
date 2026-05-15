const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const contact = fs.readFileSync(path.join(root, 'contact.html'), 'utf8');
const avatarPath = path.join(root, 'assets', 'avatar.jpg');

if (!fs.existsSync(avatarPath)) {
  throw new Error('Expected assets/avatar.jpg to exist');
}

if (!html.includes('src="assets/avatar.jpg"')) {
  throw new Error('Expected index.html to render assets/avatar.jpg as the avatar image');
}

if (!contact.includes('mailto:2931708921@qq.com')) {
  throw new Error('Expected contact.html to use the requested email address');
}
