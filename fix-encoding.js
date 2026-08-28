const fs = require('fs');
['index.html', 'app/publish.js', 'app/init.js'].forEach(f => {
    let t = fs.readFileSync(f, 'utf8');
    t = t.split(String.fromCharCode(65533)).join('—');
    fs.writeFileSync(f, t, 'utf8');
});
