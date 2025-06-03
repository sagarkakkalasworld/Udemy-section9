# Azure Pipelines – Using AWS EC2 as a Self-Hosted Runner

This guide walks you through setting up an Azure DevOps pipeline that builds and deploys on an **AWS EC2 instance** using it as a **self-hosted agent**.

---

## 🔧 Step 1: Azure DevOps Setup

1. **Sign in to Azure** and search for **Azure DevOps**.
2. **Create an Organization** (make it public if required).
3. Inside the organization, **create a Project** – this will be your actual repository.
4. We’ll use **Azure Pipelines only**, but the runner and deployment server will be on **AWS EC2**.

---

## 🔐 Step 2: AWS Prerequisites

- Ensure **two EC2 instances** are set up:
  - One as the **self-hosted runner**
  - One as the **deployment server**
- These two instances should be connected via **SSH**.

---

## 🔑 Step 3: Create Personal Access Token (PAT)

1. Click on the ⚙️ **settings icon** beside your profile picture.
2. Go to **"Personal Access Tokens"**.
3. Generate a token with the following scopes:
   - **Agent Pools** → Read & Manage
   - **Code** → Read & Write

---

## 🤖 Step 4: Set Up Self-Hosted Agent on EC2

1. Go to your Azure DevOps **Project Settings → Agent Pools → Add Pool**
2. Name it (e.g., `aws ec2`) and **create the pool**.
3. Click **“Add Agent”**, select **Linux**, and follow the instructions.
4. SSH into your EC2 instance and run the following:

```bash
mkdir myagent && cd myagent
curl -O https://download.agent.dev.azure.com/agent/4.255.0/vsts-agent-linux-x64-4.255.0.tar.gz
tar xzvf vsts-agent-linux-x64-4.255.0.tar.gz
./config.sh
```

- Enter the URL: `https://dev.azure.com/<your_organization_name>`
- Use the **PAT token** for authentication
- Enter the **pool name** and an **agent name**

Start the agent:

```bash
./run.sh
```

---

## 🔐 Step 5: Add SSH Key to Azure DevOps

1. Go to **Pipelines → Library → Variable Groups**
2. Create a new group (e.g., `test`)
3. Add variable:
   - **Name:** `SSH_KEY`
   - **Value:** Paste your private SSH key content
   - Enable **Keep this value secret**

---

## 🚀 Step 6: Create Azure Pipeline

Assuming your Azure repo already has a `azure-pipelines.yml` file:

- Go to **Pipelines → Create Pipeline**
- Select **Azure Repos**
- Pick your repo
- Choose **Existing YAML file**

### Example `azure-pipelines.yml`

```yaml
trigger:
  branches:
    include:
      - master

variables:
- group: test
- name: AWS_PRIVATE_IP
  value: '172.31.31.45'

stages:
- stage: PreRequisites
  displayName: 'Pre-requisites'
  jobs:
  - job: PreReqJob
    displayName: 'Prepare the EC2 Instance'
    pool:
      name: 'aws ec2'
      demands:
        - agent.name -equals cicd
    steps:
    - script: |
        mkdir -p ~/.ssh
        echo "$SSH_key" | tr -d '\r' > ~/.ssh/id_rsa
        chmod 600 ~/.ssh/id_rsa
        ssh-keyscan -H $(AWS_PRIVATE_IP) >> ~/.ssh/known_hosts
      displayName: 'Setup SSH Key'
      env:
        SSH_key: $(SSH_KEY)

    - script: |
        ssh -o StrictHostKeyChecking=no ubuntu@$(AWS_PRIVATE_IP) << 'EOF'
        rm -rf /home/ubuntu/Udemy-section*
        git clone https://<your-username>@dev.azure.com/<org>/<project>/_git/<repo>
        cd <your-cloned-folder>
        chmod 744 build.sh
        chmod 744 deploy.sh
        EOF
      displayName: 'Run Pre-Requisites'

- stage: Build
  dependsOn: PreRequisites
  jobs:
  - job: BuildJob
    displayName: 'Run Build Script on EC2'
    pool:
      name: 'aws ec2'
      demands:
        - agent.name -equals cicd
    steps:
    - script: |
        mkdir -p ~/.ssh
        echo "$SSH_key" | tr -d '\r' > ~/.ssh/id_rsa
        chmod 600 ~/.ssh/id_rsa
        ssh-keyscan -H $(AWS_PRIVATE_IP) >> ~/.ssh/known_hosts
      displayName: 'Setup SSH Key'
      env:
        SSH_key: $(SSH_KEY)

    - script: |
        ssh -o StrictHostKeyChecking=no ubuntu@$(AWS_PRIVATE_IP) "bash /home/ubuntu/<repo>/build.sh"
      displayName: 'Build App'

- stage: Deploy
  dependsOn: Build
  jobs:
  - job: DeployJob
    displayName: 'Run Deploy Script on EC2'
    pool:
      name: 'aws ec2'
      demands:
        - agent.name -equals cicd
    steps:
    - script: |
        mkdir -p ~/.ssh
        echo "$SSH_key" | tr -d '\r' > ~/.ssh/id_rsa
        chmod 600 ~/.ssh/id_rsa
        ssh-keyscan -H $(AWS_PRIVATE_IP) >> ~/.ssh/known_hosts
      displayName: 'Setup SSH Key'
      env:
        SSH_key: $(SSH_KEY)

    - script: |
        ssh -o StrictHostKeyChecking=no ubuntu@$(AWS_PRIVATE_IP) "bash /home/ubuntu/<repo>/deploy.sh"
      displayName: 'Deploy App'
```

---

## ✅ Optional: Manual Approval Before Deploy

Uncomment below if you want **manual approval**:

```yaml
# - stage: Deploy
#   dependsOn: Build
#   jobs:
#   - deployment: DeployJob
#     displayName: 'Run Deploy Script on EC2'
#     environment: production
#     pool:
#       name: 'aws ec2'
#       demands:
#         - agent.name -equals cicd
#     strategy:
#       runOnce:
#         deploy:
#           steps:
#             ...
```

---

## ✅ Summary

You’ve now successfully:

- Set up an Azure DevOps organization and project
- Connected an AWS EC2 instance as a self-hosted runner
- Created a multi-stage pipeline with SSH key management
- Built and deployed code using shell scripts from Azure Pipelines

---

## 🔗 Connect with Me

I post content related to contrafactums, fun vlogs, travel stories, DevOps and more.

👉 [Sagar Kakkala One Stop](https://linktr.ee/sagar_kakkalas_world)

🖊 Feedback, queries, and suggestions are welcome in the comments.
