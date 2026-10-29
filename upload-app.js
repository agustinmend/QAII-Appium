const fs = require('fs');
const path = require('path');

async function uploadApp() {
    const username = process.env.BROWSERSTACK_USERNAME;
    const accessKey = process.env.BROWSERSTACK_ACCESS_KEY;

    if (!username || !accessKey) {
        console.error('❌ Error: BROWSERSTACK_USERNAME o BROWSERSTACK_ACCESS_KEY no están definidos.');
        process.exit(1);
    }

    const authHeader = 'Basic ' + Buffer.from(`${username}:${accessKey}`).toString('base64');
    const apkPath = path.resolve(__dirname, 'GoogleClock.apk');

    if (!fs.existsSync(apkPath)) {
        console.error(`❌ Error: No se encontró el archivo ${apkPath}`);
        process.exit(1);
    }

    console.log(`🚀 Subiendo ${apkPath} a BrowserStack App Automate...`);

    const fileBuffer = fs.readFileSync(apkPath);
    const blob = new Blob([fileBuffer], { type: 'application/vnd.android.package-archive' });
    const formData = new FormData();
    formData.append('file', blob, 'GoogleClock.apk');
    formData.append('custom_id', 'GoogleClockApp');

    try {
        const response = await fetch('https://api-cloud.browserstack.com/app-automate/upload', {
            method: 'POST',
            headers: { 'Authorization': authHeader },
            body: formData
        });

        const data = await response.json();
        console.log('📬 Respuesta de BrowserStack:', JSON.stringify(data, null, 2));

        if (data.app_url) {
            console.log(`✅ Google Clock subido exitosamente con App ID: ${data.app_url}`);
            fs.writeFileSync(path.resolve(__dirname, '.bstack-app.json'), JSON.stringify(data, null, 2));
            console.log('💾 Guardado ID en .bstack-app.json');
            process.exit(0);
        } else {
            console.error('❌ Error al subir GoogleClock.apk a BrowserStack:', data);
            process.exit(1);
        }
    } catch (err) {
        console.error('❌ Error de conexión:', err.message);
        process.exit(1);
    }
}

uploadApp();
