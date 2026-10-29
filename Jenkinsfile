pipeline {
    agent any

    // Variables de entorno para la ejecución
    environment {
        // En Jenkins se configuran estas credenciales en:
        // Dashboard -> Manage Jenkins -> Credentials -> System -> Global credentials -> Add Credentials (Secret text)
        BROWSERSTACK_USERNAME   = credentials('BROWSERSTACK_USERNAME')
        BROWSERSTACK_ACCESS_KEY = credentials('BROWSERSTACK_ACCESS_KEY')
        BROWSERSTACK_BUILD_NAME = "Jenkins-Build-${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout Source Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo "Instalando dependencias de Node.js..."
                    if (isUnix()) {
                        sh 'npm install'
                    } else {
                        bat 'npm install'
                    }
                }
            }
        }

        stage('Upload App to BrowserStack') {
            steps {
                script {
                    echo "Subiendo APK a BrowserStack App Automate..."
                    if (isUnix()) {
                        sh '''
                            RESPONSE=$(curl -s -u "$BROWSERSTACK_USERNAME:$BROWSERSTACK_ACCESS_KEY" \
                                -X POST "https://api-cloud.browserstack.com/app-automate/upload" \
                                -F "file=@GoogleClock.apk" \
                                -F "custom_id=GoogleClockApp")
                            echo "Respuesta BrowserStack: $RESPONSE"
                        '''
                    } else {
                        bat '''
                            curl -s -u "%BROWSERSTACK_USERNAME%:%BROWSERSTACK_ACCESS_KEY%" ^
                                -X POST "https://api-cloud.browserstack.com/app-automate/upload" ^
                                -F "file=@GoogleClock.apk" ^
                                -F "custom_id=GoogleClockApp"
                        '''
                    }
                }
            }
        }

        stage('Run Appium Tests') {
            steps {
                script {
                    echo "Ejecutando pruebas de Appium en dispositivos BrowserStack..."
                    if (isUnix()) {
                        sh 'npm run test:bstack'
                    } else {
                        bat 'npm run test:bstack'
                    }
                }
            }
        }
    }

    post {
        always {
            echo "Archivando reportes y logs..."
            archiveArtifacts artifacts: 'logs/**', allowEmptyArchive: true
        }
        success {
            echo "Las pruebas en BrowserStack se completaron exitosamente."
        }
        failure {
            echo "Ocurrio un fallo en la ejecucion del Pipeline."
        }
    }
}
