// Configuración de WebdriverIO para ejecutar en BrowserStack App Automate
exports.config = {
    // Credenciales de BrowserStack (se toman de variables de entorno)
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,

    // Servidor de BrowserStack
    hostname: 'hub.browserstack.com',

    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [],

    maxInstances: 1,

    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        // 'app' puede ser el hashed ID 'bs://...', el custom_id 'GoogleClockApp',
        // o la ruta local al APK (el servicio de BrowserStack lo sube automáticamente)
        'appium:app': process.env.BROWSERSTACK_APP_ID || './GoogleClock.apk',
        'appium:autoGrantPermissions': true,
        'appium:newCommandTimeout': 300,
        
        // Opciones específicas de BrowserStack
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
            app: process.env.BROWSERSTACK_APP_ID || './GoogleClock.apk',
            browserstackLocal: false
        }]
    ],

    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
};
