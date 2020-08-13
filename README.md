React Proyect

Technology stack needed:

Node.js  (https://nodejs.org/es/download/)
npm   (included with node, at least in windows 10)
Code editor of your choice. (I favor Visual Studio Code.)
Docker/Kubernetes

1. Install Docker
	
	If you have Docker already installed, you can continue to the next step.
	Download the installer for your platform and run the installation(https://docs.docker.com/get-docker/). It should be straightforward.
    To test if the installation succeeds, run the command docker -version. If you see a version number, everything is good to go to the next step.

    What to know before you install

    	-Hyper-V and Containers Windows features must be enabled.
    	-BIOS-level hardware virtualization support must be enabled in the BIOS settings.

2. Enabling Kubernetes

	-Once Docker Desktop is up & running, just right click on the Docker desktop icon and choose Settings. You will see a new section called Kubernetes:
	(Please note! If you don't see the section, it's because you're using Windows containers. Kubernetes currently supports only Linux containers, so you have first to right click on the Docker icon and choose Switch to Linux containers.)

		-Check all the options that you see in the panel then click Apply buttom and restart your machine.

3. Configure Kubernetes Context

	Open a terminal/power shell or Command Prompt and run: kubectl config use-context docker-for-desktop

4. Create kubeconfig file

	Open a terminal/power shell or Command Prompt and run this commands (one by one):
		$TOKEN=((kubectl -n kube-system describe secret default | Select-String "token:") -split " +")[1]

		And this:
	 	kubectl config set-credentials docker-for-desktop --token="${TOKEN}"

	We should see that the folder  ".kube" and the file "config" is created under your user path

5. Install package to create React application

	npm install -g create-react-app@3.4.1

6. Create React app

	npm init react-app sampleapptoastsmasters --use-npm

7. Run application

	cd sampleapptoastsmasters
	run: npm start

8. Create Dockerfile

	Open a text editor and paste this:

		# pull official base image
		FROM node:13.12.0-alpine
		# set working directory
		WORKDIR /app
		# install app dependencies
		COPY package.json ./
		COPY package-lock.json ./
		RUN npm install
		RUN npm install react-scripts@3.4.0 
		# add app
		COPY . ./
		# start app
		CMD ["npm", "start"]

9. Build image

	Open a terminal/Power shell and run: docker build -t appname:dev .

10. Run application with Docker

	Open a terminal/Power shell and run: docker run -v ${PWD}:/app -v /app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true <imagename>
	Your application should be running at: localhost:3001

11. Configure kubernets and deploy Angular image

	Open a terminal and run: kubectl run appname --image=<image name> --port=80 --replicas=1

	And this: kubectl expose deployment appname --type=NodePort 

12. Validate that pods has been deployed

	Open a terminal and run: kubectl get all
	*Should see the app name with Status Running

13. Configure ports

	Open a terminal/Power Shell and run: kubectl edit services
	A file will be prompted to edit. Under spec/ports edit next:
		targetPort should be set to 4200
		nodePort should be set to somenthing between 30001 and 60000
	Close and save the file

	In the terminal run: kubectl get all
	Validate that status is running and ports has been changed
	Now go to: localhost:<targetPort> and app shoould be running

	Note: if app stuck with status pending go next:

		Open a terminal and run: kubectl describe pod <pod name>
		Lood at Events and if you see somenthing like: NoSchedule or unschedulable do next:

			Under spec/containers add this:

				tolerations:
		        - effect: NoSchedule
		          key: node.kubernetes.io/unschedulable
		          operator: Exists
		    It should work now

14. Re-install image after building app or modification

	Just need to run: docker build -t appname:dev .
	Be carefully tu use same name, otherwise you will be creating a different build

	Run in a terminal: kubectl delete pod <pod name>
	Kubernets will install new builded image, thats it.


	
15. kubernetes automation script with powershell
	
	Docker desktop and kubernetes should be installed and configured

	clone React Repository, Mongo Repository and Backend Repository on a same folder

	once all three projects are on the same root folder we have to create a file with any name you want but with .ps1 extension <yourscriptnamegoeshere>.ps1 on the folder

	The content of the file should be this:

			Set-Location .\ToastMastersMongoDB
			./provision.ps1
			Set-Location ..
			Set-Location ".\ToastMasters Backend"
			./provision.ps1
			Set-Location ..
			Set-Location .\ToastMasters-React
			./provision.ps1
			Set-Location ..


	The Folder Structure should be the next

			-->ToastMasters-React
			-->ToastMastersMongoDB
			-->Toastmasters Backend
			--><yourscriptnamegoeshere>.ps1
			
	Lastly install powershell and run the <yourscriptnamegoeshere>.ps1 script


    





