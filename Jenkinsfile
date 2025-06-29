pipeline {
  agent any

  options {
    disableConcurrentBuilds()
  }

  parameters {
    choice(name: 'TARGET_HOST', choices: ['http://172.19.198.108', 'http://10.0.0.5'], description: 'Choose target host')
  }

  environment {
    CONTAINER_NAME = "selenium-runner-poc"
    IMAGE_NAME = "python:3.12"
    GITHUB_URL = "https://github.com/eliyahukoren/selenium-react.git"
    REPO_DIR = "/workspace/selenium-poc"
  }

  stages {
    stage('Create Container') {
      steps {
        script {
          def containerExists = sh(script: "docker ps -a --format '{{.Names}}' | grep -w ${CONTAINER_NAME} || true", returnStdout: true).trim()

          if (containerExists) {
            echo "✅ Reusing existing container: ${CONTAINER_NAME}"
            sh "docker start ${CONTAINER_NAME}"
          } else {
            echo "🚀 Creating new container: ${CONTAINER_NAME}"
            sh "docker run -d --name ${CONTAINER_NAME} -v \$PWD:/workspace -w /workspace ${IMAGE_NAME} sleep infinity"
          }
        }
      }
    }

    stage('Install system') {
      steps {
        sh """
          docker exec ${CONTAINER_NAME} bash -c '
            apt update &&
            apt install -y chromium chromium-driver &&
            apt install -y git curl unzip chromium chromium-driver
          '
        """
      }
    }

    stage('Get Repo') {
      steps {
        script {
          def repoExists = sh(script: "docker exec ${CONTAINER_NAME} sh -c 'test -d ${REPO_DIR} && echo exists || echo missing'", returnStdout: true).trim()

          if (repoExists == "missing") {
            echo "📥 Cloning repository..."
            sh "docker exec ${CONTAINER_NAME} git clone ${GITHUB_URL} ${REPO_DIR}"
          } else {
            echo "🔄 Repository exists. Pulling latest changes..."
            sh "docker exec ${CONTAINER_NAME} sh -c 'cd ${REPO_DIR} && git fetch --all && git reset --hard origin/master && git clean -fd'"
          }
        }
      }
    }

    stage('Install Python Dep') {
      steps {
        sh """
          docker exec ${CONTAINER_NAME} bash -c '
            pip install -r ${REPO_DIR}/selenium/requirements.txt
          '
        """
      }
    }

    stage('Run Tests') {
      steps {
        sh """
          docker exec ${CONTAINER_NAME} bash -c '
            export TARGET_HOST=${params.TARGET_HOST} &&
            cd ${REPO_DIR}/selenium &&
            python run_tests.py
          '
        """
      }
    }
  }

  post {
    always {
      // Copy reports from container to Jenkins workspace
      sh "docker cp ${CONTAINER_NAME}:${REPO_DIR}/selenium/reports ./selenium/reports || true"

      // Publish test results
      junit 'selenium/reports/*.xml'
    }
  }
}
