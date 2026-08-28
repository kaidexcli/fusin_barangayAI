const fs = require('fs');

['index.html', 'app/publish.js'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    // Match "Built by Benedict Fusin" followed by anything up to "no cloud"
    content = content.replace(/Built by Benedict Fusin[^<]*?100% local, no cloud/g, 'Built by Benedict Fusin');
    fs.writeFileSync(file, content, 'utf8');
});
