# Udacity Cloud DevOps Capstone Project

## A Realtime [To-Do CRUD App](https://neorusse.github.io/todo-app/) built as my Udacity Capstone Project.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

### Project Description

Udacity Cloud DevOps NanoDegree Program Capstone Project done to demostrate knowledge of Building Cloud Native Application, Kubernetes, Docker, CICD, and Infrastructure as Code. Project Task Include:

- Working in AWS
- Using Terraform to provision Resources - AWS VPC, EC2 Linux Machine
- Building Jenkins pipelines
- Building Docker containers in pipelines
- Creating Kubernetes clusters (AWS EKS)
- Using Jenkins to implement Continuous Integration and Continuous Deployment

### Technology Used

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Docker

Kubectl

eksctl

aws cli

Jenkins

AWS EC2 Linux Machine for running Jenkins Server

AWS EKS

Terraform

### Running the Todo App Locally

- Clone the Repo

- Install Project Dependencies by running:

```bash
$ npm install
```

- Start the Todo App locally

```bash
$ npm start
```

- App listens on: http://localhost:3000/

### Running the Todo App Locally using Docker

- Build the Todo App Container Image by running:

```bash
$ docker build -t ecoden/todo-app .
```

- Start the Todo App locally using Docker

```bash
$ docker run -it --rm -p 3000:80 ecoden/todo-app
```

- App listens on: http://localhost:3000/

### Provision AWS EC2 AMI Linux Server using Terraform

- Download Terraform AWS Provider Plugin, run

```bash
$ terraform init
```

- To see the list of AWS resources Terraform will create, run

```bash
$ terraform plan -out ec2.tfplan
```

- To create the AWS EC2 AMI Linux Server, run

```bash
$ terraform apply "ec2.tfplan"
```

### How to Deploy the App to AWS EKS K8s Cluster:

- Create an AWS IAM User with Administrator access privillage

- Initialize Production Build by running:

```bash
$ npm run build
```

- Configure Jenkins using the AWS IAM User Credentials

- Configure Jenkins for Docker Build and Deploy to Registry

### Create the AWS EKS K8s Cluster by running:

```bash
$ eksctl create cluster -f k8s-cluster-init.yml --write-kubeconfig --set-kubeconfig-context
```

- Deploy to K8s cluster by running Jenkins

### License

[MIT](https://opensource.org/licenses/MIT)

### Author

[Russell Nyorere](https://neorusse.github.io/)
