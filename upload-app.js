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

    // Función auxiliar para subir por URL oficial de BrowserStack (fallback garantizado)
    async function uploadSampleApp() {
        console.log('🔄 Utilizando app base oficial de BrowserStack para inicializar el dispositivo...');
        const formDataUrl = new FormData();
        formDataUrl.append('url', 'https://www.browserstack.com/app-automate/sample-apps/android/WikipediaSample.apk');
        formDataUrl.append('custom_id', 'BaseAppAuto');

        const res = await fetch('https://api-cloud.browserstack.com/app-automate/upload', {
            method: 'POST',
            headers: { 'Authorization': authHeader },
            body: formDataUrl
        });

        const data = await res.json();
        console.log('📬 Respuesta de BrowserStack (App Base):', JSON.stringify(data, null, 2));

        if (data.app_url) {
            fs.writeFileSync(path.resolve(__dirname, '.bstack-app.json'), JSON.stringify(data, null, 2));
            console.log(`✅ Sesión inicializada con App ID: ${data.app_url}`);
            process.exit(0);
        } else {
            console.error('❌ Error fatal al inicializar app en BrowserStack:', data);
            process.exit(1);
        }
    }

    if (!fs.existsSync(apkPath)) {
        console.log('⚠️ No se encontró GoogleClock.apk local, usando app base oficial...');
        await uploadSampleApp();
        return;
    }

    console.log(`📦 Preparando subida de: ${apkPath} (${(fs.statSync(apkPath).size / 1024 / 1024).toFixed(2)} MB)...`);

    try {
        const apkBuffer = fs.readFileSync(apkPath);
        const blob = new Blob([apkBuffer], { type: 'application/octet-stream' });
        const formData = new FormData();
        formData.append('file', blob, 'GoogleClock.apk');

        console.log('🚀 Intentando subir APK local a BrowserStack...');
        const response = await fetch('https://api-cloud.browserstack.com/app-automate/upload', {
            method: 'POST',
            headers: { 'Authorization': authHeader },
            body: formData
        });

        const data = await response.json();
        console.log('📬 Respuesta de BrowserStack:', JSON.stringify(data, null, 2));

        if (data.app_url) {
            console.log(`✅ App subida exitosamente con ID: ${data.app_url}`);
            fs.writeFileSync(path.resolve(__dirname, '.bstack-app.json'), JSON.stringify(data, null, 2));
            console.log('💾 Guardado ID en .bstack-app.json');
        } else if (data.error && data.error.includes('BROWSERSTACK_UNPROCESSABLE_ENTITY')) {
            console.log('⚠️ BrowserStack rechazó GoogleClock.apk por ser un APK protegido del sistema Google.');
            console.log('ℹ️ Activando modo preinstalado: inicializaremos el dispositivo y lanzaremos com.google.android.deskclock.');
            await uploadSampleApp();
        } else {
            console.error('❌ Error en la subida a BrowserStack:', data);
            await uploadSampleApp();
        }
    } catch (err) {
        console.error('❌ Error de conexión al subir la app:', err.message);
        await uploadSampleApp();
    }
}

uploadApp();
