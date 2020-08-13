# Delete existing Frontend deployments and services
kubectl delete deployment toastmastersreact
kubectl delete service toastmastersreact

# Build new frontend image
docker build -t frontend:frontend .

# Move to manifests folder and apply frontend Deployment and Service ymls
Set-Location manifests
kubectl apply -f deployment.yml
kubectl apply -f service.yml
kubectl get services
kubectl get deployments
Set-Location ..

# Execute Localhost 
Start-Process http://Localhost