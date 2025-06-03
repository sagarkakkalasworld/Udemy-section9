#!/bin/bash
sudo docker build -t ci-cd-deployment .
#create a docker hub account before pushing image to docker hub
#make sure you did docker login with docker command "sudo docker login"
sudo docker tag ci-cd-deployment sagarkakkalasworld/ci-cd-deployment
sudo docker push sagarkakkalasworld/ci-cd-deployment