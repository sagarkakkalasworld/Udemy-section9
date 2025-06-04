# 🚀 GCP Cloud Build Pipelines with AWS EC2 as Deployment Target

This guide walks you through setting up **GCP Cloud Build** to build and deploy code onto an **AWS EC2 instance** using SSH.

---

## 🌐 Step 1: GCP Project & Cloud Build Setup

1. Log in to your [Google Cloud Console](https://console.cloud.google.com/).
2. Search for **“Cloud Build”**.
3. Click **Enable** to activate the API.

> 💳 You'll need to verify **billing** with a **credit card** and **government ID**.  
> 🕒 Billing activation may take up to **24 hours**.

---

## 🔗 Step 2: Connect GitHub Repository

1. In **Cloud Build**, go to the **Triggers** tab.
2. Click **"Connect Repository"**.
3. Choose **GitHub**, then authenticate using the same browser session.
4. Complete **two-factor authentication**, if prompted.
5. Select the repository you'd like to integrate.

---

## 🔐 Step 3: Add SSH Key to Secret Manager

1. Go to **Secret Manager** in GCP.
2. Create a new secret:
   - **Name**: `SSH_KEY`
   - **Value**: Paste your **private SSH key**
3. After creating the secret, note the **Project ID** for later.

---

## ⚙️ Step 4: Configure Cloud Build Trigger

1. Go back to **Cloud Build → Triggers**.
2. Click **"Create Trigger"**.
3. Use the following settings:
   - **Event**: Push to branch (e.g., `main`)
   - **Repo**: Your GitHub repo
   - **Build Config**: `cloudbuild.yaml`

> ⚠️ Triggers act like webhooks — the pipeline runs on each code push.

---

## 📄 Step 5: Sample `cloudbuild.yaml`

```yaml
substitutions:
  _AWS_PUBLIC_IP: "54.183.217.216"

options:
  logging: CLOUD_LOGGING_ONLY

steps:
  # Step 1: Pre-Requisites
  - name: 'gcr.io/cloud-builders/gcloud'
    id: 'Run Pre-Requisites'
    entrypoint: 'bash'
    args:
      - '-c'
      - |
        mkdir -p /root/.ssh
        echo "$$SSH_KEY" | tr -d '\r' > /root/.ssh/id_rsa
        chmod 600 /root/.ssh/id_rsa
        ssh-keyscan -H "$_AWS_PUBLIC_IP" >> /root/.ssh/known_hosts
        ssh -o StrictHostKeyChecking=no ubuntu@$_AWS_PUBLIC_IP << 'EOF'
          rm -rf /home/ubuntu/Udemy-section*
          git clone https://github.com/sagarkakkalasworld/Udemy-section9
          cd Udemy-section9
          chmod 744 build.sh
          chmod 744 deploy.sh
        EOF
    secretEnv: ['SSH_KEY']

  # Step 2: Build App
  - name: 'gcr.io/cloud-builders/gcloud'
    id: 'Build App'
    entrypoint: 'bash'
    args:
      - '-c'
      - |
        mkdir -p /root/.ssh
        echo "$$SSH_KEY" | tr -d '\r' > /root/.ssh/id_rsa
        chmod 600 /root/.ssh/id_rsa
        ssh-keyscan -H "$_AWS_PUBLIC_IP" >> /root/.ssh/known_hosts
        ssh -o StrictHostKeyChecking=no ubuntu@$_AWS_PUBLIC_IP "bash /home/ubuntu/Udemy-section9/build.sh"
    secretEnv: ['SSH_KEY']

  # Step 3: Deploy App
  - name: 'gcr.io/cloud-builders/gcloud'
    id: 'Deploy App'
    entrypoint: 'bash'
    args:
      - '-c'
      - |
        mkdir -p /root/.ssh
        echo "$$SSH_KEY" | tr -d '\r' > /root/.ssh/id_rsa
        chmod 600 /root/.ssh/id_rsa
        ssh-keyscan -H "$_AWS_PUBLIC_IP" >> /root/.ssh/known_hosts
        ssh -o StrictHostKeyChecking=no ubuntu@$_AWS_PUBLIC_IP "bash /home/ubuntu/Udemy-section9/deploy.sh"
    secretEnv: ['SSH_KEY']

availableSecrets:
  secretManager:
    - versionName: projects/381798847413/secrets/SSH_KEY/versions/latest
      env: 'SSH_KEY'
````

---

## 📌 Notes

* Replace `381798847413` and `SSH_KEY` with your actual **GCP project ID** and **secret name**.
* This guide uses **public IP** of the EC2 instance since:

  * Cloud Build runs in **ephemeral containers**, not in your AWS VPC.
  * Private IPs require **VPC peering**, which is more complex.

---

## ▶️ Step 6: Run the Trigger

1. Go to **Cloud Build → Triggers**.
2. Click **“Run”** to manually test or push code to the branch.

---

## ✅ IAM Permissions

Make sure the **Cloud Build Service Account** has these roles:

* `Secret Manager Secret Accessor`
* `Cloud Build Editor`

Assign them via **IAM & Admin → IAM** in the console.

---

## 🙌 Connect With Me

I create content on:

* DevOps
* Fun Vlogs
* Travel Stories
* Contrafactums 🎶

📎 All my platforms:
👉 [Sagar Kakkala – One Stop](https://linktr.ee/sagar_kakkalas_world)

🖊 Feedback, queries, and suggestions are welcome in the comments!
