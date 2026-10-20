/* ملف البلقن (رفع تطبيق كلود، حد 200 ملف) يحمل three.js ملف vendor.zip واحد — نفكّه أول مرة جنبه.
   بالمستودع المجلد موجود أصلاً فما يسوي شي. */
const fs = require('fs'), path = require('path'), { spawnSync } = require('child_process');
module.exports = function ensureVendor() {
  const dir = __dirname, mark = path.join(dir, 'vendor/three/build/three.module.js'), zip = path.join(dir, 'vendor.tar.gz');
  if (fs.existsSync(mark) || !fs.existsSync(zip)) return;
  for (const [cmd, args] of [['tar', ['-xzf', zip, '-C', dir]], ['python3', ['-m', 'tarfile', '-e', zip, dir]], ['python', ['-m', 'tarfile', '-e', zip, dir]]]) {
    if (spawnSync(cmd, args, { stdio: 'ignore' }).status === 0 && fs.existsSync(mark)) return;
  }
  throw new Error('ما قدرت أفك motion/vendor.tar.gz — فكّه يدوياً بنفس المجلد');
};
