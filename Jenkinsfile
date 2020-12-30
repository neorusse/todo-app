pipeline {
    agent any

    stages {

        stage('Lint Dockerfile') {
            steps {
                script {
                    docker.image('hadolint/hadolint:latest-debian').inside() {
                            sh 'hadolint ./Dockerfile | tee -a docker_lint.txt'
                            sh '''
                                lintErrors=$(stat --printf="%s"  docker_lint.txt)
                                if [ "$lintErrors" -gt "0" ]; then
                                    echo "Errors have been found, please see below"
                                    cat docker_lint.txt
                                    exit 1
                                else
                                    echo "There are no errors found on Dockerfile!"
                                fi
                            '''
                    }
                }
            }
        }

        stage( 'Build React Todo App Docker Image and Deploy to Docker Registry' ) {
            steps {
                sh "docker version"
                sh 'echo Containerizing React Todo Application'
                sh 'docker build -t ecoden/todo-app -f Dockerfile .'
                sh 'docker image ls'
                withDockerRegistry([url: '', credentialsId: 'Docker-Hub-Registry']) {
                sh 'docker push ecoden/todo-app'
                }
            }
        }

        stage('Deploying to AWS EKS') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'AWS-EKS', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                    sh "aws eks --region us-east-2 update-kubeconfig --name todo-k8s-app"
                    sh 'kubectl apply -f k8s-deploy-manifest.yml'
                }     
            }
        }

    }
}