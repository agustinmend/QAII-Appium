const fs = require('fs');
const path = require('path');

// Intentar leer el ID de la app subida desde .bstack-app.json
let appId = process.env.BROWSERSTACK_APP_ID;
const bstackAppInfoPath = path.resolve(__dirname, '.bstack-app.json');

if (!appId && fs.existsSync(bstackAppInfoPath)) {
    try {
        const appInfo = JSON.parse(fs.readFileSync(bstackAppInfoPath, 'utf8'));
        if (appInfo.app_url) {
            appId = appInfo.app_url;
        }
    } catch (e) {
        // Ignorar
    }
}

if (!appId) {
    appId = 'bs://sample-app';
}

console.log(`[BrowserStack Config] Utilizando app: ${appId}`);

exports.config = {
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,

    hostname: 'hub.browserstack.com',

    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [],

    // 1 ejecución concurrente para cuentas Free Trial
    maxInstances: 1,

    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:app': appId,
        'appium:autoGrantPermissions': true,
        'appium:newCommandTimeout': 300,
        
        'bstack:options': {
            deviceName: 'Google Pixel 8',
            platformVersion: '14.0',
            projectName: 'QA II - Appium Practica 2',
            buildName: process.env.BROWSERSTACK_BUILD_NAME || 'Build ' + new Date().toISOString().split('T')[0],
            sessionName: 'Pruebas de Alarma Reloj Google',
            debug: true,
            networkLogs: true
        }
    }],

    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    services: [
        ['browserstack', {
            browserstackLocal: false
        }]
    ],

    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    // Activar la app preinstalada del Reloj Google en el Pixel
    before: async function () {
        console.log('⏰ Activando app de Reloj Google (com.google.android.deskclock)...');
        try {
            await driver.activateApp('com.google.android.deskclock');
            await driver.pause(2500);

            // Aceptar diálogo de notificación de Android 13/14 si aparece
            const allowBtn = await $('//*[@resource-id="com.android.permissioncontroller:id/permission_allow_button" or @text="Allow" or @text="Permitir"]');
            if (await allowBtn.isDisplayed().catch(() => false)) {
                await allowBtn.click();
            }
        } catch (err) {
            console.log('ℹ️ Continuando...');
        }
    },

    beforeTest: async function () {
        try {
            await driver.activateApp('com.google.android.deskclock');
            await driver.pause(1000);
            // Aceptar diálogo de permisos si salta entre tests
            const allowBtn = await $('//*[@resource-id="com.android.permissioncontroller:id/permission_allow_button" or @text="Allow" or @text="Permitir"]');
            if (await allowBtn.isDisplayed().catch(() => false)) {
                await allowBtn.click();
            }
        } catch (err) {
            // Ignorar
        }
    }
};
