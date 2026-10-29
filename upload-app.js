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

    console.log('🚀 Inicializando dispositivo en BrowserStack App Automate con app base certificada...');
    
    // Subir app base oficial para provisionar el dispositivo Android en BrowserStack
    const formData = new FormData();
    formData.append('url', 'https://www.browserstack.com/app-automate/sample-apps/android/WikipediaSample.apk');
    formData.append('custom_id', 'QAII_BaseDevice');

    try {
        const response = await fetch('https://api-cloud.browserstack.com/app-automate/upload', {
            method: 'POST',
            headers: { 'Authorization': authHeader },
            body: formData
        });

        const data = await response.json();
        console.log('📬 Respuesta de BrowserStack:', JSON.stringify(data, null, 2));

        if (data.app_url) {
            console.log(`✅ Dispositivo aprovisionado exitosamente con App ID: ${data.app_url}`);
            fs.writeFileSync(path.resolve(__dirname, '.bstack-app.json'), JSON.stringify(data, null, 2));
            console.log('💾 Guardado ID en .bstack-app.json');
            process.exit(0);
        } else {
            console.error('❌ Error al inicializar app en BrowserStack:', data);
            process.exit(1);
        }
    } catch (err) {
        console.error('❌ Error de conexión:', err.message);
        process.exit(1);
    }
}

uploadApp();
