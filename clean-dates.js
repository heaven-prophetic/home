const fs = require('fs');
const path = require('path');

const folders = ['./data/events', './data/sermons'];

folders.forEach((directory) => {
  if (!fs.existsSync(directory)) {
    console.warn(`⚠️ Folder not found: ${directory}`);
    return;
  }

  fs.readdirSync(directory).forEach((file) => {
    if (file.endsWith('.md')) {
      const filePath = path.join(directory, file);
      const content = fs.readFileSync(filePath, 'utf-8');

      // Match and replace full datetime with just YYYY-MM-DD
      const updated = content.replace(
        /^date:\s*["']?(\d{4}-\d{2}-\d{2})T[\d:\-+.Z]+["']?/m,
        'date: $1'
      );

      fs.writeFileSync(filePath, updated);
      console.log(`✅ Cleaned date in: ${filePath}`);
    }
  });
});
