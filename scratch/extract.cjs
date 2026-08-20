const fs = require('fs');

const path = "C:/Users/Muji/.gemini/antigravity/brain/a571022e-ccf3-4715-9414-8c33f473cb70/.system_generated/logs/transcript_full.jsonl";
const data = fs.readFileSync(path, 'utf8');

const lines = data.split('\n').filter(Boolean);
let lastUserContent = '';

for (let i = lines.length - 1; i >= 0; i--) {
  const line = JSON.parse(lines[i]);
  if (line.type === 'USER_INPUT') {
    lastUserContent = line.content;
    break;
  }
}

fs.writeFileSync('scratch/last_user_prompt.txt', lastUserContent);
