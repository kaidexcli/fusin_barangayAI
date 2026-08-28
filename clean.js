const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/<button[^>]*onclick="openGuide\(\)"[^>]*>[\s\S]*?<\/button>/g, '');
html = html.replace(/<button[^>]*onclick="openSettings\(\)"[^>]*>[\s\S]*?<\/button>/g, '');

const removeBlock = (startRegex, endRegex) => {
    const matchStart = html.match(startRegex);
    if (!matchStart) return;
    const start = matchStart.index;
    const endMatch = html.substring(start).match(endRegex);
    if (!endMatch) return;
    const end = start + endMatch.index + endMatch[0].length;
    html = html.substring(0, start) + html.substring(end);
};

// 1. Remove Guide Panel
removeBlock(/<!-- CAMP GUIDEBOOK[\s\S]*?/, /<\/aside>/);

// 2. Remove Welcome Modal (Onboarding)
removeBlock(/<!-- WELCOME MODAL -->/, /<!-- ADD MODELS MODAL -->/);
// Oh wait, I should put back the comment for ADD MODELS MODAL
html = html.replace('<!-- ADD MODELS MODAL -->', '<!-- ADD MODELS MODAL -->'); // dummy

// Actually, let's just replace from WELCOME MODAL to ADD MODELS MODAL and inject ADD MODELS MODAL back
let welcomeStart = html.indexOf('<!-- WELCOME MODAL -->');
let addModelsStart = html.indexOf('<!-- ADD MODELS MODAL -->');
if (welcomeStart > -1 && addModelsStart > -1) {
    html = html.substring(0, welcomeStart) + html.substring(addModelsStart);
}

// 3. Remove Settings Modal
let settingsStart = html.indexOf('<!-- SETTINGS MODAL -->');
let vendorStart = html.indexOf('<!-- Third-party libraries');
if (settingsStart > -1 && vendorStart > -1) {
    html = html.substring(0, settingsStart) + html.substring(vendorStart);
}

// Remove scripts
html = html.replace(/<script src="app\/settings\.js"><\/script>\n?/g, '');
html = html.replace(/<script src="app\/publish\.js"><\/script>\n?/g, '');
html = html.replace(/<script src="app\/onboarding\.js"><\/script>\n?/g, '');
html = html.replace(/<div class="sidebar-overlay" id="settings-overlay" onclick="closeSettings\(\)"><\/div>\n?/g, '');

fs.writeFileSync('index.html', html, 'utf8');
