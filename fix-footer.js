const fs = require('fs');
let content = fs.readFileSync('app/publish.js', 'utf8');

// I'll just use a strict regex to replace the entire welcomeBriefHTML function until the line before renderPublishedCredit
content = content.replace(/function welcomeBriefHTML\(\) \{[\s\S]*?(?=function renderPublishedCredit)/, 'function welcomeBriefHTML() { return "Built by Benedict Fusin"; }\n\n');

fs.writeFileSync('app/publish.js', content, 'utf8');
