# Medrec Sample web application  by Vijay Kumar Yenne
A sample responsive web application built for MedRec Platform API's using Vue.js framework. This branch of the application uses material design.


> A Vue.js project for Medrec App. The app has the functionality to log/track time, create or remove appointments and lists Drug Inventory calling the MedRec APIs.

> Axios is the http client library used to invoke the MedRec API's. It uses promises by default and runs on both the client and the server (which makes it appropriate for fetching data during server-side rendering). 

## Pre-requisites :
Install Node.js on your Dev machine for the build set up to work locally.

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## How to access the App from your Mobile Device
> access your localhost:3000 from distant mobile device. My favorite one is to use ngrok.
> Ngrok is a service that relays your local environment on a distant dns, for free!

```bash
# install ngrok
npm install -g ngrok
# run
ngrok http 8080
```

## How to Dockerise this web application and register it on Docker Hub
1. Create a dockerfile in the Web App root folder as below (Refer the Dockerfile)

```bash
FROM node:boron
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000
CMD ["npm", "run", "dev"]
```
2.Create .dockerignore file at the same location and add the below entries.

```bash
node_modules
npm-debug.log
```

## Create a Docker Container
3.Execute this docker command from the application path :
```bash
docker build -t <Image_Name> .
```

## List and run the Docker Image
4.The image built can be listed with the below command.

```bash
docker images
```
5.Run the image. Running your image with -d runs the container in detached mode, leaving the container running in the background. The -p flag redirects a public port to a private port inside the container. 

```bash
docker run -p 49160:3000 -d <Image_Name>

```
6.Get container ID

```bash
$ docker ps
```

## Ship it to Docker Hub

7.Register on docker hub with the repository name <Image_Name>

8.connect to docker hub

```bash
docker login --username=<dockerhubusername> --email=<dockerhubemail>

```
9.Tag your image

```bash

docker tag <image_id> image_name:latest

```

10.Push the image to the docker hub

```bash

docker push yourhubusername/image_name

```

## Deploy and Run it on Oracle Container Cloud Service (OCCS) from Docker Hub registry

For detailed explanation on the service check out (https://cloud.oracle.com/en_US/container)

0.Register your Docker Hub Account with OCCS from the container console.

1.Create a Service in OCCS from the container console

```bash

Service Name:
Image: yourhubusername/image_name
Add Ports Configuration: Host Port: 41960 Container Port: 3000 tcp

```

2.save changes

3.Deploy, allocate to the pool.

4.Check the docker image being pulled from registry to OCCS.

5.Check Host details

6.Access the application : http://host-ip:41960


## Automated Build Process using DockerHub.

1.Create a Docker Hub Account.

2.Enable the Automatic Build by pointing to the GitHub Repo.

3.Everytime you make a commit to Github, the image is automatically built and available on the Docker 
Hub.

4.Login to OCCS and Deploy the latest image available.