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
        // Ignorar error de parseo si falla
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

    // En cuentas Free Trial solo se permite 1 ejecución concurrente
    maxInstances: 1,

    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:app': appId,
        'appium:appPackage': 'com.google.android.deskclock',
        'appium:appActivity': 'com.android.deskclock.DeskClock',
        'appium:autoGrantPermissions': true,
        'appium:newCommandTimeout': 300,
        maxInstances: 1,
        
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

    // Hook para asegurar que la app del Reloj esté abierta al iniciar cada suite
    before: async function () {
        try {
            console.log('⏰ Activando app de Reloj Google (com.google.android.deskclock)...');
            await driver.activateApp('com.google.android.deskclock');
            await driver.pause(2000);
        } catch (err) {
            console.log('ℹ️ La app ya se encuentra activa en el dispositivo.');
        }
    }
};
