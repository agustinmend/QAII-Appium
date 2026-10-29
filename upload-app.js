const fs = require('fs');
const path = require('path');

async function uploadApp() {
    const username = process.env.BROWSERSTACK_USERNAME;
    const accessKey = process.env.BROWSERSTACK_ACCESS_KEY;

    if (!username || !accessKey) {
        console.error('❌ Error: BROWSERSTACK_USERNAME o BROWSERSTACK_ACCESS_KEY no están definidos.');
        process.exit(1);
    }

    const apkPath = path.resolve(__dirname, 'GoogleClock.apk');
    if (!fs.existsSync(apkPath)) {
        console.error(`❌ Error: No se encontró el archivo APK en ${apkPath}`);
        process.exit(1);
    }

    console.log(`📦 Preparando subida de: ${apkPath} (${(fs.statSync(apkPath).size / 1024 / 1024).toFixed(2)} MB)...`);

    const apkBuffer = fs.readFileSync(apkPath);
    const blob = new Blob([apkBuffer], { type: 'application/vnd.android.package-archive' });
    const formData = new FormData();
    formData.append('file', blob, 'GoogleClock.apk');
    formData.append('custom_id', 'GoogleClockApp');

    const authHeader = 'Basic ' + Buffer.from(`${username}:${accessKey}`).toString('base64');

    try {
        console.log('🚀 Subiendo app a BrowserStack App Automate API...');
        const response = await fetch('https://api-cloud.browserstack.com/app-automate/upload', {
            method: 'POST',
            headers: {
                'Authorization': authHeader
            },
            body: formData
        });

        const data = await response.json();
        console.log('📬 Respuesta de BrowserStack:', JSON.stringify(data, null, 2));

        if (data.app_url) {
            console.log(`✅ App subida exitosamente con ID: ${data.app_url}`);
            fs.writeFileSync(path.resolve(__dirname, '.bstack-app.json'), JSON.stringify(data, null, 2));
            console.log('💾 Guardado ID en .bstack-app.json');
        } else {
            console.error('❌ Error en la subida a BrowserStack:', data);
            process.exit(1);
        }
    } catch (err) {
        console.error('❌ Error de conexión al subir la app:', err.message);
        process.exit(1);
    }
}

uploadApp();
