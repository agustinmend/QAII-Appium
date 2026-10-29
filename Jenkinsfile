pipeline {
    agent any

    environment {
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
                    echo "Subiendo APK a BrowserStack App Automate con Node.js..."
                    if (isUnix()) {
                        sh 'node upload-app.js'
                    } else {
                        bat 'node upload-app.js'
                    }
                }
            }
        }

        stage('Run Appium Tests') {
            steps {
                script {
                    echo "Ejecutando pruebas de Appium en BrowserStack..."
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
